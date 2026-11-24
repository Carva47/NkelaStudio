/* ==========================================================================
   portfolio.js  —  PORTFÓLIO
   --------------------------------------------------------------------------
   Responsável por:
     1. Abas "Fotografia | Vídeo" (com navegação por setas do teclado)
     2. Filtros por categoria nas fotografias
     3. Criar os cartões das fotos e dos vídeos a partir de dados.js
     4. Lightbox: ampliar a foto, navegar com setas/teclado/deslize no telemóvel
     5. Janela de vídeo (YouTube ou ficheiro próprio)
   ========================================================================== */

(function () {
  'use strict';

  const U = Estudio.utils;
  const fotografias = Estudio.dados.fotografias;
  const videos = Estudio.dados.videos;

  /* ----- Elementos da página que vamos usar ----- */
  const abas = Array.from(document.querySelectorAll('[role="tab"][data-aba]'));
  const gradeFotos = document.getElementById('grade-fotos');
  const gradeVideos = document.getElementById('grade-videos');
  const filtrosFotos = document.getElementById('filtros-fotos');

  const lightbox = document.getElementById('lightbox');
  const lbImagem = document.getElementById('lightbox-imagem');
  const lbTitulo = document.getElementById('lightbox-titulo');
  const lbCategoria = document.getElementById('lightbox-categoria');
  const lbContador = document.getElementById('lightbox-contador');

  const modalVideo = document.getElementById('modal-video');
  const modalVideoCorpo = document.getElementById('modal-video-corpo');

  /* Se a página não tiver portfólio, não fazemos nada (evita erros) */
  if (!gradeFotos || !gradeVideos) return;

  /* ----- Estado: o que está a ser mostrado neste momento ----- */
  let fotosVisiveis = fotografias.slice(); // Fotos que passam no filtro actual
  let indiceAtual = 0;                     // Posição da foto aberta no lightbox


  /* ======================================================================
     1. ABAS
     ====================================================================== */

  /** Mostra o painel da aba escolhida e esconde o outro */
  function ativarAba(abaAtiva) {
    abas.forEach(function (aba) {
      const ativa = aba === abaAtiva;
      aba.setAttribute('aria-selected', ativa ? 'true' : 'false');
      aba.tabIndex = ativa ? 0 : -1; // Só a aba activa recebe foco com Tab
      const painel = document.getElementById(aba.getAttribute('aria-controls'));
      if (painel) painel.hidden = !ativa;
    });
  }

  abas.forEach(function (aba, posicao) {
    aba.addEventListener('click', function () { ativarAba(aba); });

    // Setas esquerda/direita (e Home/End) mudam de aba, como em aplicações nativas
    aba.addEventListener('keydown', function (evento) {
      let destino = null;
      if (evento.key === 'ArrowRight') destino = abas[(posicao + 1) % abas.length];
      if (evento.key === 'ArrowLeft')  destino = abas[(posicao - 1 + abas.length) % abas.length];
      if (evento.key === 'Home')       destino = abas[0];
      if (evento.key === 'End')        destino = abas[abas.length - 1];
      if (destino) {
        evento.preventDefault();
        ativarAba(destino);
        destino.focus();
      }
    });
  });


  /* ======================================================================
     2 e 3. FOTOGRAFIAS: FILTROS E CARTÕES
     ====================================================================== */

  /** Desenha os cartões das fotos que passam no filtro */
  function mostrarFotos(categoria) {
    fotosVisiveis = categoria === 'Todos'
      ? fotografias.slice()
      : fotografias.filter(function (foto) { return foto.categoria === categoria; });

    gradeFotos.replaceChildren(); // Limpa o que lá estava

    if (fotosVisiveis.length === 0) {
      gradeFotos.appendChild(U.criar('p', { class: 'vazio', texto: 'Ainda não há fotografias nesta categoria.' }));
      return;
    }

    fotosVisiveis.forEach(function (foto, posicao) {
      // Cada cartão é um <button>: pode ser usado com rato, toque e teclado
      const cartao = U.criar('button', {
        class: 'cartao-obra',
        type: 'button',
        'aria-label': 'Ampliar: ' + foto.titulo + ' (' + foto.categoria + ')'
      }, [
        U.criar('div', { class: 'cartao-obra__media' }, [
          U.criarImagem(foto.imagem, foto.titulo),
          U.criar('div', { class: 'cartao-obra__legenda' }, [
            U.criar('p', { class: 'cartao-obra__categoria', texto: foto.categoria }),
            U.criar('h3', { class: 'cartao-obra__titulo', texto: foto.titulo })
          ])
        ])
      ]);
      cartao.addEventListener('click', function () { abrirLightbox(posicao); });
      gradeFotos.appendChild(cartao);
    });
  }

  /* Cria os botões de filtro com as categorias que existem em dados.js */
  const categoriasFotos = [];
  fotografias.forEach(function (foto) {
    if (categoriasFotos.indexOf(foto.categoria) === -1) categoriasFotos.push(foto.categoria);
  });
  U.criarFiltros(filtrosFotos, categoriasFotos, mostrarFotos);
  mostrarFotos('Todos');


  /* ======================================================================
     4. LIGHTBOX (foto ampliada)
     ====================================================================== */

  /** Mostra no lightbox a foto na posição indicada (volta ao início/fim se passar) */
  function mostrarNoLightbox(posicao) {
    const total = fotosVisiveis.length;
    indiceAtual = (posicao + total) % total; // O "%" faz a volta ao chegar ao fim
    const foto = fotosVisiveis[indiceAtual];

    lbImagem.src = foto.imagem;
    lbImagem.alt = foto.titulo;
    lbTitulo.textContent = foto.titulo;
    lbCategoria.textContent = foto.categoria;
    lbContador.textContent = (indiceAtual + 1) + ' / ' + total;
  }

  function abrirLightbox(posicao) {
    mostrarNoLightbox(posicao);
    U.abrirDialogo(lightbox);
  }

  U.ligarDialogo(lightbox);

  document.getElementById('lightbox-anterior').addEventListener('click', function () {
    mostrarNoLightbox(indiceAtual - 1);
  });
  document.getElementById('lightbox-seguinte').addEventListener('click', function () {
    mostrarNoLightbox(indiceAtual + 1);
  });

  /* Teclado: setas esquerda/direita mudam de foto (Esc fecha, nativo do <dialog>) */
  lightbox.addEventListener('keydown', function (evento) {
    if (evento.key === 'ArrowLeft')  mostrarNoLightbox(indiceAtual - 1);
    if (evento.key === 'ArrowRight') mostrarNoLightbox(indiceAtual + 1);
  });

  /* Telemóvel: deslizar o dedo para o lado muda de foto */
  let toqueInicioX = null;
  lightbox.addEventListener('touchstart', function (evento) {
    toqueInicioX = evento.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (evento) {
    if (toqueInicioX === null) return;
    const diferenca = evento.changedTouches[0].clientX - toqueInicioX;
    toqueInicioX = null;
    if (Math.abs(diferenca) < 50) return; // Movimento pequeno demais: ignora
    mostrarNoLightbox(indiceAtual + (diferenca < 0 ? 1 : -1));
  }, { passive: true });


  /* ======================================================================
     3 e 5. VÍDEOS: CARTÕES E JANELA DE REPRODUÇÃO
     ====================================================================== */

  videos.forEach(function (video) {
    const cartao = U.criar('button', {
      class: 'cartao-obra cartao-obra--video',
      type: 'button',
      'aria-label': 'Reproduzir vídeo: ' + video.titulo
    }, [
      U.criar('div', { class: 'cartao-obra__media' }, [
        U.criarImagem(video.imagem, video.titulo),
        U.criar('div', { class: 'cartao-obra__play' }, [
          U.criar('span', {}, [U.icone('play', 24)])
        ]),
        U.criar('div', { class: 'cartao-obra__legenda' }, [
          U.criar('p', { class: 'cartao-obra__categoria', texto: video.categoria }),
          U.criar('h3', { class: 'cartao-obra__titulo', texto: video.titulo })
        ])
      ])
    ]);
    cartao.addEventListener('click', function () { abrirVideo(video); });
    gradeVideos.appendChild(cartao);
  });

  /** Abre a janela e coloca lá o reprodutor adequado */
  function abrirVideo(video) {
    modalVideoCorpo.replaceChildren();

    if (video.youtubeId) {
      // "youtube-nocookie" é a versão do YouTube que respeita mais a privacidade
      modalVideoCorpo.appendChild(U.criar('iframe', {
        src: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video.youtubeId) + '?autoplay=1&rel=0',
        title: video.titulo,
        allow: 'autoplay; encrypted-media; picture-in-picture; fullscreen',
        allowfullscreen: true
      }));
    } else if (video.ficheiro) {
      modalVideoCorpo.appendChild(U.criar('video', {
        src: video.ficheiro,
        controls: true,
        autoplay: true,
        playsinline: true
      }));
    } else {
      // Ainda não foi configurado um vídeo para este cartão
      modalVideoCorpo.appendChild(U.criar('p', {
        texto: 'Este vídeo ainda não está disponível. Em js/dados.js, preencha "youtubeId" ou "ficheiro" para o activar.'
      }));
    }

    U.abrirDialogo(modalVideo);
  }

  /* Ao fechar, esvaziamos o corpo: é assim que o vídeo PÁRA de tocar */
  U.ligarDialogo(modalVideo, function () {
    modalVideoCorpo.replaceChildren();
  });
})();
