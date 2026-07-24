# Matriz responsiva e de navegadores — QA-003

Data: 2026-07-22  
Escopo: home pública implementada  
Requisitos: `RWD-001..005`

## Resultado automatizado

A matriz executável passou 24/24 cenários, sem skips, erros de runtime ou
overflow horizontal. Cada navegador foi verificado em 320×800, 360×800,
390×844, 768×1024, 1024×768 e 1440×900.

| Ambiente executado | Versão observada | Resultado |
|---|---:|---|
| Chromium for Testing | 149.0.7827.55 | 6/6 |
| Microsoft Edge estável | 150.0.4078.83 | 6/6 |
| Firefox Playwright | 151.0 | 6/6 |
| WebKit Playwright | 26.5 | 6/6 |

Os cenários validam HTTP 200, H1 e conteúdo principal, ausência de overflow,
imagem eager, carregamento real da imagem lazy, menu móvel por teclado, navegação
desktop, FAQ, CTA visível e ausência de erros no console/página. As 24 capturas
estão em `artifacts/compatibility/`; o relatório HTML fica em
`artifacts/playwright/compatibility-report/index.html`.

## Inspeção visual

Foram revisadas as capturas de 320 e 1440 px dos quatro ambientes. A hierarquia,
legibilidade, navegação, cards, demonstração, FAQ, CTA final e rodapé permaneceram
consistentes. A primeira captura evidenciou que screenshots de página inteira
podiam ocorrer antes do carregamento lazy fora da viewport; o teste passou a
rolar até a demonstração e exigir `complete && naturalWidth > 0` antes de gerar
a evidência.

## Limitações e pendência manual

Esta estação Windows não possui Chrome estável nem versões anteriores instaladas,
e não pode executar Safari real. Chromium e WebKit Playwright são evidência de
engine, mas não substituem os navegadores distribuídos aos usuários.

Para concluir `RWD-005`, ainda é necessário registrar smoke nas duas versões
estáveis mais recentes de Chrome, Edge e Firefox e nas versões atual e anterior
do Safari disponíveis na data do teste. Safari deve ser executado em macOS real;
as versões anteriores dos demais navegadores também precisam de ambiente
controlado ou serviço de browser testing. Até isso ocorrer, `QA-003` permanece
aberta.
