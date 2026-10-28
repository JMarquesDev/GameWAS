# Primeira investigação — pacotes A–D

Implementação web, pasta `C:\Users\DEV\Desktop\WAS`. Projeto aberto no VS Code.

## Fluxo

1. Caminhar até um dos três objetos destacados; E abre o mais próximo. Clique também exige proximidade.
2. A exploração pausa com a janela aberta.
3. Arrastar gira o objeto nos dois eixos; roda do mouse ou slider controla zoom. Botões permitem girar, inclinar, ver verso e restaurar.
4. Relógio e fotografia exigem apresentar o verso; desenho exige a frente. A condição tolera ângulos intermediários, sem exigir precisão de pixel.
5. Examinar detalhe registra a pista uma única vez e apresenta sua transcrição legível.
6. Fechar devolve o controle. Diário permite reler as pistas e também pausa o jogo.
7. As três pistas liberam Recuperar memória e o diálogo de infância. O progresso e a conclusão continuam salvos localmente.

## Objetos

- Relógio de presente: modelo procedural com pulseira, caixa metálica, mostrador 07:00 e dedicatória no verso. Separado do relógio de parede.
- Fotografia: volume fino frente/verso, ilustração esquemática de pai e criança, rosto apagado e anotação “Ele ficaria feliz.”. Arte provisória para teste.
- Desenho do cérebro: folha frente/verso com desenho e frase, texturas feitas por código.

Geometria, materiais e texturas são locais, sem downloads ou dependência de arquivos GLB. O visualizador pode receber modelos GLB mais refinados posteriormente. Renderiza sob demanda, com resolução limitada a 1,5× e descarte das texturas ao desmontar.

## Arquivos

- `inspection/ObjectModels.tsx`: objetos e texturas.
- `inspection/ObjectViewer.tsx`: rotação, zoom, orientação e recuperação de falha de renderização.
- `inspection/InspectionDialog.tsx`: exame e registro de pistas.
- `pages/MemoryJournal.tsx`: diário.
- `packages/game-content`: dados narrativos e pontos de interação.
- `packages/game-core`: proximidade, face examinável e progressão compartilháveis.

## Validação e limites

Tipos web/mobile aprovados; 14 testes aprovados, incluindo face da pista, proximidade e pontos acessíveis no chão; build web aprovado. Saves anteriores preservados: pistas antigas não são apagadas.

Conferência no navegador: relógio 3D, verso com dedicatória, arraste alterando a face examinável, restauração, desenho e diário com as três pistas e memória recuperada. Nenhum erro de console observado. O modo Admin oferece atalhos para testar cada inspeção sem caminhar; o modo normal mantém a exigência de proximidade.

O mobile mantém sua interface de cartões anterior; a inspeção 3D desta entrega é web. A adaptação nativa e os objetos das outras fases são a expansão E, ainda pendente. Arte final das fotos/desenhos, áudio e animação de flashback ainda podem ser refinados pela equipe.
