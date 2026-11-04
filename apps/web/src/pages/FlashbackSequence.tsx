import './storyboard.css';
import { useEffect, useState } from 'react';
import { flashbacks, type FlashbackKind } from '@was/game-content';
import { Modal } from './Modal';
import { gameAudio } from '../game/audio';

const storyboardByMemory: Partial<Record<FlashbackKind, string>> = {
  childhood: '02-infancia', school: '03-redacao', friend: '04-michael', relationship: '05-zoe',
  apartment: '05-zoe', father: '06-santiago', hospital: '07-hospital',
};

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
  const columns = kind === 'hospital' || kind === 'childhood' ? 3 : 4;
  const rows = kind === 'hospital' || kind === 'father' ? 3 : 2;
  const current = steps[step];
  const finished = step >= steps.length;
  return <Modal open={open} title="Flashback" onClose={onFinish} className={`comic-sequence flashback-${current?.kind ?? 'end'}`}>
    {storyboardByMemory[kind] && <div className="comic-page" aria-label="Quadros da lembrança">{Array.from({length:5},(_,index)=><div key={index} className={`comic-panel panel-${index} ${index<=step?'revealed':''}`} aria-hidden={index>step}><div className="comic-art" style={{backgroundImage:`url(/assets/storyboards/${storyboardByMemory[kind]}.png)`,backgroundSize:`${columns*100}% ${rows*100}%`,backgroundPosition:`${(index%columns)*100/(columns-1)}% ${Math.floor(index/columns)*100/(rows-1)}%`}}/></div>)}</div>}
    <div className="memory-scene-content">
      <p className="eyebrow">{finished ? 'MEMÓRIA PROCESSADA' : current.kind === 'vhs' ? 'SINAL VHS · 1987' : 'ARQUIVO DE MEMÓRIA'}</p>
      <div className="memory-line" key={`${kind}-${step}`} aria-live="polite">
        {current?.speaker && <p className="memory-speaker">{current.speaker}</p>}
        <p className="memory-words">{finished ? 'Algumas coisas a gente esquece. Outras esperam ser encontradas.' : current.text}</p>
      </div>
      <div className="memory-progress" aria-label={`${Math.min(step + 1, steps.length)} de ${steps.length} cenas`}>{steps.map((_, i) => <i key={i} className={i <= step ? 'seen' : ''}/>)}</div>
      <div className="actions"><button onClick={() => finished ? onFinish() : setStep(value => value + 1)}>{finished ? 'Continuar' : 'Próximo quadro'}</button></div>
      <small>Avance no seu ritmo. Esc pula a lembrança.</small>
    </div>
  </Modal>;
}
