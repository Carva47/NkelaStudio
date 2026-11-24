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
  slogan: 'Capturando momentos, criando histórias',

  /* Caminho para o logótipo. Coloque o ficheiro na pasta "img" e escreva
     aqui o caminho. O logótipo actual (fundo transparente, para fundos escuros)
     está em 'img/marca/logo-fundo-escuro.png'.
     Se deixar vazio (''), o site mostra o nome do estúdio em texto. */
  logo: 'img/marca/logo-fundo-escuro.png',

  /* ----- CONTACTOS ----- */
  contacto: {
    email: 'geral@seuestudio.ao',
    telefone: '+244 900 000 000',

    /* Número de WhatsApp: só dígitos, com indicativo do país e sem "+".
       Exemplo de Angola: 244 + número → '244900000000'.
       É para este número que vão as encomendas e as mensagens do formulário. */
    whatsapp: '244900000000',

    /* Morada: cada item da lista é uma linha. */
    morada: ['Rua Exemplo, n.º 123', 'Luanda, Angola'],

    /* Como o formulário de contacto envia a mensagem:
         'whatsapp' → abre o WhatsApp com a mensagem já escrita
         'email'    → abre o programa de email do visitante                 */
    metodoEnvio: 'whatsapp'
  },

  /* ----- REDES SOCIAIS -----
     Cole o endereço completo (https://...). Se deixar vazio (''),
     o botão dessa rede some do site. */
  redes: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/'
  },

  /* ----- MOEDA (usada nos preços da loja) ----- */
  moeda: {
    simbolo: 'Kz',      // Aparece depois do valor: "25 000 Kz"
    local: 'pt-PT'      // Formato dos números (separador de milhares)
  }
};
