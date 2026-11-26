/* ==========================================================================
   config.js  —  DADOS DO ESTÚDIO
   --------------------------------------------------------------------------
   Aqui ficam as informações que mudam de estúdio para estúdio: nome,
   contactos, redes sociais, moeda, etc. Edite os valores entre aspas.
   Não precisa de mexer no HTML para actualizar estes dados.

   Como funciona: este ficheiro cria uma variável global chamada
   "ESTUDIO_CONFIG". O ficheiro main.js lê-a e preenche o site.
   ========================================================================== */

window.ESTUDIO_CONFIG = {

  /* Nome do estúdio (aparece no menu, hero, "Sobre" e rodapé) */
  nome: 'Nkela Studios',

  /* Frase curta por baixo do logótipo, na primeira secção */
  slogan: 'Galeria de histórias, memórias e artes visuais',

  /* Caminho para o logótipo. Coloque o ficheiro na pasta "img" e escreva
     aqui o caminho. O logótipo actual (fundo transparente, para fundos escuros)
     está em 'img/marca/logo-fundo-escuro.png'.
     Se deixar vazio (''), o site mostra o nome do estúdio em texto. */
  logo: 'img/marca/logo-fundo-escuro.png',

  /* ----- CONTACTOS ----- */
  contacto: {
    /* Email: deixe vazio ('') enquanto o estúdio não tiver um — não aparece no site. */
    email: '',
    telefone: '+244 911 844 888',

    /* Número de WhatsApp: só dígitos, com indicativo do país e sem "+".
       É para este número que vão as encomendas e as mensagens do formulário. */
    whatsapp: '244911844888',

    /* Mensagem que já vem escrita quando o visitante clica num botão de WhatsApp
       (botão flutuante e cartão de contacto). O visitante pode editá-la antes de enviar. */
    mensagemInicial: 'Olá, Nkela Studios! Vi o vosso site e gostaria de saber mais sobre os vossos serviços de fotografia e vídeo.',

    /* Morada: cada item da lista é uma linha. */
    morada: ['Ilha de Luanda, Avenida Mortala Mohamed', 'Junto à Unitel']
  },

  /* ----- REDES SOCIAIS -----
     Cole o endereço completo (https://...). Se deixar vazio (''),
     o ícone dessa rede some do site. */
  redes: {
    instagram: 'https://www.instagram.com/nkelastudios/',
    facebook: 'https://web.facebook.com/nkelastudios',
    tiktok: 'https://www.tiktok.com/@nkelastudios',
    youtube: ''
  },

  /* Texto mostrado ao lado de cada ícone na secção Contacto */
  redesTexto: {
    instagram: '@nkelastudios',
    facebook: 'Nkela Studios',
    tiktok: '@nkelastudios'
  },

  /* ----- MOEDA (usada nos preços da loja) ----- */
  moeda: {
    simbolo: 'Kz',      // Aparece depois do valor: "25 000 Kz"
    local: 'pt-PT'      // Formato dos números (separador de milhares)
  }
};
