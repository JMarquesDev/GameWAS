import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../game/preferences';
import { Preferences } from './Preferences';
import { gameAudio } from '../game/audio';
import type { SaveSlot } from '../game/store';
function alreadySeen() { try { return sessionStorage.getItem('was:cover-seen') === 'true'; } catch { return false; } }
type Props = { onStart: (slot: number) => void; onContinue: (slot: number) => void; onAdmin: () => void; slots: SaveSlot[] };
export function MainMenu({ onStart, onContinue, onAdmin, slots }: Props) {
  const [panel, setPanel] = useState<'main' | 'preferences' | 'slots' | 'admin'>('main');
  const reducedMotion = usePreferences(state => state.reducedMotion);
  const [intro, setIntro] = useState(() => reducedMotion || alreadySeen() ? 'done' : 'playing');
  const [leaving, setLeaving] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  function finishIntro() {
    try { sessionStorage.setItem('was:cover-seen', 'true'); } catch { /* Remains usable without storage. */ }
    setIntro('fading');
  }
  useEffect(() => {
    if (intro !== 'fading') return;
    const timeout = window.setTimeout(() => setIntro('done'), reducedMotion ? 0 : 900);
    return () => window.clearTimeout(timeout);
  }, [intro, reducedMotion]);
  function enter(action: () => void) {
    if (leaving) return;
    gameAudio.unlock(); gameAudio.cue('open'); setLeaving(true);
    timer.current = window.setTimeout(action, reducedMotion ? 0 : 650);
  }
  if (intro !== 'done') return <section className={`cover-intro ${intro === 'fading' ? 'is-fading' : ''}`} aria-label="Abertura do WAS">
    <video autoPlay muted playsInline preload="auto" poster="/assets/video/was-cover-loop.jpg"
      onEnded={finishIntro} onError={finishIntro} onTimeUpdate={event => {
        if (event.currentTarget.currentTime >= 7.4 && intro === 'playing') finishIntro();
      }} src="/assets/video/was-cover-loop.mp4" />
    <button className="secondary cover-skip" onClick={finishIntro}>Pular abertura</button>
  </section>;
  return <section className={`main-menu ${leaving ? 'menu-leaving' : ''}`} aria-label="Menu inicial" aria-busy={leaving}>
    <div className="menu-atmosphere" aria-hidden="true"/>
    <div className="menu-content" key={panel}>
      <p className="eyebrow">MEMÓRIAS DE OLIVER</p><h1>WAS</h1><span className="menu-rule" aria-hidden="true"/>
      {panel === 'main' ? <>
        <p className="menu-quote">Se você perdesse todas as suas memórias,<br/>ainda seria a mesma pessoa?</p>
        <nav className="menu-buttons" aria-label="Ações do menu">
          {slots.some(slot => slot.occupied) && <button disabled={leaving} onClick={() => setPanel('slots')}>Continuar</button>}
          <button disabled={leaving} className={slots.some(slot => slot.occupied) ? 'secondary' : ''} onClick={() => setPanel('slots')}>{slots.some(slot => slot.occupied) ? 'Novo jogo' : 'Iniciar'}</button>
          <button disabled={leaving} className="secondary" onClick={() => setPanel('preferences')}>Preferências</button>
        </nav>
        <p className="menu-caption">Uma história sobre o que permanece.</p>
        <button disabled={leaving} className="admin-entry" onClick={() => { setAdminPassword(''); setAdminError(''); setPanel('admin'); }}>Admin · explorar cenários</button>
      </> : panel === 'slots' ? <section className="preferences save-slots"><h2>Campanhas salvas</h2><p>Escolha um dos três slots. O progresso mostra a fase mais avançada já liberada.</p><div className="save-slot-grid">{slots.map(slot => <article className={`save-slot ${slot.occupied ? 'occupied' : ''}`} key={slot.id}><p className="eyebrow">SLOT {slot.id + 1}</p><h3>{slot.occupied ? `Progresso: ${slot.progress}%` : 'Vazio'}</h3><p>{slot.occupied ? `Fase ${slot.phase + 1} de 8` : 'Comece uma nova história neste espaço.'}</p><div className="actions">{slot.occupied && <button disabled={leaving} onClick={() => enter(() => onContinue(slot.id))}>Continuar</button>}<button disabled={leaving} className={slot.occupied ? 'secondary' : ''} onClick={() => enter(() => onStart(slot.id))}>{slot.occupied ? 'Recomeçar' : 'Novo jogo'}</button></div></article>)}</div><button className="secondary" onClick={() => setPanel('main')}>Voltar</button></section> : panel === 'admin' ? <section className="preferences"><h2>Acesso administrativo</h2><p>Digite a senha para abrir o painel de fases.</p><form onSubmit={event => { event.preventDefault(); if (adminPassword === '1807') enter(onAdmin); else { setAdminError('Senha incorreta. Tente novamente.'); setAdminPassword(''); } }}><label className="admin-password-field">Senha<input autoFocus type="password" inputMode="numeric" autoComplete="off" value={adminPassword} onChange={event => { setAdminPassword(event.target.value); setAdminError(''); }} aria-describedby={adminError ? 'admin-password-error' : undefined}/></label>{adminError && <p id="admin-password-error" role="alert">{adminError}</p>}<div className="actions"><button type="button" className="secondary" onClick={() => setPanel('main')}>Voltar</button><button disabled={leaving || !adminPassword} type="submit">Entrar</button></div></form></section> : <section className="preferences"><h2>Preferências</h2><Preferences/><button className="secondary" onClick={() => setPanel('main')}>Voltar</button></section>}
    </div>
    <p className="menu-edition">WAS · PROJETO INTEGRADOR · 2026</p>
  </section>;
}
