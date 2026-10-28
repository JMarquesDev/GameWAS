import { useEffect, useState } from 'react';
import { flashbacks, type FlashbackKind } from '@was/game-content';
import { Modal } from './Modal';
import { gameAudio } from '../game/audio';

export function FlashbackSequence({ kind, open, onFinish, branch }: { kind: FlashbackKind; open: boolean; onFinish: () => void; branch?: string }) {
  const [step, setStep] = useState(0);
  const base = flashbacks[kind];
  const response = kind === 'school'
    ? branch === 'quero-ser-medico' ? 'Quero ser médico como você.' : 'Eu ainda não sei.'
    : kind === 'friend'
      ? branch === 'ignorar' ? 'Oliver muda de assunto e tenta seguir estudando.' : 'Oliver diz que está tudo bem, embora não consiga lembrar.'
      : kind === 'relationship'
        ? branch === 'open' ? 'Dessa vez, ele escolheu dividir o que estava sentindo.' : 'Ele ainda não conseguiu falar, mas decidiu que tentaria de novo.'
        : undefined;
  const steps = response ? [...base, { kind: 'dialogue' as const, speaker: 'Oliver', text: response }] : base;
  useEffect(() => { if (open) { setStep(0); gameAudio.cue('memory'); } }, [open, kind]);
  const current = steps[step];
  const finished = step >= steps.length;
  return <Modal open={open} title="Flashback" onClose={onFinish} className={`memory-sequence flashback-sequence flashback-${current?.kind ?? 'end'}`}>
    <div className="memory-glow" aria-hidden="true"/>
    <div className="flashback-noise" aria-hidden="true"/>
    <div className="memory-scene-content">
      <p className="eyebrow">{finished ? 'MEMÓRIA PROCESSADA' : current.kind === 'vhs' ? 'SINAL VHS · 1987' : 'ARQUIVO DE MEMÓRIA'}</p>
      <div className="memory-line" key={`${kind}-${step}`} aria-live="polite">
        {current?.speaker && <p className="memory-speaker">{current.speaker}</p>}
        <p className="memory-words">{finished ? 'Algumas coisas a gente esquece. Outras esperam ser encontradas.' : current.text}</p>
      </div>
      <div className="memory-progress" aria-label={`${Math.min(step + 1, steps.length)} de ${steps.length} cenas`}>{steps.map((_, i) => <i key={i} className={i <= step ? 'seen' : ''}/>)}</div>
      <div className="actions"><button onClick={() => finished ? onFinish() : setStep(value => value + 1)}>{finished ? 'Continuar' : 'Avançar'}</button></div>
      <small>Pressione Esc para retornar à exploração.</small>
    </div>
  </Modal>;
}
