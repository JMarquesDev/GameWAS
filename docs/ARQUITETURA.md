# Arquitetura inicial

React monta e desmonta o Phaser em um efeito com cleanup. Phaser mantém o movimento por frame; o store Zustand transporta somente eventos de interface/progresso. Abrir inspeção bloqueia o movimento. Canvas 3D é carregado sob demanda no modal.

Regras de coleta e conclusão pertencem ao game-core; textos e objetos, ao game-content. Não importar Phaser, DOM, localStorage ou React Native nesses pacotes. Persistência pertence a cada aplicativo.

## Próximos passos

1. Substituir geometria provisória por cenário e sprites de Oliver; criar animações.
2. Definir interação por distância, enigmas e consequências das escolhas com a equipe.
3. Adicionar GLB do relógio e pistas na superfície do modelo, com rotação por arraste.
4. Integrar flashback completo, transição para escola e vídeo do epílogo.
5. Produzir adaptação mobile e testar em aparelho físico.
6. Integrar som, opções de acessibilidade, QTE e conteúdo das demais fases.

Identidade: WAS; Oliver é médico; Zoe é a namorada; sete minutos são tempo narrativo; vídeo final é epílogo. Roteiro e revisão científica permanecem sob validação da equipe.
