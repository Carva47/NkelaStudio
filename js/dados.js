/* ==========================================================================
   dados.js  —  CONTEÚDO DO PORTFÓLIO E DA LOJA
   --------------------------------------------------------------------------
   Aqui estão as listas de fotografias, vídeos e produtos. O site cria os
   cartões automaticamente a partir destas listas: para acrescentar uma foto
   ou um produto, copie um bloco { ... } e altere os valores.

   ATENÇÃO: as imagens abaixo são fotografias de exemplo (banco de imagens
   gratuito). Substitua-as pelas do estúdio: coloque os ficheiros na pasta
   "img" e escreva o caminho, por exemplo:  imagem: 'img/casamento-01.jpg'
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
    { id: 1, titulo: 'Sessão de Retrato',     categoria: 'Retrato',   imagem: exemplo('photo-1544124094-8aea0374da93') },
    { id: 2, titulo: 'Paisagem ao Entardecer', categoria: 'Paisagem',  imagem: exemplo('photo-1534218238612-bace67b05bf2') },
    { id: 3, titulo: 'Cerimónia de Casamento', categoria: 'Casamento', imagem: exemplo('photo-1533091090875-1ff4acc497dd') },
    { id: 4, titulo: 'Cobertura de Evento',    categoria: 'Evento',    imagem: exemplo('photo-1614607653708-0777e6d003b8') },
    { id: 5, titulo: 'Retratos Profissionais', categoria: 'Retrato',   imagem: exemplo('photo-1759974990343-c960e5831853') },
    { id: 6, titulo: 'Fotografia Urbana',      categoria: 'Paisagem',  imagem: exemplo('photo-1534218238612-bace67b05bf2') }
  ];

  /* ----- VÍDEOS -----
     Para o vídeo tocar dentro do site, preencha UM destes campos:
       youtubeId: o código que aparece no link do YouTube.
                  Em https://www.youtube.com/watch?v=dQw4w9WgXcQ  o código é dQw4w9WgXcQ
       ficheiro:  caminho de um vídeo seu (ex.: 'video/casamento.mp4')
     Se ambos estiverem vazios, o visitante vê um aviso de "vídeo indisponível".
     imagem: capa do vídeo (miniatura). */
  const videos = [
    { id: 1, titulo: 'Vídeo Corporativo',  categoria: 'Comercial',      imagem: exemplo('photo-1663862566495-a10edd749ba3'), youtubeId: '', ficheiro: '' },
    { id: 2, titulo: 'Filme de Casamento', categoria: 'Casamento',      imagem: exemplo('photo-1533091090875-1ff4acc497dd'), youtubeId: '', ficheiro: '' },
    { id: 3, titulo: 'Videoclipe',         categoria: 'Entretenimento', imagem: exemplo('photo-1663862566495-a10edd749ba3'), youtubeId: '', ficheiro: '' },
    { id: 4, titulo: 'Resumo de Evento',   categoria: 'Evento',         imagem: exemplo('photo-1614607653708-0777e6d003b8'), youtubeId: '', ficheiro: '' }
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
