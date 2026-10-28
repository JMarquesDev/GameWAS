# Exploração em profundidade

WASD ou quatro setas controlam Oliver em duas dimensões do piso. W/cima afasta, S/baixo aproxima. O movimento diagonal é normalizado; paredes e móveis bloqueiam a área dos pés, com deslizamento pela borda. A escala e a velocidade aparente diminuem ao fundo.

`navigation.ts` contém polígonos de chão, obstáculos e pontos iniciais dos oito cenários em coordenadas de referência 960×540. `Exploration.ts` aplica o movimento e converte a posição para a altura real do canvas. Essas regiões foram traçadas manualmente e podem ser refinadas após testes da equipe; os sprites atuais continuam em perfil, inclusive no movimento de profundidade.

O canvas acompanha a proporção de cada imagem, conforme `sceneSize` em `backgrounds.ts`, e a área React acompanha o mesmo formato. O fundo preenche a área inteira sem letterbox, recorte nem deformação da imagem. Não é necessário regenerar arte.

Verificação: tipos aprovados, build web aprovado, oito testes aprovados. Testes cobrem início em piso livre, acesso ao fundo do laboratório, bloqueio da mesa/mochila, deslizamento, perspectiva e proporção do canvas. Quarto e laboratório conferidos no navegador.

As faixas guiadas de `walkRoutes.ts` pertencem ao protótipo anterior e não são usadas nas cenas atuais. Preferências de velocidade/redução de efeitos e modo Admin continuam disponíveis.

## Câmera aproximada

Zoom de 1,12× em todos os cenários. A câmera acompanha Oliver com amortecimento e margem central, focando 205 unidades acima dos pés (ajustadas à altura da imagem), com margem vertical de 28 unidades para priorizar a parte superior. Seus limites coincidem com os da arte: novos trechos aparecem conforme ele se desloca, sem revelar áreas vazias além das bordas. A proporção do canvas continua idêntica à imagem de fundo.

A variação de perspectiva do personagem foi reduzida: escala entre 94% ao fundo e 100% à frente (antes, 68%–100%), preservando melhor a relação com os móveis do cenário pré-renderizado. O relógio continua presente no próprio desenho do quarto, com identificação do cenário na interface externa.

## Limites junto às paredes

Revisados os limites laterais do quarto, laboratório de aula, sala, laboratório do pai e hospital. A colisão considera nove amostras na área dos pés, com largura de 44 unidades e profundidade de 12, incluindo quinas. Isso impede que os sapatos invadam paredes e objetos mesmo quando o centro do personagem ainda está sobre o chão. Teste de regressão específico cobre a parede ao lado da porta do quarto.
