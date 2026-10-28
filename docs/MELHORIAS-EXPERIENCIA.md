# WAS — melhorias de experiência

Atualização: 26/10/2026.

## Implementado nesta etapa

- [x] Menu centralizado, sem imagem ao lado dos botões, com entrada suave e fade para o jogo.
- [x] Abertura em vídeo preservada, com fade para preto e opção de pular.
- [x] Continuar, novo jogo com confirmação de substituição do progresso e preferências.
- [x] Cenário ocupando a janela; câmera ajustada à proporção disponível e ao tamanho original da arte.
- [x] Interface sobre o cenário: diário, pausa, avisos e objetivo recolhível.
- [x] Pausa com Esc, ajuda, preferências e acesso ao menu; pausa ao perder foco.
- [x] Admin reunido na pausa, com seleção dos oito ambientes e acesso de teste às inspeções.
- [x] Salvamento da fase e posição; validação de posições ao carregar; compatibilidade com pistas anteriormente salvas.
- [x] Aceleração/desaceleração curta, estabilidade de direção nas diagonais e cadência conforme a velocidade.
- [x] Camadas de primeiro plano no quarto: frente da cama, banquinho e mochila, com silhuetas aproximadas da ilustração.
- [x] Destaque do objeto próximo, aparência reduzida após descoberta e aviso ao tentar investigar de longe.
- [x] Inspeção com objeto e texto lado a lado; pista opcional; controles assistidos recolhidos; setas e zoom pelo teclado.
- [x] Diário com pistas, reexame e conexão de pessoa, vínculo e assunto da lembrança.
- [x] Lembrança apresentada em sequência de falas, no ritmo do jogador, com revisão pelo diário.
- [x] Transições entre ambientes. Os posteriores ao quarto permanecem identificados como prévias.
- [x] Sons procedurais discretos de passos, descoberta e memória; ambiente suave, volume configurável e áudio iniciado por gesto.
- [x] Controles de toque para movimento e investigação; texto ampliado e redução de movimento.

## Validação

- 18 testes automatizados: progressão, conexão das pistas, interpretação dos saves, colisões e orientação/respiração.
- Typecheck web/mobile e compilação de produção.
- Navegador: menu, caminhada/câmera, investigação pelo cenário, orientação assistida, coleta das três pistas em origem de teste separada, conexão no diário, oito falas da lembrança, troca para laboratório e retomar após recarregar.
- O progresso de teste foi feito em localhost; o jogo principal usa 127.0.0.1, mantendo armazenamentos separados.

## Próximos itens da lista

- [ ] Refinar manualmente as silhuetas do primeiro plano e estender as camadas aos outros sete ambientes.
- [ ] Produzir quadros adicionais de caminhada para as quatro direções. Esta etapa melhora a cadência dos sprites existentes.
- [ ] Desenvolver as interações e a progressão narrativa dos demais capítulos, resolvendo o mapeamento entre sete fases e oito ambientes.
- [ ] Integrar trilha original, ambientes específicos e epílogo em vídeo da equipe. Os sons atuais são provisórios e procedurais.
- [ ] Refinar a arte dos objetos 3D conforme desenhos finais.
- [ ] Validar controles e desempenho em dispositivos móveis reais; a interface React Native continua uma implementação separada.
- [ ] Executar teste com jogadores novos e documentar dificuldades e ajustes; testes automatizados não substituem esse estudo.

Não foram definidos finais, consequências das escolhas ou novos fatos da história.
