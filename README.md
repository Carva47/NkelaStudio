# Site do Estúdio — Front-end

Site de uma só página para um estúdio de fotografia e vídeo, feito só com **HTML, CSS e JavaScript puros**
(sem frameworks, sem instalação, sem servidor). Baseado no design "Photography and Videography Website"
do Figma Community.

## Como abrir

- **Mais simples:** faça duplo clique em `index.html`.
- **Recomendado para desenvolver:** no VS Code, instale a extensão *Live Server*, clique com o botão direito em
  `index.html` → *Open with Live Server*. A página actualiza sozinha a cada alteração.

## Estrutura de ficheiros

```
index.html              Estrutura da página (secções, menu, janelas)
css/
  variaveis.css         ★ Cores, fontes e medidas da identidade visual
  base.css              Reset, contentor, cabeçalhos de secção, animação de entrada
  componentes.css       Estilo de cada parte: menu, hero, cartões, janelas, carrinho, formulário, rodapé
js/
  config.js             ★ Nome, slogan, logótipo, contactos, redes sociais, moeda
  dados.js              ★ Listas de fotografias, vídeos e produtos
  utils.js              Funções de apoio (ícones, criar elementos, filtros, janelas, avisos)
  portfolio.js          Abas, filtros, lightbox e reprodutor de vídeo
  loja.js               Produtos e carrinho (guardado no navegador)
  contacto.js           Validação e envio do formulário
  main.js               Menu, ícones, dados do config, destaque da secção activa, animações
img/                    Coloque aqui o logótipo e as fotografias do estúdio
```

Os ficheiros marcados com ★ são os que se editam para adaptar o site a um estúdio.
O código está comentado, ficheiro a ficheiro, para quem for continuar o trabalho.

## Identidade visual aplicada (Nkela Studios)

Os ficheiros vêm da pasta partilhada "Nkela Studios - Identidade Visual" e estão em `img/marca/`:

| Ficheiro | Para que serve |
|---|---|
| `logo-fundo-escuro.png` | **Usado no site** (menu, primeira secção, rodapé). Fundo transparente, feito a partir da versão "sobre castanho" para ler bem em fundos escuros |
| `logo-principal.png`, `logo-fundo-branco.png`, `logo-fundo-cinza.png` | Originais da marca, para fundos claros (não usados no site) |
| `logo-sobre-castanho-original.png` | Original sobre fundo castanho |
| `padrao-africano.png` / `padrao-dourado.png` | Padrão da marca; a versão dourada decora a primeira secção |
| `padrao-dourado-espelhado.png` | Padrão dourado espelhado 2×2 (sem emendas), usado no fundo de todas as secções e do rodapé. Intensidade e tamanho em `css/variaveis.css` (`--opacidade-padrao`, `--tamanho-padrao`; `0` desliga) |
| `icones-redes-castanho.png` | Folha de ícones da marca. Os ícones foram recortados e pintados a dourado em `img/icones/` (usados no Contacto e no botão do WhatsApp) |
| `fundo-marca.jpg` | Fundo institucional da marca (referência) |
| `favicon.png` | Ícone do separador do navegador |

**Cores** (em `css/variaveis.css`): castanho `#803E1E`, dourado `#F2C246`, cinzento `#959595`.
O castanho é escuro demais para texto sobre fundo escuro, por isso o destaque (botões, links activos,
etiquetas) é o dourado, com texto escuro por cima, e o castanho aparece em brilhos, contornos e no logótipo.

**Fontes:** Poppins já aplicada (`fontes/`, declarada em `css/fontes.css`). O **Espera Bold** (títulos) aguarda os ficheiros do estúdio: instruções no topo de `css/fontes.css`.

**Ainda por aplicar:** o email e os vídeos (`youtubeId`). Contactos e redes sociais reais (`js/config.js`). Portfólio, banner e imagem do "Sobre" já são fotos do estúdio (`img/portfolio/`, `img/banner-hero.jpg`, `img/sobre.jpg`).

## Como personalizar

### 1. Identidade visual → `css/variaveis.css`
- **Cores:** altere `--cor-primaria` (e a versão `--cor-primaria-hover`) para a cor da marca.
  Os fundos e textos também estão ali.
