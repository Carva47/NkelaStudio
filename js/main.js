/* ==========================================================================
   main.js  —  COMPORTAMENTO GERAL DA PÁGINA
   --------------------------------------------------------------------------
   Responsável por:
     1. Inserir os ícones nos locais marcados com data-icone
     2. Preencher nome, contactos e redes sociais a partir de config.js
     3. Mostrar o logótipo (imagem) ou o nome em texto
     4. Menu: abrir/fechar em telemóvel e sombra ao rolar
     5. Destacar no menu a secção que está a ser vista (scrollspy)
     6. Animação de aparecimento dos elementos ao rolar
   ========================================================================== */

(function () {
  'use strict';

  const U = Estudio.utils;
  const config = window.ESTUDIO_CONFIG;


  /* ======================================================================
     1. ÍCONES
     Qualquer elemento como <span data-icone="camera" data-tamanho="24">
     recebe o desenho do ícone lá dentro.
     ====================================================================== */
  document.querySelectorAll('[data-icone]').forEach(function (el) {
    const tamanho = Number(el.getAttribute('data-tamanho')) || 20;
    el.appendChild(U.icone(el.getAttribute('data-icone'), tamanho));
    // (O alinhamento do ícone com o texto ao lado é feito no CSS: "[data-icone]")
  });


  /* ======================================================================
     2. DADOS DE config.js
     ====================================================================== */

  /** Vai buscar um valor ao config usando um caminho, ex.: 'contacto.email' */
  function valorDoConfig(caminho) {
    return caminho.split('.').reduce(function (objecto, chave) {
      return objecto && objecto[chave] !== undefined ? objecto[chave] : undefined;
    }, config);
  }

  /* Elementos com data-config="..." recebem o texto correspondente */
  document.querySelectorAll('[data-config]').forEach(function (el) {
    const valor = valorDoConfig(el.getAttribute('data-config'));
    if (Array.isArray(valor)) {
      // Lista (ex.: morada): cada item vira uma linha
      el.replaceChildren();
      valor.forEach(function (linha, posicao) {
        if (posicao > 0) el.appendChild(document.createElement('br'));
        el.appendChild(document.createTextNode(linha));
      });
    } else if (valor !== undefined) {
      el.textContent = valor;
    }
  });

  /* Elementos com data-link="..." recebem o endereço (href) certo */
  const construtoresDeLink = {
    email:     function () { return 'mailto:' + config.contacto.email; },
    // Em "tel:" só podem ficar dígitos e o "+"
    telefone:  function () { return 'tel:' + String(config.contacto.telefone).replace(/[^\d+]/g, ''); },
    whatsapp:  function () { return 'https://wa.me/' + config.contacto.whatsapp; },
    instagram: function () { return config.redes.instagram; },
    facebook:  function () { return config.redes.facebook; },
    youtube:   function () { return config.redes.youtube; }
  };

  document.querySelectorAll('[data-link]').forEach(function (el) {
    const construir = construtoresDeLink[el.getAttribute('data-link')];
    const endereco = construir ? construir() : '';
    // Rede social sem endereço em config.js: o botão desaparece
    if (!endereco) el.hidden = true;
    else el.setAttribute('href', endereco);
  });

  /* Título do separador do navegador e ano do rodapé */
  document.title = config.nome + ' | Fotografia e Vídeo';
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });


  /* ======================================================================
     3. LOGÓTIPO
     Cada ".marca" tem uma <img> (escondida) e o nome em texto.
     Se config.logo tiver um caminho: mostra a imagem e esconde o texto.
     ====================================================================== */
  if (config.logo) {
    document.querySelectorAll('.marca').forEach(function (marca) {
      const img = marca.querySelector('.marca__img');
      const texto = marca.querySelector('.marca__texto');
      if (!img) return;
      img.src = config.logo;
      img.alt = config.nome;
      img.hidden = false;
      if (texto) texto.hidden = true;
      // Se a imagem não carregar (caminho errado), volta ao nome em texto
      img.addEventListener('error', function () {
        img.hidden = true;
        if (texto) texto.hidden = false;
      });
    });
  }


  /* ======================================================================
     4. MENU
     ====================================================================== */
  const nav = document.getElementById('nav');
  const botaoMenu = document.getElementById('btn-menu');
  const menu = document.getElementById('menu-principal');

  function abrirMenu(abrir) {
    menu.classList.toggle('is-aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  }

  botaoMenu.addEventListener('click', function () {
    abrirMenu(!menu.classList.contains('is-aberto'));
  });

  /* Clicar num link do menu fecha-o (em telemóvel) */
  menu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () { abrirMenu(false); });
  });

  /* Tecla Esc fecha o menu */
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('is-aberto')) {
      abrirMenu(false);
      botaoMenu.focus();
    }
  });

  /* Clicar fora do menu fecha-o */
  document.addEventListener('click', function (evento) {
    if (menu.classList.contains('is-aberto') && !nav.contains(evento.target)) abrirMenu(false);
  });

  /* Sombra por baixo do menu quando a página já foi rolada */
  function aoRolar() {
    nav.classList.toggle('nav--rolagem', window.scrollY > 10);
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();


  /* ======================================================================
     5. SCROLLSPY: destaca no menu a secção visível
     O IntersectionObserver avisa quando uma secção cruza a "linha de leitura"
     (uma faixa a meio do ecrã definida por rootMargin).
     ====================================================================== */
  const ligacoes = Array.from(document.querySelectorAll('.nav__link[data-secao]'));
  const seccoes = ligacoes
    .map(function (ligacao) { return document.getElementById(ligacao.getAttribute('data-secao')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observadorSeccoes = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        ligacoes.forEach(function (ligacao) {
          const activa = ligacao.getAttribute('data-secao') === entrada.target.id;
          if (activa) ligacao.setAttribute('aria-current', 'true');
          else ligacao.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' }); // Faixa fina a meio do ecrã

    seccoes.forEach(function (seccao) { observadorSeccoes.observe(seccao); });


    /* ====================================================================
       6. ANIMAÇÃO DE APARECIMENTO
       Elementos com a classe "revelar" ganham "visivel" ao entrar no ecrã
       (ver base.css). Depois de aparecer, deixamos de os observar.
       ==================================================================== */
    const observadorRevelar = new IntersectionObserver(function (entradas, observador) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.revelar').forEach(function (el) { observadorRevelar.observe(el); });

  } else {
    /* Navegador sem IntersectionObserver: mostra tudo de imediato */
    document.querySelectorAll('.revelar').forEach(function (el) { el.classList.add('visivel'); });
  }
})();
