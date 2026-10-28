import { useEffect, useState } from 'react';
import { breathe, freshDrowsiness, tickDrowsiness } from '../game/systems/drowsiness';
export function DrowsinessEvent({ enabled, onActive, onRestart }: { enabled: boolean; onActive: (active: boolean) => void; onRestart: () => void }) {
  const [state, setState] = useState(freshDrowsiness);
  const active = state.phase !== 'calm';
  useEffect(() => { onActive(active); }, [active, onActive]);
  useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => { if (!document.hidden) setState(current => tickDrowsiness(current, .1)); }, 100);
    return () => clearInterval(timer);
  }, [enabled]);
  useEffect(() => {
    if (!enabled || !active) return;
    const key = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'e') return;
      event.preventDefault(); event.stopImmediatePropagation();
      if (!event.repeat) setState(breathe);
    };
    window.addEventListener('keydown', key, true);
    return () => window.removeEventListener('keydown', key, true);
  }, [enabled, active]);
  if (!active || !enabled) return null;
  const lost = state.phase === 'lost';
  const darkness = lost ? 1 : Math.min(.94, .32 + (12 - state.time) / 6 * .62);
  return <div className="drowsiness-event" style={{ backgroundColor: `rgba(0,0,0,${darkness})` }} role="dialog" aria-modal="true" aria-label={lost ? 'Fim da tentativa' : 'Mantenha Oliver acordado'}>
    <div className="drowsiness-card">
      <p className="eyebrow">{lost ? 'WAS · FIM' : 'OLIVER ESTÁ ADORMECENDO'}</p>
      <h2>{lost ? 'As lembranças se apagaram.' : 'Respire. Fique aqui.'}</h2>
      {lost ? <><p>Oliver caiu no sono. Reinicie a história para tentar novamente.</p><button autoFocus onClick={onRestart}>Reiniciar do começo</button></> : <>
        <p role="status">Pressione E repetidamente ou toque em Respirar.</p>
        <progress aria-label="Fôlego recuperado" max={1} value={state.breath}/>
        <button onClick={() => setState(breathe)}>Respirar · E</button>
        <small>{Math.ceil(state.time)} segundos · segurar a tecla não conta</small>
      </>}
    </div>
  </div>;
}
