/* ==========================================================================
   contacto.js  —  FORMULÁRIO DE CONTACTO
   --------------------------------------------------------------------------
   Responsável por:
     1. Validar os campos (nome e mensagem)
     2. Mostrar mensagens de erro junto de cada campo
     3. Enviar: o envio AINDA NÃO ESTÁ LIGADO a nenhum serviço. Quando houver
        um (servidor, Formspree, EmailJS, etc.), é só preencher a função
        "enviarMensagem" mais abaixo — o resto do formulário já está pronto.
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
    const dados = {
      nome: formulario.elements.nome.value.trim(),
      mensagem: formulario.elements.mensagem.value.trim()
    };

    enviarMensagem(dados);
  });

  /* ----------------------------------------------------------------------
     ENVIO DA MENSAGEM  (A PREENCHER)
     Recebe { nome, mensagem } já validados. Quando existir um destino
     (servidor, Formspree, EmailJS...), faça aqui o pedido de envio e, se
     correr bem, chame:
         mostrarEstado('Mensagem enviada. Obrigado!', true);
         formulario.reset();
     Por agora avisa o visitante de que o envio ainda não está disponível,
     para ninguém pensar que a mensagem foi entregue.
     ---------------------------------------------------------------------- */
  function enviarMensagem(dados) { // eslint-disable-line no-unused-vars
    mostrarEstado('De momento não é possível enviar mensagens por aqui. Use os contactos ao lado.', false);
  }
})();
