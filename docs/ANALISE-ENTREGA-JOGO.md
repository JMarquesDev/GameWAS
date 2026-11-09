# Análise da entrega do jogo — 09/11/2026

Escopo: somente jogo para navegador e evidências diretamente relacionadas. Mobile, site e campanha ficam com a equipe, fora desta avaliação. Mecânicas e artes não foram alteradas.

## Parecer

O WAS já tem uma implementação substancial, muito além da base descrita no README. Ainda não é possível declarar a entrega concluída: há falhas nos testes, elementos provisórios no encerramento e falta validar uma partida completa e reunir evidências acadêmicas.

| Requisito da atividade | Estado atual |
| --- | --- |
| Jogo funcional no navegador | Servidor local respondendo HTTP 200; build aprovado. Percurso completo não testado manualmente nesta sessão. |
| Nome, finalidade e orientações | Menu WAS / Memórias de Oliver, objetivos na HUD e ajuda na pausa. Confirmar compreensão com jogador novo, sem explicação oral. |
| Objetivo e resultado compreensíveis | Sete fases narrativas em 11 cenários; pistas, diário, puzzles, escolhas e sequência final implementados. Encerramento ainda contém texto provisório. |
| Protótipo com conceitos de Design | Cenários, identidade, interface e documentos presentes. Relacionar aos conceitos exigidos em aula, não enumerados no enunciado. |
| Testes e melhorias registrados | Há testes automatizados e documentos históricos. Falta consolidar validação atual, feedback de jogadores e ao menos uma melhoria decorrente dos testes. |
| Ferramentas e condições de uso | Assets de imagem, música, vídeo e inspeção presentes. docs/ASSETS.md ainda descreve a base inicial; consolidar autoria, origem, ferramentas, condições de uso e créditos. |

## Implementação encontrada

Exploração da infância, escola, faculdade, apartamento, laboratório do pai, hospital e campo. Infância e apartamento abrangem vários cenários. Há inspeção 3D, diário, puzzles, flashbacks, escolhas, sonolência, pausa, preferências, três slots de save, checkpoints, músicas, introdução em vídeo e vídeo do campo. Presença no código não comprova funcionamento de todo o percurso real.

## Pendências prioritárias

1. Investigar os três testes que falham: proximidade do relógio e duas verificações de colisão/rota na posição associada à mochila. É necessário conferir o cenário atual para distinguir regressão de expectativa antiga do teste.
2. Jogar do início ao fim sem modo administrativo, incluindo puzzles, transições, falha por sonolência, pausa, recarga e retomada dos saves.
3. Fechar o encerramento: FieldFinale.tsx declara narração provisória. App.tsx ainda informa epílogo ausente na opção de lembrar. O botão “Ir aos créditos” conclui e retorna ao menu, sem tela de créditos. O vídeo do campo existente não comprova integração do epílogo completo previsto no roteiro.
4. Corrigir a indicação “Fase ... de 8” dos saves: o mapa narrativo e a progressão têm sete fases, distribuídas em 11 cenários.
5. Atualizar o README: ele ainda informa fases 2–7 reservadas e ausência de áudio e epílogo. Preservar registros históricos datados e distinguir o estado atual.
6. Registrar teste com jogador novo, comentários recebidos e uma melhoria aplicada. Consolidar conceitos de Design e créditos dos materiais do jogo.

## Validação desta sessão

- npm.cmd run typecheck: aprovado para web e mobile; mobile não foi avaliado como entrega.
- npm.cmd run build: aprovado; aviso de bundles grandes, com desempenho real ainda a medir.
- npm.cmd test: 29 testes, 26 aprovados e 3 falhas. Falhas em packages/game-core/src/index.test.ts e apps/web/src/game/systems/navigation.test.ts.
- Servidor Vite ativo em http://127.0.0.1:5173/; requisição HTTP retornou 200. Isso comprova que a página é servida, não uma partida completa.
- Sandbox bloqueou subprocessos com EPERM inicialmente; build, testes e servidor foram executados com permissão ampliada.

## Antes de enviar ao GitHub

A pasta atual não foi reconhecida como repositório por git status; não foi possível conferir diff ou arquivos rastreados. O .gitignore já exclui node_modules, dist, .expo, logs e arquivos .env. Publicação e teste em URL externa não foram realizados. O prazo indicado na atividade é 02/11/2026; esta análise registra o estado observado em 09/11/2026.
