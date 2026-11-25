/* ==========================================================================
   contacto.js  —  FORMULÁRIO DE CONTACTO
   --------------------------------------------------------------------------
   Responsável por:
     1. Validar os campos (nome e mensagem)
     2. Mostrar mensagens de erro junto de cada campo
     3. Enviar: como o site não tem servidor, a mensagem é entregue abrindo
        o WhatsApp ou o programa de email do visitante, já com o texto escrito.
        O método escolhe-se em js/config.js (contacto.metodoEnvio).
   ========================================================================== */

(function () {
  'use strict';

  const config = window.ESTUDIO_CONFIG;
  const formulario = document.getElementById('formulario-contacto');
  const estado = document.getElementById('estado-formulario');

  if (!formulario) return;

  /* Regras de validação: uma função por campo.
     Cada função devolve o texto do erro, ou '' se o campo estiver correcto. */
  const regras = {
    nome: function (valor) {
      if (valor.length < 2) return 'Escreva o seu nome.';
      return '';
    },
    mensagem: function (valor) {
      if (valor.length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
      return '';
    }
  };

  /** Valida um campo e mostra/limpa o erro. Devolve true se estiver correcto. */
  function validarCampo(nome) {
    const campo = formulario.elements[nome];
    const erroEl = document.getElementById('erro-' + nome);
    const mensagemErro = regras[nome](campo.value.trim());

    erroEl.textContent = mensagemErro;
    // aria-invalid avisa os leitores de ecrã e activa o contorno vermelho (CSS)
    campo.setAttribute('aria-invalid', mensagemErro ? 'true' : 'false');
    return mensagemErro === '';
  }

  /* Valida cada campo quando o utilizador sai dele; e, se já tinha erro,
     volta a validar enquanto escreve (para o erro desaparecer logo que corrigido) */
  Object.keys(regras).forEach(function (nome) {
    const campo = formulario.elements[nome];
    campo.addEventListener('blur', function () { validarCampo(nome); });
    campo.addEventListener('input', function () {
      if (campo.getAttribute('aria-invalid') === 'true') validarCampo(nome);
    });
  });

  /** Mostra uma mensagem geral por baixo do botão */
  function mostrarEstado(texto, sucesso) {
    estado.textContent = texto;
    estado.classList.toggle('formulario__estado--sucesso', Boolean(sucesso));
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Impede o navegador de recarregar a página
    mostrarEstado('', false);

    // Valida TODOS os campos (não pára no primeiro erro, para mostrar todos de uma vez)
    const resultados = Object.keys(regras).map(validarCampo);
    if (resultados.indexOf(false) !== -1) {
      // Leva o foco ao primeiro campo com erro
      const primeiroErro = formulario.querySelector('[aria-invalid="true"]');
      if (primeiroErro) primeiroErro.focus();
      mostrarEstado('Corrija os campos assinalados e tente de novo.', false);
      return;
    }

    // Recolhe os valores
    const nome = formulario.elements.nome.value.trim();
    const mensagem = formulario.elements.mensagem.value.trim();

    const texto =
      'Olá! O meu nome é ' + nome + '.\n' +
      mensagem;

    if (config.contacto.metodoEnvio === 'email' && config.contacto.email) {
      // "mailto:" abre o programa de email do visitante com tudo preenchido
      window.location.href = 'mailto:' + config.contacto.email +
        '?subject=' + encodeURIComponent('Contacto pelo site — ' + nome) +
        '&body=' + encodeURIComponent(texto);
    } else {
      window.open('https://wa.me/' + config.contacto.whatsapp + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
    }

    mostrarEstado('Obrigado! A sua mensagem está pronta para ser enviada — confirme o envio na janela que abriu.', true);
    formulario.reset();
    // Depois do reset, retira as marcas de erro/sucesso dos campos
    Object.keys(regras).forEach(function (n) { formulario.elements[n].removeAttribute('aria-invalid'); });
  });
})();
