/* ==========================================================================
   utils.js  —  FUNÇÕES DE APOIO PARTILHADAS
   --------------------------------------------------------------------------
   Pequenas ferramentas usadas por vários ficheiros:
     • icone()            cria um ícone SVG
     • criar()            cria elementos HTML de forma segura
     • criarImagem()      cria <img> com carregamento preguiçoso e imagem de reserva
     • formatarPreco()    escreve preços no formato do estúdio
     • criarFiltros()     cria os botões de filtro por categoria
     • abrirDialogo() / fecharAoClicarFora()   gestão das janelas
     • mostrarAviso()     mensagem temporária no fundo do ecrã
     • lerArmazenamento() / gravarArmazenamento()   memória do navegador
   Tudo fica disponível em "Estudio.utils".
   ========================================================================== */

(function () {
  'use strict';

  window.Estudio = window.Estudio || {};

  /* -----------------------------------------------------------------------
     ÍCONES
     Cada ícone é só o "miolo" de um SVG (linhas e formas), no estilo de
     traço fino. A função icone() embrulha-o num <svg> completo.
     ----------------------------------------------------------------------- */
  const ICONES = {
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    sacola: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    carrinho: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    mais: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    menos: '<path d="M5 12h14"/>',
    lixo: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    'seta-esquerda': '<path d="m15 18-6-6 6-6"/>',
    'seta-direita': '<path d="m9 18 6-6-6-6"/>',
    imagem: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    moldura: '<line x1="22" x2="2" y1="6" y2="6"/><line x1="22" x2="2" y1="18" y2="18"/><line x1="6" x2="6" y1="2" y2="22"/><line x1="18" x2="18" y1="2" y2="22"/>',
    tshirt: '<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>',
    email: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    telefone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    local: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    youtube: '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'
  };

  /**
   * Cria um ícone SVG pronto a inserir na página.
   * @param {string} nome    - nome do ícone (uma das chaves de ICONES)
   * @param {number} tamanho - largura e altura em pixels (por omissão 20)
   * @returns {Node} o elemento <svg> (ou um nó vazio se o nome não existir)
   */
  function icone(nome, tamanho) {
    const miolo = ICONES[nome];
    if (!miolo) return document.createTextNode('');
    const t = tamanho || 20;
    // Um <template> deixa-nos transformar texto em elementos sem executar nada.
    // O texto vem sempre do objecto ICONES acima (escrito por nós), nunca de utilizadores.
    const modelo = document.createElement('template');
    modelo.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + t + '" height="' + t +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      miolo + '</svg>';
    return modelo.content.firstElementChild;
  }

  /* -----------------------------------------------------------------------
     CRIAR ELEMENTOS HTML
     Em vez de montar HTML como texto (o que pode ser inseguro se o texto vier
     de fora), criamos os elementos um a um e definimos o texto com textContent.
     ----------------------------------------------------------------------- */

  /**
   * Cria um elemento HTML.
   * @param {string} etiqueta - ex.: 'div', 'button', 'p'
   * @param {Object} atributos - ex.: { class: 'cartao', type: 'button', texto: 'Olá' }
   *                  A chave especial "texto" define o texto do elemento.
   * @param {Array}  filhos - elementos ou textos para colocar lá dentro
   */
  function criar(etiqueta, atributos, filhos) {
    const el = document.createElement(etiqueta);
    Object.keys(atributos || {}).forEach(function (chave) {
      const valor = atributos[chave];
      if (valor === null || valor === undefined || valor === false) return;
      if (chave === 'texto') el.textContent = valor;
      else el.setAttribute(chave, valor === true ? '' : valor);
    });
    (filhos || []).forEach(function (filho) {
      if (filho === null || filho === undefined || filho === false) return;
      el.appendChild(typeof filho === 'string' ? document.createTextNode(filho) : filho);
    });
    return el;
  }

  /* Imagem de reserva (um quadrado cinzento com texto) mostrada se uma foto não carregar */
  const IMAGEM_RESERVA =
    'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#18181b"/>' +
      '<text x="200" y="155" fill="#71717a" font-family="sans-serif" font-size="18" text-anchor="middle">Imagem indisponível</text>' +
      '</svg>'
    );

  /**
   * Cria uma <img> com:
   *  - loading="lazy": só descarrega quando está perto de aparecer no ecrã (site mais rápido)
   *  - imagem de reserva se o endereço falhar
   */
  function criarImagem(origem, descricao, classe) {
    const img = criar('img', {
      src: origem,
      alt: descricao || '',
      loading: 'lazy',
      decoding: 'async',
      class: classe
    });
    let jaUsouReserva = false; // Evita um ciclo infinito caso a própria reserva falhe
    img.addEventListener('error', function () {
      if (jaUsouReserva) return;
      jaUsouReserva = true;
      img.src = IMAGEM_RESERVA;
    });
    return img;
  }

  /* -----------------------------------------------------------------------
     PREÇOS
     ----------------------------------------------------------------------- */

  /** Escreve um número como preço, ex.: 25000 → "25 000 Kz" (ver config.js) */
  function formatarPreco(valor) {
    const cfg = (window.ESTUDIO_CONFIG && window.ESTUDIO_CONFIG.moeda) || { simbolo: '', local: 'pt-PT' };
    const numero = Number(valor) || 0;
    return numero.toLocaleString(cfg.local, { maximumFractionDigits: 2 }) + ' ' + cfg.simbolo;
  }

  /* -----------------------------------------------------------------------
     FILTROS POR CATEGORIA (usados no portfólio e na loja)
     ----------------------------------------------------------------------- */

  /**
   * Preenche um contentor com botões de filtro ("Todos", "Retrato", ...).
   * @param {HTMLElement} contentor  - onde colocar os botões
   * @param {string[]}    categorias - lista de categorias (sem repetidas)
   * @param {Function}    aoEscolher - função chamada com a categoria escolhida
   */
  function criarFiltros(contentor, categorias, aoEscolher) {
    contentor.replaceChildren();
    ['Todos'].concat(categorias).forEach(function (categoria, indice) {
      const botao = criar('button', {
        class: 'filtro',
        type: 'button',
        'aria-pressed': indice === 0 ? 'true' : 'false',
        texto: categoria
      });
      botao.addEventListener('click', function () {
        // Só o botão clicado fica "premido"; os outros desligam
        contentor.querySelectorAll('.filtro').forEach(function (b) {
          b.setAttribute('aria-pressed', b === botao ? 'true' : 'false');
        });
        aoEscolher(categoria);
      });
      contentor.appendChild(botao);
    });
  }

  /* -----------------------------------------------------------------------
     JANELAS (<dialog>)
     ----------------------------------------------------------------------- */

  /** Abre uma janela e impede a página de rolar por trás dela */
  function abrirDialogo(dialogo) {
    if (dialogo.open) return;
    if (typeof dialogo.showModal === 'function') dialogo.showModal();
    else dialogo.setAttribute('open', ''); // navegadores muito antigos
    document.documentElement.style.overflow = 'hidden';
  }

  /**
   * Liga os comportamentos comuns a uma janela:
   *  - botões com o atributo data-fechar fecham-na
   *  - clicar no fundo escuro (fora da janela) fecha-a
   *  - ao fechar (por qualquer meio, incluindo a tecla Esc) a rolagem volta ao normal
   */
  function ligarDialogo(dialogo, aoFechar) {
    dialogo.querySelectorAll('[data-fechar]').forEach(function (botao) {
      botao.addEventListener('click', function () { dialogo.close(); });
    });

    dialogo.addEventListener('click', function (evento) {
      // Cliques no fundo escuro chegam com o próprio <dialog> como alvo.
      // Confirmamos também que o clique foi fora da caixa da janela.
      if (evento.target !== dialogo) return;
      const caixa = dialogo.getBoundingClientRect();
      const fora = evento.clientX < caixa.left || evento.clientX > caixa.right ||
                   evento.clientY < caixa.top  || evento.clientY > caixa.bottom;
      if (fora) dialogo.close();
    });

    dialogo.addEventListener('close', function () {
      document.documentElement.style.overflow = '';
      if (aoFechar) aoFechar();
    });
  }

  /* -----------------------------------------------------------------------
     AVISO TEMPORÁRIO
     ----------------------------------------------------------------------- */
  let temporizadorAviso = null;

  /** Mostra uma mensagem no fundo do ecrã durante ~2,5 segundos */
  function mostrarAviso(mensagem) {
    const aviso = document.getElementById('aviso');
    if (!aviso) return;
    aviso.textContent = mensagem;
    aviso.classList.add('visivel');
    clearTimeout(temporizadorAviso); // Se já havia um aviso, reinicia a contagem
    temporizadorAviso = setTimeout(function () {
      aviso.classList.remove('visivel');
    }, 2500);
  }

  /* -----------------------------------------------------------------------
     MEMÓRIA DO NAVEGADOR (localStorage)
     Usada para guardar o carrinho entre visitas. O try/catch protege os casos
     em que o navegador bloqueia o armazenamento (modo privado, por exemplo).
     ----------------------------------------------------------------------- */
  function lerArmazenamento(chave, valorPorOmissao) {
    try {
      const texto = window.localStorage.getItem(chave);
      return texto === null ? valorPorOmissao : JSON.parse(texto);
    } catch (erro) {
      return valorPorOmissao;
    }
  }

  function gravarArmazenamento(chave, valor) {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
      /* Sem armazenamento: o carrinho continua a funcionar, só não é lembrado. */
    }
  }

  /* Publica tudo em "Estudio.utils" */
  window.Estudio.utils = {
    icone: icone,
    criar: criar,
    criarImagem: criarImagem,
    formatarPreco: formatarPreco,
    criarFiltros: criarFiltros,
    abrirDialogo: abrirDialogo,
    ligarDialogo: ligarDialogo,
    mostrarAviso: mostrarAviso,
    lerArmazenamento: lerArmazenamento,
    gravarArmazenamento: gravarArmazenamento
  };
})();
