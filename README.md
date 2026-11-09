# WAS — Memórias de Oliver

WAS é um jogo narrativo de exploração e memória. Oliver percorre espaços marcantes da própria vida, investiga objetos, reúne pistas e reconstrói acontecimentos ligados à família, à escola, à medicina e às suas escolhas. A história combina exploração 2D, diálogos, puzzles, flashbacks em storyboard e inspeções detalhadas de objetos em 3D.

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

## Estrutura narrativa

O jogo acompanha Oliver em uma sequência de fases ligadas por memórias. Cada ambiente possui um objetivo, objetos investigáveis e uma transição narrativa para a fase seguinte. Entre as fases, os flashbacks revelam momentos da infância, adolescência, faculdade, relacionamento, laboratório, hospital e campo.

## Estado atual

A versão web já possui menu, saves, exploração, movimentação, investigação por clique ou tecla `E`, diário, coleta de pistas, progressão da primeira fase e inspeção 3D. O projeto mantém uma base compartilhada para a futura versão mobile.

Para continuar o desenvolvimento em outro computador, clone o repositório e execute os comandos acima.
