# Contexto de continuidade — projeto WAS

Copie este documento para iniciar uma nova conversa e continuar o trabalho.

## Pedido atual

Continuar o desenvolvimento do jogo WAS. A base técnica já existe em `C:\Users\DEV\Desktop\WAS`. A próxima etapa planejada é implementar os ambientes finais quando a equipe enviar os desenhos reais das cenas. Não criar cenários finais antes disso.

## Atividade escolar

Projeto integrador com entrega em **02/11/2026**. A equipe precisa entregar:

- Jogo funcional para navegador.
- Protótipo com os conceitos de Design exigidos em aula.
- Versão mobile light, pensada para toque e sessões curtas.
- Site responsivo de divulgação.
- Pelo menos 3 stories, 1 trailer/anúncio de 15 a 45 segundos e pelo menos 2 cartazes.
- Música-tema ou jingle original.
- Registro de testes, incluindo pelo menos uma melhoria aplicada depois dos testes.
- Apresentação de lançamento com 50 a 70 minutos, mostrando jogo web, mobile, site e peças de campanha; também deve contar uma dificuldade e como ela foi resolvida.
- Relatório diário e final de cada um dos 16 integrantes.

O checklist completo está em `CHECKLIST-ENTREGAVEIS.md`.

## Jogo

Nome: **WAS**.

É uma experiência narrativa de investigação sobre memória, identidade, escolhas, livre-arbítrio, doença e aceitação. Pergunta central: **“Se você perdesse todas as suas memórias, ainda seria a mesma pessoa?”**

O jogador controla Oliver, que acorda sem memórias. Ao investigar objetos, documentos, pessoas e situações, reconstrói fragmentos da própria vida. A cada memória recuperada, uma parte de um cérebro visual é iluminada. Os sete minutos são **tempo narrativo**, não uma duração real de jogo.

## Personagens e decisões já confirmadas

- **Oliver:** protagonista; sua profissão é médico.
- **Santiago:** pai de Oliver.
- **Zoe:** namorada de Oliver. O nome correto é Zoe; textos antigos que mencionem Marília devem ser corrigidos.
- **Michael:** amigo de Oliver.
- **Consciência:** aparece no final.
- Haverá sete fases e um **epílogo em vídeo**, que a equipe afirmou já ter produzido.
- As consequências das escolhas ainda precisam ser definidas.
- A doença, a cirurgia e explicações médicas/científicas ainda precisam de revisão e consolidação pela equipe.
- Também falta consolidar a lógica das lápides e das datas finais.

## Estrutura narrativa

1. **Infância — quarto:** Oliver acorda e aprende a investigar. Brinquedos, livros, relógio, foto e desenho do cérebro trazem a primeira memória e apresentam a relação com o pai.
2. **Adolescência — escola:** redações, uniforme, armários, celular e relógio. Reconstrói a decisão de ser médico.
3. **Jovem adulto — faculdade/laboratório:** Michael e os primeiros sinais da doença; desmaios, dores de cabeça e lapsos de memória.
4. **Relacionamento — apartamento:** Zoe percebe o esquecimento e a exaustão de Oliver; conflito entre confiança e autonomia.
5. **Descobertas e aceitação — laboratório do pai:** investiga exames e descobre a doença; aprofunda a decisão de confiar no pai.
6. **Adulto/doença — hospital:** cirurgia, perda de memória e passagem para o campo.
7. **Campo:** conversa com a Consciência, lápides de Oliver e do pai, última escolha sobre lembrar ou não.
8. **Epílogo em vídeo:** encerra a experiência. Falta integrar sua relação com a última escolha.

## Fluxo de experiência desejado

**Tela inicial → animação/transição de abertura → cenário da fase com exploração e interações → descoberta, puzzle ou flashback → transição/animação → próximo cenário → epílogo em vídeo.**

