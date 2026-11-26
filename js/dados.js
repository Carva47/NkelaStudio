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
    /* ----- Pacotes de CASAMENTOS (imagens = cartazes dos pacotes, em img/produtos/) ----- */
    { id: 'cas-bronze',  nome: 'Pacote Bronze',  categoria: 'Casamentos', preco: 329400, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/pacote-bronze.jpg' },
    { id: 'cas-prata',   nome: 'Pacote Prata',   categoria: 'Casamentos', preco: 393450, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/pacote-prata.jpg' },
    { id: 'cas-ouro',    nome: 'Pacote Ouro',    categoria: 'Casamentos', preco: 484950, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/pacote-ouro.jpg' },
    { id: 'cas-diamond', nome: 'Pacote Diamond', categoria: 'Casamentos', preco: 650900, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/pacote-diamond.jpg' },

    /* ----- Pacotes de APRESENTAÇÃO & NOIVADOS (cartazes em img/produtos/) -----
       Modelo Fast: 1.350 Kz por foto x 150 fotos (mínimo) = 202.500 Kz */
    { id: 'apres-easy', nome: 'Easy (Fotos digitais)', categoria: 'Apresentação & Noivados', preco: 69750, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-easy.jpg' },
    { id: 'apres-pack-1', nome: 'Pack 1 · Álbum 3D 50 fotos', categoria: 'Apresentação & Noivados', preco: 84750, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-pack-1.jpg' },
    { id: 'apres-pack-2', nome: 'Pack 2 · Álbum 3D 80 fotos', categoria: 'Apresentação & Noivados', preco: 135600, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-pack-2.jpg' },
    { id: 'apres-pack-3', nome: 'Pack 3 · Álbum 3D 100 fotos', categoria: 'Apresentação & Noivados', preco: 169500, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-pack-3.jpg' },
    { id: 'apres-pack-4', nome: 'Pack 4 · Álbum 3D 150 fotos', categoria: 'Apresentação & Noivados', preco: 254250, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-pack-4.jpg' },
    { id: 'apres-pack-5', nome: 'Pack 5 · Álbum 3D 200 fotos', categoria: 'Apresentação & Noivados', preco: 339000, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-pack-5.jpg' },
    { id: 'apres-flex', nome: 'Pacote Flex · Álbum digital', categoria: 'Apresentação & Noivados', preco: 274500, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-flex.jpg' },
    { id: 'apres-fast', nome: 'Modelo Fast · 150 fotos (mín.)', categoria: 'Apresentação & Noivados', preco: 202500, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/apres-fast.jpg' },

    /* ----- ANIVERSÁRIOS & CRIANÇAS (cartazes em img/produtos/) -----
       Cartazes com vários tamanhos: o preço aqui é o do tamanho mais pequeno.
       Happy Adultos: 1.495 Kz por foto x 50 fotos (mínimo) = 74.750 Kz */
    { id: 'aniv-smile', nome: 'Pacote Smile · Crianças (a partir de 5 fotos)', categoria: 'Aniversários & Crianças', preco: 8495, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-smile.jpg' },
    { id: 'aniv-smile-2', nome: 'Pacote Smile 2 · Crianças (a partir de 5 fotos)', categoria: 'Aniversários & Crianças', preco: 12345, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-smile-2.jpg' },
    { id: 'aniv-happy-crianca', nome: 'Pacote Happy · Crianças (a partir de 50 fotos)', categoria: 'Aniversários & Crianças', preco: 70500, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-happy-crianca.jpg' },
    { id: 'aniv-happy-adulto', nome: 'Pacote Happy · Adultos (50 fotos mín.)', categoria: 'Aniversários & Crianças', preco: 74750, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-happy-adulto.jpg' },
    { id: 'aniv-pre-niver-baloes', nome: 'Pré-niver com balões · Adultos (a partir de 5 fotos)', categoria: 'Aniversários & Crianças', preco: 13975, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-pre-niver-baloes.jpg' },
    { id: 'aniv-pre-niver-cenario', nome: 'Pré-niver com cenário artificial (a partir de 5 fotos)', categoria: 'Aniversários & Crianças', preco: 8625, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-pre-niver-cenario.jpg' },
    { id: 'aniv-niver-em-casa', nome: 'Sessão em casa (a partir de 10 fotos)', categoria: 'Aniversários & Crianças', preco: 16300, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-niver-em-casa.jpg' }
  ];

  /* Publica as listas num objecto global "Estudio.dados" para os outros
     ficheiros as usarem. ("Estudio" é o nosso espaço de nomes comum.) */
  window.Estudio = window.Estudio || {};
  window.Estudio.dados = { fotografias: fotografias, videos: videos, produtos: produtos };
})();
