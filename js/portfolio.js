/* ==========================================================================
   portfolio.js  —  PORTFÓLIO
   --------------------------------------------------------------------------
   Responsável por:
     1. Abas "Fotografia | Vídeo" (com navegação por setas do teclado)
     2. Cartões das categorias de fotografia (um cartão por categoria)
     3. Galeria: ao clicar num cartão abre-se uma grelha com todas as fotos da categoria
     4. Lightbox: ampliar uma foto da galeria, navegar com setas/teclado/deslize no telemóvel
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
  const galeria = document.getElementById('galeria');
  const galeriaTitulo = document.getElementById('galeria-titulo');
  const galeriaContagem = document.getElementById('galeria-contagem');
  const galeriaGrade = document.getElementById('galeria-grade');

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
  let fotosVisiveis = [];                  // Fotos da categoria aberta na galeria
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
     2. CARTÕES DAS CATEGORIAS
     ====================================================================== */

  /* Agrupa as fotos por categoria, mantendo a ordem em que aparecem em dados.js.
     Resultado: [ { nome: 'Casamentos', fotos: [...] }, { nome: 'Noivados', fotos: [...] }, ... ] */
  const categorias = [];
  fotografias.forEach(function (foto) {
    let grupo = categorias.find(function (c) { return c.nome === foto.categoria; });
    if (!grupo) {
      grupo = { nome: foto.categoria, fotos: [] };
      categorias.push(grupo);
    }
    grupo.fotos.push(foto);
  });

  /** Texto "N fotografia(s)" com o plural certo */
  function textoContagem(total) {
    return total + (total === 1 ? ' fotografia' : ' fotografias');
  }

  categorias.forEach(function (categoria) {
    // Cada cartão é um <button>: pode ser usado com rato, toque e teclado.
    // A capa do cartão é a primeira foto da categoria.
    const cartao = U.criar('button', {
      class: 'cartao-obra cartao-obra--categoria',
      type: 'button',
      'aria-label': 'Abrir a galeria ' + categoria.nome + ' (' + textoContagem(categoria.fotos.length) + ')'
    }, [
      U.criar('div', { class: 'cartao-obra__media' }, [
        U.criarImagem(categoria.fotos[0].imagem, categoria.nome),
        U.criar('div', { class: 'cartao-obra__legenda' }, [
          U.criar('p', { class: 'cartao-obra__categoria', texto: textoContagem(categoria.fotos.length) }),
          U.criar('h3', { class: 'cartao-obra__titulo', texto: categoria.nome })
        ])
      ])
    ]);
    cartao.addEventListener('click', function () { abrirGaleria(categoria); });
    gradeFotos.appendChild(cartao);
  });


  /* ======================================================================
     3. GALERIA DA CATEGORIA
     ====================================================================== */

  /** Abre a janela com as miniaturas de todas as fotos da categoria */
  function abrirGaleria(categoria) {
    fotosVisiveis = categoria.fotos;
    galeriaTitulo.textContent = categoria.nome;
    galeriaContagem.textContent = textoContagem(categoria.fotos.length);
    galeriaGrade.replaceChildren();

    categoria.fotos.forEach(function (foto, posicao) {
      const miniatura = U.criar('button', {
        class: 'galeria__foto',
        type: 'button',
        'aria-label': 'Ampliar: ' + foto.titulo
      }, [ U.criarImagem(foto.imagem, foto.titulo) ]);
      miniatura.addEventListener('click', function () { abrirLightbox(posicao); });
      galeriaGrade.appendChild(miniatura);
    });

    galeria.scrollTop = 0;
    U.abrirDialogo(galeria);
  }

  U.ligarDialogo(galeria);


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

  /* O lightbox abre POR CIMA da galeria. Quando fecha, a galeria continua aberta,
     por isso voltamos a bloquear a rolagem da página (o "close" tinha-a libertado). */
  U.ligarDialogo(lightbox, function () {
    if (galeria.open) document.documentElement.style.overflow = 'hidden';
  });

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