Durante transições, diálogos, flashbacks e inspeção de objetos, os controles de exploração ficam bloqueados. Ao retornar ao cenário, o jogador recupera o controle.

## Mecânicas definidas

- Exploração com movimentação livre em **2D lateral**, para esquerda e direita.
- Oliver terá animações de entrada, repouso e caminhada.
- Objetos interativos podem abrir pistas, documentos, diálogos, enigmas ou flashbacks.
- Alguns objetos precisam ser inspecionados e girados em 3D, inspirados na mecânica de inspeção de objetos de Resident Evil 7.
- Haverá coleta de pistas; certas combinações liberam a memória da fase.
- O cérebro mostra o progresso das sete memórias.
- A mecânica de “acordar” escurece a tela e pede cliques/toques repetidos; caso falhe, a fase reinicia ou volta a checkpoint.
- Haverá QTEs em momentos definidos pelo roteiro.
- Diálogos e escolhas existem, mas os efeitos finais ainda precisam ser definidos.
- Jogo deve salvar e retomar progresso.

## Direção visual

Foi enviada uma referência de um quarto infantil 3D renderizado: ambiente rico em objetos, luz natural entrando pelas janelas, materiais detalhados, sombras suaves e narrativa ambiental. Essa imagem é apenas **referência de acabamento**, não é um cenário a ser incluído nem um asset a reutilizar.

Direção aprovada:

- Cenários com aparência de render 3D/ilustração 3D, mas usados como fundos pré-renderizados em uma experiência lateral 2D.
- Profundidade por camadas: fundo, plano jogável, objetos interativos e primeiro plano.
- Iluminação e objetos devem contar a história da fase.
- Os desenhos reais da equipe serão a base obrigatória para montar cada cenário final. Aguardar esses desenhos antes de criar cenários finais.
- Ao receber cada desenho, definir: área caminhável de Oliver, ordem de profundidade, objetos interativos, posições de entrada/saída, pontos de puzzle, documentos, transição e assets necessários.

## Stack definida

| Parte | Tecnologia | Uso |
|---|---|---|
| Linguagem | TypeScript | Regras, conteúdo e aplicações |
| Web | React + Vite | Menus, páginas, diálogos, inventário e interface |
| Jogo web | Phaser 3 | Cena 2D, movimento, câmera, interações e transições |
| Inspeção 3D | Three.js + React Three Fiber | Visualizador de objetos 3D giráveis |
| Estado web | Zustand | Estado de UI e progresso da partida |
| Áudio web | Howler.js | Preparado, mas ainda não implementado |
| Mobile light | React Native + Expo | Adaptação para toque; ainda inicial |
| Áudio mobile | expo-audio | Preparado, mas ainda não implementado |
| Regras compartilhadas | `packages/game-core` | Pistas, validação e formato do save |
| Conteúdo compartilhado | `packages/game-content` | Fases, objetos e diálogos |
| Persistência | localStorage / AsyncStorage | Save independente por plataforma |
| Testes | Vitest | Regras de progressão |

Phaser é usado apenas na versão web. A adaptação React Native deve compartilhar regras, texto e conteúdo, mas terá renderização/interface própria.

## Estrutura de arquivos criada

```text
WAS/
├── apps/
│   ├── web/                 # React, Vite, Phaser e visualizador 3D
│   │   ├── public/assets/   # backgrounds, characters, objects, models, audio, videos
│   │   └── src/game/scenes/ # um arquivo por fase
│   └── mobile/              # Expo / React Native
├── packages/
│   ├── game-core/           # regras, progresso e save
│   ├── game-content/        # dados narrativos e objetos
│   └── design-tokens/       # cores compartilhadas provisórias
├── docs/
├── CHECKLIST-ENTREGAVEIS.md
├── README.md
└── CONTEXTO-PARA-OUTRA-CONTA.md
```

## Estado do código atual

A base existe e foi validada, mas é um protótipo técnico e visual provisório.

