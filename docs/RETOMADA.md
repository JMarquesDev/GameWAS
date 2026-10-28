# Preparação para continuidade — WAS

Análise em 19/10/2026. Entrega informada: 02/11/2026 (14 dias). O documento de contexto foi tratado como histórico e planejamento; esta retomada não implementa novas funcionalidades nem cria arte final.

## Estado conferido no código

- Web: menu, movimento lateral, câmera, três pistas, inspeção geométrica 3D por controle deslizante e persistência local da primeira memória.
- Fases 2–7: classes registradas no Phaser, mas apenas telas reservadas. Não existe percurso jogável entre fases.
- Mobile: cartões por toque com regras e persistência próprias; ainda sem exploração lateral. A adequação em aparelho físico não foi verificada nesta análise.
- Assets: pastas contêm apenas `.gitkeep`. Desenhos, sprites, modelos, áudio e vídeo do epílogo não estão incorporados, mesmo que já existam com a equipe.
- Git: repositório sem commits, com os arquivos ainda não rastreados. Preparar um primeiro registro da base é recomendado antes da implementação seguinte. A leitura exigiu `git -c safe.directory=C:/Users/DEV/Desktop/WAS`; nenhuma configuração global foi alterada.

## Diferenças entre intenção e implementação

1. `Progress` em `packages/game-core/src/index.ts` contém somente versão, pistas da infância e um booleano de memória. Para sete fases, será necessário representar fase atual, memórias, escolhas e checkpoints, com migração dos saves existentes.
2. A cena bloqueia movimento durante inspeção. Ainda não há um estado comum para exploração, transição, diálogo, flashback e QTE. O fade inicial não possui bloqueio explícito de entrada.
3. O flashback em `apps/web/src/pages/App.tsx` aparece como texto após a recuperação da memória, sem sequência de falas ou pausa da exploração.
4. A tecla E exige proximidade; o clique abre objetos sem verificar distância. Definir uma regra única ou registrar que essa diferença é intencional.
5. O cérebro é representado por sete pontos, e a inspeção do relógio usa uma caixa geométrica. Ambos são representações provisórias.
6. A retomada preserva pistas e primeira memória; não preserva posição de Oliver, fase ou checkpoint.

## Ordem proposta de trabalho

### Antes dos desenhos finais

1. Registrar a base no Git e definir o recorte de entrega com a equipe, considerando os 14 dias restantes e os entregáveis além do jogo.
2. Implementar um controlador de fluxo com bloqueio de controles e interações durante transição, inspeção, diálogo e flashback.
3. Generalizar progresso e save por fase, preservando saves versão 1 e testando avanço, recarga e dados inválidos.
4. Construir diálogo e transição reutilizáveis usando o quarto provisório e o texto existente. Critério: retornar ao controle somente ao encerrar a sequência e não avançar uma fase duas vezes.

### Ao receber o desenho da infância

1. Mapear resolução, camadas, piso caminhável, limites, entrada/saída, posição de Oliver, objetos e gatilhos.
2. Preparar fundos e sprites a partir do desenho aprovado. Registrar autoria e condições de uso em `docs/ASSETS.md`.
3. Integrar os três objetos, a primeira memória e a transição. Validar escala, legibilidade e enquadramento antes de replicar a estrutura.
4. Testar o ciclo menu → exploração → inspeção → pistas → flashback → transição, incluindo recarga e retorno ao menu.

### Após validar a primeira fase

Implementar conteúdo aprovado das fases seguintes, escolhas, QTE/checkpoints, áudio e epílogo. Definir em separado o recorte mobile light. Manter site, campanha, testes com melhoria registrada e relatórios dos 16 integrantes no planejamento geral: o protótipo técnico não substitui essas entregas.

## Materiais e decisões necessários

- Desenho da infância e referências de Oliver; depois, desenhos das demais fases.
- Roteiro consolidado: consequências das escolhas, doença/cirurgia e datas das lápides. Não inventar essas definições durante a implementação.
- Arquivo do epílogo e regra de ligação com a escolha final.
- Música/sons, créditos, responsáveis e recorte mínimo de mobile.

Preservar as decisões do contexto: Oliver médico, Santiago pai, Zoe namorada, Michael amigo; sete minutos como tempo narrativo; exploração lateral 2D com fundos pré-renderizados. Aguardar desenhos para ambientes finais.

## Validação desta retomada

- `npm.cmd run typecheck`: aprovado para web e mobile.
- `npm.cmd test`: 2 testes aprovados.
- `npm.cmd run build`: aprovado, com aviso de chunks grandes de Phaser e do visualizador 3D.
- Testes e build inicialmente falharam por `EPERM` no sandbox; passaram ao executar fora dele, sem alterações no código.
- Navegador, aparelho físico e exportação Android não foram revalidados nesta sessão. A validação histórica está em `docs/VALIDACAO.md`.

Somente este plano foi acrescentado aos arquivos-fonte; o build regenerou a saída web. Não foram atualizadas dependências nem implementadas funcionalidades.