- **Fontes:** declare as fontes (`@font-face` ou link do Google Fonts no `<head>` do `index.html`) e escreva o
  nome em `--fonte-titulos` e `--fonte-corpo`.

### 2. Dados do estúdio → `js/config.js`
- `nome`, `slogan`, `logo` (ex.: `'img/logo.svg'`; vazio = mostra o nome em texto)
- `contacto`: telefone, **WhatsApp** (só dígitos, com indicativo: `244911844888`), `mensagemInicial` (SMS já escrita nos botões de WhatsApp), `morada` (linhas; o cartão abre o Google Maps) e email (vazio = não aparece)
- `metodoEnvio`: `'whatsapp'` ou `'email'` (como o formulário de contacto entrega a mensagem)
- `redes`: endereços do Instagram, Facebook, TikTok e YouTube (vazio = o ícone desaparece); `redesTexto`: o texto mostrado ao lado de cada ícone
- `moeda`: símbolo e formato dos preços

### 3. Portfólio e loja → `js/dados.js`
- Para acrescentar uma foto, vídeo ou produto, copie um bloco `{ ... }` e altere os valores.
- Categorias novas criam automaticamente novos botões de filtro.
- **As imagens actuais são fotos de exemplo** de um banco de imagens gratuito. Substitua pelas do estúdio
  (guarde em `img/` e use `imagem: 'img/nome-do-ficheiro.jpg'`).
- **Vídeos:** preencha `youtubeId` (o código do link do YouTube) ou `ficheiro` (um `.mp4` seu).
  Enquanto estiverem vazios, o cartão mostra um aviso de "vídeo indisponível".
- Os preços são exemplos, em Kz.

### 4. Textos fixos → `index.html`
Os textos do hero, "Sobre" e rodapé estão directamente no HTML (em português). Edite-os ali.

## Funcionalidades

| Funcionalidade | Onde |
|---|---|
| Menu fixo, versão telemóvel com "hambúrguer", destaque da secção activa | `main.js` |
| Aparecimento suave dos blocos ao rolar (respeita "reduzir movimento") | `main.js`, `base.css` |
| Portfólio com abas Fotografia / Vídeo e filtros por categoria | `portfolio.js` |
| Lightbox: setas, teclado (← → Esc), deslizar no telemóvel, clicar no fundo para fechar | `portfolio.js` |
| Reprodutor de vídeo (YouTube ou ficheiro próprio) | `portfolio.js` |
| Loja com filtros e carrinho (quantidades, remover, total, lembra-se após recarregar) | `loja.js` |
| Encomenda: abre o WhatsApp com a lista e o total já escritos | `loja.js` |
| Contacto curto: canais com os ícones da marca (WhatsApp, Instagram, Facebook, TikTok) e formulário de 2 campos (nome + mensagem, envia por WhatsApp) | `index.html`, `contacto.js` |
| Botão flutuante do WhatsApp (lado direito a meio do ecrã, com pulso e texto ao passar o rato) | `index.html`, `componentes.css` |
| Rodapé: faixa de chamada para WhatsApp, 4 colunas (marca e redes, navegação, serviços, contactos) e barra final com "Voltar ao topo" | `index.html`, `componentes.css` |
| Imagens com carregamento preguiçoso e imagem de reserva se falharem | `utils.js` |

## Limitações (por ser só front-end)

- **Não há pagamento online nem base de dados.** A encomenda e o formulário abrem o WhatsApp (ou o email) com a
  mensagem pronta; quem envia é o visitante. Para pagamentos, contas de cliente ou receber mensagens sem
  intervenção do visitante é preciso um servidor.
- O carrinho fica guardado no navegador do visitante (`localStorage`), não é partilhado entre dispositivos.
- As imagens de exemplo precisam de internet; as suas próprias, em `img/`, não.

## Acessibilidade e compatibilidade

Navegação completa por teclado, rótulos para leitores de ecrã, contorno visível no foco, estados ARIA nas abas e
nos filtros, janelas nativas `<dialog>`. Funciona nas versões actuais de Chrome, Edge, Firefox e Safari.
