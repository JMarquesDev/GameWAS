import { usePreferences } from '../game/preferences';
import { useEffect, useState } from 'react';
import { connectedGamepad } from '../game/gamepad';

export function Preferences() {
  const preferences = usePreferences();
  const [controller, setController] = useState('');
  useEffect(() => {
    const check = () => setController(connectedGamepad()?.id ?? '');
    check();
    const timer = window.setInterval(check, 500);
    window.addEventListener('gamepadconnected', check);
    window.addEventListener('gamepaddisconnected', check);
    return () => { window.clearInterval(timer); window.removeEventListener('gamepadconnected', check); window.removeEventListener('gamepaddisconnected', check); };
  }, [preferences.gamepadEnabled]);
  return <div className="preferences-fields">
    <label><input type="checkbox" checked={preferences.gamepadEnabled} onChange={event => preferences.update({ gamepadEnabled: event.target.checked })}/> Usar controle</label>
    {preferences.gamepadEnabled && <div><p className="note">Conecte um controle compatível ao computador com um cabo USB de dados ou emparelhe pelo Bluetooth nas configurações do computador. Depois, pressione um botão do controle com o jogo aberto para que o navegador o reconheça.</p><p role="status">{controller ? `Controle detectado: ${controller}` : 'Aguardando controle. Conecte-o e pressione um botão.'}</p><button type="button" className="secondary" onClick={() => setController(connectedGamepad()?.id ?? '')}>Verificar conexão</button></div>}
    <label>Velocidade de caminhada <select value={preferences.speed} onChange={event => preferences.update({ speed: Number(event.target.value) })}>
      <option value={140}>Calma</option><option value={180}>Normal</option><option value={230}>Rápida</option>
    </select></label>
    <label>Volume geral <input type="range" min="0" max="1" step="0.05" value={preferences.volume} onChange={event => preferences.update({ volume: Number(event.target.value) })}/><output>{Math.round(preferences.volume * 100)}%</output></label>
    <label>Volume da música <input type="range" min="0" max="1" step="0.05" value={preferences.musicVolume} onChange={event => preferences.update({ musicVolume: Number(event.target.value) })}/><output>{Math.round(preferences.musicVolume * 100)}%</output></label>
    <label><input type="checkbox" checked={preferences.muted} onChange={event => preferences.update({ muted: event.target.checked })}/> Desativar todo o áudio</label>
    <label><input type="checkbox" checked={preferences.reducedMotion} onChange={event => preferences.update({ reducedMotion: event.target.checked })}/> Reduzir transições, respiração e animação da capa</label>
    <label><input type="checkbox" checked={preferences.largeText} onChange={event => preferences.update({ largeText: event.target.checked })}/> Texto ampliado</label>
    <label>Qualidade visual <select value={preferences.quality} onChange={event => preferences.update({ quality: event.target.value as 'low' | 'high' })}><option value="high">Alta · sombras e detalhes</option><option value="low">Compatível · desempenho</option></select></label>
    <p className="note">Preferências salvas neste navegador. O tempo da história não é um cronômetro.</p>

  </div>;
}
