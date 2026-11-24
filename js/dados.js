/* ==========================================================================
   dados.js  —  CONTEÚDO DO PORTFÓLIO E DA LOJA
   --------------------------------------------------------------------------
   Aqui estão as listas de fotografias, vídeos e produtos. O site cria os
   cartões automaticamente a partir destas listas: para acrescentar uma foto
   ou um produto, copie um bloco { ... } e altere os valores.

   As fotografias do portfólio são as do estúdio, em img/portfolio/ (JPEG de
   ~1200px, optimizados para a web). Para acrescentar uma, guarde-a nessa pasta
   e copie um bloco abaixo.  Os produtos da loja ainda usam fotos de exemplo.
   ========================================================================== */

(function () {
  'use strict';

  /* Função auxiliar: monta o endereço de uma foto de exemplo.
     Quando usar fotos próprias pode apagar esta função e as chamadas a ela. */
  function exemplo(codigo) {
    return 'https://images.unsplash.com/' + codigo + '?auto=format&fit=crop&w=1080&q=80';
  }

  /* ----- FOTOGRAFIAS -----
     id:        número único (não repetir)
     titulo:    texto da legenda
     categoria: usada nos filtros — fotos com a mesma categoria ficam juntas
     imagem:    caminho ou endereço da foto                                  */
  const fotografias = [
    { id: 1, titulo: 'Aniversário — 30 anos', categoria: 'Aniversários', imagem: 'img/portfolio/aniversarios-1.jpg' },
    { id: 2, titulo: 'Aniversário — Balões', categoria: 'Aniversários', imagem: 'img/portfolio/aniversarios-2.jpg' },
    { id: 3, titulo: 'Kids — Princesa dos 5 anos', categoria: 'Kids', imagem: 'img/portfolio/kids-1.jpg' },
    { id: 4, titulo: 'Kids — Confetes e balões', categoria: 'Kids', imagem: 'img/portfolio/kids-2.jpg' },
    { id: 5, titulo: 'Ensaio Casual — Fitness', categoria: 'Casuais', imagem: 'img/portfolio/casuais-1.jpg' },
    { id: 6, titulo: 'Ensaio Casual — Tradição', categoria: 'Casuais', imagem: 'img/portfolio/casuais-2.jpg' },
    { id: 7, titulo: 'Noivado — Elegância', categoria: 'Noivados', imagem: 'img/portfolio/noivados-1.jpg' },
    { id: 8, titulo: 'Noivado — Retrato do noivo', categoria: 'Noivados', imagem: 'img/portfolio/noivados-2.jpg' },
    { id: 9, titulo: 'Casamento — Pôr do sol na praia', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-1.jpg' },
    { id: 10, titulo: 'Casamento — Primeira dança', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-2.jpg' },
    { id: 11, titulo: 'Gestante — Luz suave', categoria: 'Gestantes', imagem: 'img/portfolio/gestantes-1.jpg' },
    { id: 12, titulo: 'Gestante — Em casal', categoria: 'Gestantes', imagem: 'img/portfolio/gestantes-2.jpg' },
    { id: 13, titulo: 'New Born — Sono sereno', categoria: 'New Born', imagem: 'img/portfolio/newborn-1.jpg' },
    { id: 14, titulo: 'New Born — Detalhes', categoria: 'New Born', imagem: 'img/portfolio/newborn-2.jpg' },
    { id: 15, titulo: 'Baptismo — O momento', categoria: 'Baptísmos', imagem: 'img/portfolio/baptismos-1.jpg' },
    { id: 16, titulo: 'Baptismo — A bênção', categoria: 'Baptísmos', imagem: 'img/portfolio/baptismos-2.jpg' },
    { id: 17, titulo: 'Corporativo — Executivo', categoria: 'Corporativas', imagem: 'img/portfolio/corporativas-1.jpg' },
    { id: 18, titulo: 'Corporativo — Estilo profissional', categoria: 'Corporativas', imagem: 'img/portfolio/corporativas-2.jpg' }
  ];

  /* ----- VÍDEOS -----
     Para o vídeo tocar dentro do site, preencha UM destes campos:
       youtubeId: o código que aparece no link do YouTube.
                  Em https://www.youtube.com/watch?v=dQw4w9WgXcQ  o código é dQw4w9WgXcQ
       ficheiro:  caminho de um vídeo seu (ex.: 'video/casamento.mp4')
     Se ambos estiverem vazios, o visitante vê um aviso de "vídeo indisponível".
     imagem: capa do vídeo (miniatura). */
  const videos = [
    { id: 1, titulo: 'Vídeo Corporativo',  categoria: 'Comercial',      imagem: 'img/portfolio/corporativas-1.jpg', youtubeId: '', ficheiro: '' },
    { id: 2, titulo: 'Filme de Casamento', categoria: 'Casamento',      imagem: 'img/portfolio/casamentos-2.jpg', youtubeId: '', ficheiro: '' },
    { id: 3, titulo: 'Videoclipe',         categoria: 'Entretenimento', imagem: 'img/portfolio/aniversarios-1.jpg', youtubeId: '', ficheiro: '' },
    { id: 4, titulo: 'Resumo de Evento',   categoria: 'Evento',         imagem: 'img/portfolio/baptismos-2.jpg', youtubeId: '', ficheiro: '' }
  ];

  /* ----- PRODUTOS DA LOJA -----
     id:        texto único (não repetir) — é o que o carrinho guarda
     nome:      nome do produto
     categoria: usada nos filtros da loja
     preco:     número SEM símbolo (a moeda vem de config.js). Ex.: 25000
     imagem:    caminho ou endereço da foto
     icone:     'imagem', 'moldura' ou 'tshirt' (pequeno ícone no cartão)
     destaque:  true mostra a etiqueta "Destaque" (opcional)
     Os preços abaixo são apenas exemplos.                                   */
  const produtos = [
    { id: 'p1', nome: 'Impressão Pôr do Sol',        categoria: 'Impressões',          preco: 25000,  icone: 'imagem',  imagem: exemplo('photo-1534218238612-bace67b05bf2') },
    { id: 'p2', nome: 'Impressão Colecção Retrato',  categoria: 'Impressões',          preco: 30000,  icone: 'imagem',  imagem: exemplo('photo-1544124094-8aea0374da93') },
    { id: 'p3', nome: 'Quadro Paisagem com Moldura', categoria: 'Quadros com Moldura', preco: 65000,  icone: 'moldura', imagem: exemplo('photo-1684741892149-e741a75f8f71'), destaque: true },
    { id: 'p4', nome: 'Conjunto Galeria de Parede',  categoria: 'Quadros com Moldura', preco: 125000, icone: 'moldura', imagem: exemplo('photo-1684741892149-e741a75f8f71') },
    { id: 'p5', nome: 'T-shirt do Estúdio',          categoria: 'Vestuário',           preco: 17500,  icone: 'tshirt',  imagem: exemplo('photo-1676113421666-172e5520b7a6'), destaque: true },
    { id: 'p6', nome: 'T-shirt Logótipo Fotografia', categoria: 'Vestuário',           preco: 15000,  icone: 'tshirt',  imagem: exemplo('photo-1676113421666-172e5520b7a6') }
  ];

  /* Publica as listas num objecto global "Estudio.dados" para os outros
     ficheiros as usarem. ("Estudio" é o nosso espaço de nomes comum.) */
  window.Estudio = window.Estudio || {};
  window.Estudio.dados = { fotografias: fotografias, videos: videos, produtos: produtos };
})();
