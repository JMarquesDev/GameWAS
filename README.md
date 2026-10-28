# WAS

Base do jogo narrativo com exploração lateral 2D e inspeção 3D. Entrega acadêmica: 02/11/2026.

## Iniciar no VS Code

Abra esta pasta. Com Node.js 22.13 ou superior e npm, execute na raiz:

```sh
npm install
npm run dev
```

Abra o endereço indicado pelo Vite. No PowerShell deste computador, caso `npm` falhe, use `npm.cmd` (por exemplo, `npm.cmd run dev`); o launcher PowerShell global está apontando para um npm ausente.

```sh
npm run mobile     # servidor Expo; testar com dispositivo/emulador compatível
npm run typecheck  # verifica web e mobile
npm test           # regras de progressão e leitura de saves
npm run build      # gera apps/web/dist
```

## Estrutura

- `apps/web`: React + Vite; Phaser para cenas 2D; React Three Fiber para inspeção 3D.
- `apps/mobile`: Expo + React Native, com interface inicial por toque.
- `packages/game-core`: regras e formato versionado do save, sem APIs de navegador/nativas.
- `packages/game-content`: fases, objetos e diálogos.
- `packages/design-tokens`: cores compartilhadas, provisórias.
- `docs`: decisões, testes e registro de assets.

## Estado inicial

A web tem menu, quarto geométrico, movimento A/D ou setas, câmera, investigação por clique ou E próximo do objeto, inspeção 3D de um modelo provisório, coleta de três pistas, primeira memória e save local. Cada fase possui arquivo próprio; as fases 2–7 são espaços reservados sem conteúdo jogável. O epílogo ainda precisa ser fornecido e integrado. Arte, animações finais, áudio, QTE, escolhas e site completo de campanha permanecem pendentes.

O mobile valida o compartilhamento de conteúdo e regras com cartões investigáveis; ainda não implementa movimentação lateral nem inspeção 3D. Seu save é independente do navegador.

As versões foram limitadas por faixa de compatibilidade: Phaser 3.90, React 19.1 e Expo SDK 54. Não atualizar React/React Native separadamente do SDK Expo. Usar `expo install` para módulos nativos; conferir a disponibilidade de Expo Go compatível ou usar development build.

Não há backend, autenticação ou publicação automática. Howler e expo-audio estão preparados como dependências; nenhum áudio é reproduzido ainda. Arte geométrica criada por código para validar a estrutura.