### Web já funciona

- Tela inicial com “Entrar no quarto” / “Continuar”.
- Primeira cena Phaser: `apps/web/src/game/scenes/InfanciaScene.ts`.
- Quarto geométrico provisório, sem arte final.
- Oliver provisório feito com formas simples; movimentação por A/D ou setas.
- Câmera acompanha Oliver.
- Três objetos da infância: relógio, fotografia e desenho do cérebro.
- Clique no objeto ou tecla E perto dele abre uma inspeção.
- O relógio abre visualizador 3D provisório com controle de rotação.
- Coletar três pistas libera “Recuperar memória”, que exibe um pequeno diálogo de flashback.
- Save local funciona; ao recarregar, o botão “Continuar” aparece.
- Arquivos reservados para fases 2–7 já existem, mas são placeholders sem conteúdo jogável.

### Mobile já funciona como base estrutural

- `apps/mobile/App.tsx` mostra versão touch inicial da investigação.
- Usa as mesmas regras e o mesmo conteúdo do web.
- Ainda não há cenário, movimento lateral, animação, inspeção 3D nem teste em aparelho físico.

### Ainda pendente

- Arte final, sprites e animações de Oliver.
- Cenários desenhados pela equipe e camadas de parallax/profundidade.
- Modelos 3D finais dos objetos.
- Áudio, música, efeitos, volume e acessibilidade.
- QTE, checkpoints e a mecânica de acordar.
- Sistema final de escolhas e consequências.
- Flashbacks completos e transições entre fases.
- Conteúdo das fases 2–7.
- Integração do epílogo em vídeo.
- Site de divulgação e materiais de campanha.
- Teste mobile em aparelho físico.

## Comandos úteis no VS Code

Abrir a pasta `C:\Users\DEV\Desktop\WAS` e usar o terminal integrado.

```powershell
npm.cmd run dev        # inicia a web; Vite normalmente usa http://127.0.0.1:5173
npm.cmd run build      # build de produção da web
npm.cmd run typecheck  # confere tipos web e mobile
npm.cmd test           # testes das regras
npm.cmd run mobile     # inicia Expo
```

Neste computador, `npm` no PowerShell apresentou problema de launcher; usar `npm.cmd` funciona. Dependências já estão instaladas. Não atualizar React ou React Native isoladamente; a versão está alinhada ao Expo SDK 54.

## Validações já feitas

- `npm.cmd run typecheck`: passou para web e mobile.
- `npm.cmd test`: 2 testes passaram.
- `npm.cmd run build`: passou; saída em `apps/web/dist`.
- Exportação Android do Expo passou; gerou bundle Android, não APK.
- Navegador: menu, quarto, inspeção 3D, coleta de pista, contador e save foram testados sem erro de console observado.

Há aviso de bundle grande por Phaser e Three.js. O visualizador 3D e o jogo são carregados sob demanda; desempenho real em celulares continua pendente.

## Próximo passo recomendado ao retomar

Quando a equipe enviar as cenas desenhadas:

1. Analisar o desenho da Fase 1 e registrar os planos de profundidade, caminho de Oliver, objetos investigáveis e gatilhos.
2. Converter o desenho em assets/camadas; não usar a imagem de referência como asset.
3. Substituir o quarto geométrico e o Oliver provisório.
4. Implementar a transição de tela inicial para Fase 1.
5. Criar uma transição reutilizável entre fases.
6. Só depois repetir o sistema nas demais fases.

## Limites e preferências do usuário

- O usuário quer construir os ambientes somente quando enviar os desenhos reais.
- A referência visual deve inspirar o acabamento, não ser copiada como uma cena do jogo.
- A prioridade é uma experiência narrativa bem acabada, com ambientes ricos e objetos significativos, sem transformar o projeto em exploração 3D livre.
- O usuário pediu que a estrutura fosse iniciada na pasta WAS; isso já foi feito.
