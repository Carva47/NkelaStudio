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
     categoria: usada nos filtros — fotos com a mesma categoria ficam juntas.
                A ordem das categorias nos botões segue a ordem desta lista.
     imagem:    caminho ou endereço da foto                                  */
  const fotografias = [
    { id: 1, titulo: 'Primeira dança', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-2.jpg' },
    { id: 2, titulo: 'Pôr do sol na praia', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-1.jpg' },
    { id: 19, titulo: 'Os noivos e o pajem', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-3.jpg' },
    { id: 20, titulo: 'O vestido', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-4.jpg' },
    { id: 21, titulo: 'Preto e branco', categoria: 'Casamentos', imagem: 'img/portfolio/casamentos-5.jpg' },
    { id: 3, titulo: 'Elegância', categoria: 'Noivados', imagem: 'img/portfolio/noivados-1.jpg' },
    { id: 4, titulo: 'Retrato do noivo', categoria: 'Noivados', imagem: 'img/portfolio/noivados-2.jpg' },
    { id: 5, titulo: '30 anos', categoria: 'Aniversário Adulto', imagem: 'img/portfolio/aniversarios-1.jpg' },
    { id: 6, titulo: 'Balões', categoria: 'Aniversário Adulto', imagem: 'img/portfolio/aniversarios-2.jpg' },
    { id: 7, titulo: 'Princesa dos 5 anos', categoria: 'Aniversário Kids', imagem: 'img/portfolio/kids-1.jpg' },
    { id: 8, titulo: 'Confetes e balões', categoria: 'Aniversário Kids', imagem: 'img/portfolio/kids-2.jpg' },
    { id: 9, titulo: 'Luz suave', categoria: 'Gestantes', imagem: 'img/portfolio/gestantes-1.jpg' },
    { id: 10, titulo: 'Em casal', categoria: 'Gestantes', imagem: 'img/portfolio/gestantes-2.jpg' },
    { id: 11, titulo: 'Sono sereno', categoria: 'New Born', imagem: 'img/portfolio/newborn-1.jpg' },
    { id: 12, titulo: 'Detalhes', categoria: 'New Born', imagem: 'img/portfolio/newborn-2.jpg' },
    { id: 13, titulo: 'O momento', categoria: 'Baptísmos', imagem: 'img/portfolio/baptismos-1.jpg' },
    { id: 14, titulo: 'A bênção', categoria: 'Baptísmos', imagem: 'img/portfolio/baptismos-2.jpg' },
    { id: 15, titulo: 'Fitness', categoria: 'Casuais', imagem: 'img/portfolio/casuais-1.jpg' },
    { id: 16, titulo: 'Tradição', categoria: 'Casuais', imagem: 'img/portfolio/casuais-2.jpg' },
    { id: 17, titulo: 'Executivo', categoria: 'Corporativas', imagem: 'img/portfolio/corporativas-1.jpg' },
    { id: 18, titulo: 'Estilo profissional', categoria: 'Corporativas', imagem: 'img/portfolio/corporativas-2.jpg' }
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

    /* ----- ANIVERSÁRIO KIDS e ANIVERSÁRIO ADULTO (cartazes em img/produtos/) -----
       Cartazes com vários tamanhos: o preço aqui é o do tamanho mais pequeno.
       Happy Adultos: 1.495 Kz por foto x 50 fotos (mínimo) = 74.750 Kz */
    { id: 'aniv-smile', nome: 'Pacote Smile · Crianças (a partir de 5 fotos)', categoria: 'Aniversário Kids', preco: 8495, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-smile.jpg' },
    { id: 'aniv-smile-2', nome: 'Pacote Smile 2 · Crianças (a partir de 5 fotos)', categoria: 'Aniversário Kids', preco: 12345, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-smile-2.jpg' },
    { id: 'aniv-happy-crianca', nome: 'Pacote Happy · Crianças (a partir de 50 fotos)', categoria: 'Aniversário Kids', preco: 70500, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-happy-crianca.jpg' },
    { id: 'aniv-happy-adulto', nome: 'Pacote Happy · Adultos (50 fotos mín.)', categoria: 'Aniversário Adulto', preco: 74750, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-happy-adulto.jpg' },
    { id: 'aniv-pre-niver-baloes', nome: 'Pré-niver com balões · Adultos (a partir de 5 fotos)', categoria: 'Aniversário Adulto', preco: 13975, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-pre-niver-baloes.jpg' },
    { id: 'aniv-pre-niver-cenario', nome: 'Pré-niver com cenário artificial (a partir de 5 fotos)', categoria: 'Aniversário Adulto', preco: 8625, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-pre-niver-cenario.jpg' },
    { id: 'aniv-niver-em-casa', nome: 'Sessão em casa (a partir de 10 fotos)', categoria: 'Aniversário Adulto', preco: 16300, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/aniv-niver-em-casa.jpg' },

    /* ----- GESTANTES & NEW BORN (cartazes em img/produtos/) -----
       Preço = o do tamanho mais pequeno do cartaz. */
    { id: 'gest-conexao', nome: 'Pacote Conexão · Mãe e Bebê (a partir de 5 fotos)', categoria: 'Gestantes & New Born', preco: 9650, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/gest-conexao.jpg' },
    { id: 'gest-bencao', nome: 'Pacote Bênção · Mãe e Pai (a partir de 5 fotos)', categoria: 'Gestantes & New Born', preco: 13125, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/gest-bencao.jpg' },
    { id: 'gest-linha-do-tempo', nome: 'Pacote Linha do Tempo · Da gestação ao 1º aniversário', categoria: 'Gestantes & New Born', preco: 89450, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/gest-linha-do-tempo.jpg' },

    /* ----- QUADROS (cartazes em img/produtos/) -----
       Tabela completa: A5 4.900 | A4 5.800 | A3 11.600 | A2 16.800 | 50x75cm 27.500 | A1 35.000 | A0 113.300 | 2A0 131.600 Kz */
    { id: 'quadro-tabela', nome: 'Quadros · tabela de tamanhos (a partir de A5)', categoria: 'Quadros', preco: 4900, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/quadro-tabela.jpg' },
    { id: 'quadro-a5', nome: 'Quadro A5', categoria: 'Quadros', preco: 4900, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/quadro-a5.jpg' },
    { id: 'quadro-a4', nome: 'Quadro A4', categoria: 'Quadros', preco: 5800, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/quadro-a4.jpg' },
    { id: 'quadro-a3', nome: 'Quadro A3', categoria: 'Quadros', preco: 11600, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/quadro-a3.jpg' },

    /* ----- SESSÃO SIMPLES (corporativas, casual, fitness, casal...) -----
       Tabela: 5 fotos 8.150 | 10 fotos 16.300 | 15 fotos 24.450 | 20 fotos 32.600 Kz */
    { id: 'sessao-simples', nome: 'Sessão Simples (a partir de 5 fotos)', categoria: 'Sessão Simples', preco: 8150, icone: 'imagem', ajuste: 'contida', imagem: 'img/produtos/sessao-simples.jpg' }
  ];

  /* Publica as listas num objecto global "Estudio.dados" para os outros
     ficheiros as usarem. ("Estudio" é o nosso espaço de nomes comum.) */
  window.Estudio = window.Estudio || {};
  window.Estudio.dados = { fotografias: fotografias, videos: videos, produtos: produtos };
})();
