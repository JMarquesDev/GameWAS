# Validação inicial — 14/10/2026

- `npm.cmd run typecheck`: aprovado para web e mobile.
- `npm.cmd test`: dois testes aprovados (progressão sem duplicação de pistas e recuperação de saves inválidos).
- `npm.cmd run build`: aprovado; saída em `apps/web/dist`.
- `node ../../node_modules/expo/bin/cli export --platform android --output-dir dist --max-workers 2`, em `apps/mobile`: aprovado. Gera bundle Android, não um APK instalável.
- Navegador: menu e quarto renderizados; inspeção 3D aberta; pista guardada; contador atualizado para 1/3; após recarregar, botão Continuar disponível. Nenhum erro de console observado nessa verificação.

Limites: mobile ainda não testado em aparelho físico. Não foi validado o percurso das sete fases, que ainda não estão implementadas. Modelos e cenário são provisórios. Vite informa bundles grandes para Phaser e Three.js; ambos já são carregados sob demanda, mas desempenho em dispositivos reais continua pendente.

Neste computador, o launcher `npm` do PowerShell falhou; `npm.cmd` funcionou. Compiladores Vite/Hermes exigiram execução fora do sandbox da ferramenta por restrições de acesso do ambiente. Nenhuma configuração global do npm ou do Git foi alterada.
