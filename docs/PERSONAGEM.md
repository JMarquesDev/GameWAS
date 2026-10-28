# Oliver — primeira integração

Personagem colorido a partir das três poses da equipe. Uniforme ciano hospitalar: base #65B8BF, sombra #40868E e luz #A0D9DA; cabelo castanho, pele clara quente, óculos escuros e calçado cinza-claro. Cor de cabelo e pele são propostas iniciais, pois somente a cor do uniforme foi especificada.

ImageGen integrada: prompt para folha transparente com três poses de perfil direito, preservando identidade, anatomia e desenho; uniforme médico ciano, contornos finos e sombras 2D suaves. Arquivo: `apps/web/public/assets/characters/oliver-ciano-walk-v1.png`. Transparência verificada no PNG. Recortes e alinhamento feitos em tempo de execução pelo Phaser.

Movimento A/D ou setas, espelhamento para esquerda, ciclo inicial com as três poses, repouso na primeira pose e sombra de contato. Disponível no quarto e nas sete prévias. A caminhada ainda é um ciclo inicial com poucos quadros; uma pose neutra dedicada e mais quadros permitirão refiná-la. Obstáculos e oclusão por móveis ainda não foram implementados.

A imagem em preto e branco foi preservada separadamente como logo original: `apps/web/public/assets/branding/was-logo-original.jpg`. Não foi usada como sprite nem alterada.

## Ajuste de escala, caminho e menu

Escala do sprite aumentada de 0,205 para 0,30: altura visual aproximada de 280 px no canvas, um pouco abaixo da porta do quarto. O caminho acompanha pontos do piso em `walkRoutes.ts`: com A/D ou setas, Oliver desvia automaticamente pela frente da mesa e mochila. Os outros ambientes têm faixas de caminhada iniciais próprias. Este é um caminho guiado de teste, ainda sem navegação livre em profundidade ou colisão dinâmica com objetos móveis.

Menu separado em `pages/MainMenu.tsx`, com logo, Iniciar e Preferências. Iniciar abre o quarto e preserva pistas já salvas. Preferências persistidas no navegador: velocidade, redução de transições/efeitos e texto ampliado. Menu estilizado em `ui/menu.css` para facilitar alterações posteriores.

Validação: tipos web/mobile aprovados; três testes aprovados, incluindo percurso livre à frente da mesa/mochila; build web aprovado. Menu, preferências e escala do personagem conferidos no navegador sem erros de console observados.

## Vistas de frente, costas e respiração

Novos arquivos transparentes: `oliver-front-v1.png` e `oliver-back-v1.png`, em `apps/web/public/assets/characters`. ImageGen integrada usou a folha lateral como referência de identidade e paleta: homem magro, cabelo castanho ondulado, óculos retangulares, uniforme médico ciano e sapatos cinza-claro; três poses de corpo inteiro por folha, contornos e sombras 2D suaves, transparência real. Prompt de frente: repouso e passos em direção à câmera; prompt de costas: repouso e passos de afastamento. Arquivos 1536×1024; transparência verificada.

Movimento para cima usa costas, para baixo usa frente, laterais usam a arte existente. Ao parar, preserva a última direção. Os recortes são alinhados no Phaser. Respiração procedural de 3,2 segundos, com escala vertical de ±0,7% e horizontal de ±0,3%, ancorada nos pés. Desativada durante pausa/inspeção ou com redução de efeitos habilitada. A escala de perspectiva continua aplicada separadamente pelo controlador de exploração.

Tipos aprovados; dez testes aprovados, incluindo orientação e ciclo respiratório; compilação web aprovada. Nesta revisão a conferência no navegador não foi concluída por indisponibilidade da ferramenta de acesso à prévia. As poses de caminhada são uma primeira versão com poucos quadros.
