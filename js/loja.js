/* ==========================================================================
   loja.js  —  LOJA E CARRINHO
   --------------------------------------------------------------------------
   Responsável por:
     1. Criar os cartões de produto a partir de dados.js (com filtro por categoria)
     2. Carrinho: adicionar, alterar quantidades, remover, esvaziar
     3. Guardar o carrinho no navegador (continua lá se a página for recarregada)
     4. Finalizar: monta a encomenda e abre o WhatsApp com a mensagem pronta

   Este site é só "front-end" (sem servidor), por isso não há pagamento online:
   a encomenda segue por WhatsApp e a equipa confirma-a.
   ========================================================================== */

(function () {
  'use strict';

  const U = Estudio.utils;
  const produtos = Estudio.dados.produtos;
  const config = window.ESTUDIO_CONFIG;

  /* ----- Elementos da página ----- */
  const gradeProdutos = document.getElementById('grade-produtos');
  const filtrosLoja = document.getElementById('filtros-loja');
  const gaveta = document.getElementById('carrinho');
  const listaItens = document.getElementById('carrinho-itens');
  const totalEl = document.getElementById('carrinho-total');
  const botaoAbrir = document.getElementById('btn-carrinho');
  const botaoFinalizar = document.getElementById('btn-finalizar');
  const botaoLimpar = document.getElementById('btn-limpar');

  if (!gradeProdutos || !gaveta) return;

  /* Nome da "gaveta" onde o carrinho é guardado no navegador */
  const CHAVE_ARMAZENAMENTO = 'estudio_carrinho_v1';
  const QUANTIDADE_MAXIMA = 99;

  /* Dicionário para encontrar um produto pelo seu id: { 'p1': {...}, 'p2': {...} } */
  const produtoPorId = {};
  produtos.forEach(function (produto) { produtoPorId[produto.id] = produto; });


  /* ======================================================================
     ESTADO DO CARRINHO
     Guardamos só { idDoProduto: quantidade }. Nome, preço e foto são sempre
     lidos de dados.js — assim, se um preço mudar, o carrinho acompanha.
     ====================================================================== */
  let carrinho = carregarCarrinho();

  /** Lê o carrinho guardado e descarta tudo o que não for válido */
  function carregarCarrinho() {
    const guardado = U.lerArmazenamento(CHAVE_ARMAZENAMENTO, {});
    const limpo = {};
    if (guardado && typeof guardado === 'object') {
      Object.keys(guardado).forEach(function (id) {
        const quantidade = Math.floor(Number(guardado[id]));
        // Só aceita produtos que existem e quantidades entre 1 e 99
        if (produtoPorId[id] && quantidade > 0) {
          limpo[id] = Math.min(quantidade, QUANTIDADE_MAXIMA);
        }
      });
    }
    return limpo;
  }

  /** Guarda o carrinho e actualiza tudo o que o mostra no ecrã */
  function atualizar() {
    U.gravarArmazenamento(CHAVE_ARMAZENAMENTO, carrinho);
    desenharCarrinho();
    atualizarContador();
  }

  /** Número total de unidades no carrinho */
  function contarUnidades() {
    return Object.keys(carrinho).reduce(function (soma, id) { return soma + carrinho[id]; }, 0);
  }

  /** Valor total em dinheiro */
  function calcularTotal() {
    return Object.keys(carrinho).reduce(function (soma, id) {
      return soma + produtoPorId[id].preco * carrinho[id];
    }, 0);
  }

  /** Actualiza o "Carrinho (N)" do menu */
  function atualizarContador() {
    document.querySelectorAll('[data-carrinho-contagem]').forEach(function (el) {
      el.textContent = contarUnidades();
    });
  }


  /* ======================================================================
     ACÇÕES DO CARRINHO
     ====================================================================== */

  function adicionar(id) {
    carrinho[id] = Math.min((carrinho[id] || 0) + 1, QUANTIDADE_MAXIMA);
    atualizar();
    U.mostrarAviso('Adicionado ao carrinho: ' + produtoPorId[id].nome);
  }

  function alterarQuantidade(id, diferenca) {
    const nova = (carrinho[id] || 0) + diferenca;
    if (nova <= 0) delete carrinho[id];            // Chegou a zero: remove o produto
    else carrinho[id] = Math.min(nova, QUANTIDADE_MAXIMA);
    atualizar();
  }

  function remover(id) {
    delete carrinho[id];
    atualizar();
  }

  function esvaziar() {
    carrinho = {};
    atualizar();
  }


  /* ======================================================================
     1. PRODUTOS
     ====================================================================== */

  /** Desenha os cartões dos produtos que passam no filtro */
  function mostrarProdutos(categoria) {
    const lista = categoria === 'Todos'
      ? produtos
      : produtos.filter(function (produto) { return produto.categoria === categoria; });

    gradeProdutos.replaceChildren();

    if (lista.length === 0) {
      gradeProdutos.appendChild(U.criar('p', { class: 'vazio', texto: 'Ainda não há produtos nesta categoria.' }));
      return;
    }

    lista.forEach(function (produto) {
      const botaoComprar = U.criar('button', {
        class: 'btn btn--primario btn--bloco',
        type: 'button'
      }, [U.icone('carrinho', 18), 'Adicionar ao Carrinho']);
      botaoComprar.addEventListener('click', function () { adicionar(produto.id); });

      const cartao = U.criar('article', { class: 'produto' }, [
        // ajuste: 'contida' mostra a imagem inteira (sem cortes), ideal para cartazes com texto
        U.criar('div', { class: 'produto__media' + (produto.ajuste === 'contida' ? ' produto__media--contida' : '') }, [
          U.criarImagem(produto.imagem, produto.nome),
          produto.destaque ? U.criar('span', { class: 'produto__selo', texto: 'Destaque' }) : null,
          U.criar('span', { class: 'produto__icone' }, [U.icone(produto.icone || 'imagem', 20)])
        ]),
        U.criar('div', { class: 'produto__corpo' }, [
          U.criar('p', { class: 'produto__categoria', texto: produto.categoria }),
          U.criar('h3', { class: 'produto__nome', texto: produto.nome }),
          U.criar('p', { class: 'produto__preco', texto: U.formatarPreco(produto.preco) })
        ]),
        U.criar('div', { class: 'produto__rodape' }, [botaoComprar])
      ]);

      gradeProdutos.appendChild(cartao);
    });
  }

  /* Filtros com as categorias existentes em dados.js */
  const categoriasLoja = [];
  produtos.forEach(function (produto) {
    if (categoriasLoja.indexOf(produto.categoria) === -1) categoriasLoja.push(produto.categoria);
  });
  U.criarFiltros(filtrosLoja, categoriasLoja, mostrarProdutos);
  mostrarProdutos('Todos');


  /* ======================================================================
     2. GAVETA DO CARRINHO (desenho)
     ====================================================================== */

  /** Cria um botão redondo "−" ou "+" */
  function botaoQuantidade(nomeIcone, rotulo, aoClicar) {
    const botao = U.criar('button', { class: 'btn-icone', type: 'button', 'aria-label': rotulo }, [U.icone(nomeIcone, 16)]);
    botao.addEventListener('click', aoClicar);
    return botao;
  }

  /** Redesenha a lista de itens e o total */
  function desenharCarrinho() {
    listaItens.replaceChildren();
    const ids = Object.keys(carrinho);

    if (ids.length === 0) {
      listaItens.appendChild(U.criar('p', { class: 'carrinho__vazio', texto: 'O seu carrinho está vazio.' }));
    }

    ids.forEach(function (id) {
      const produto = produtoPorId[id];
      const quantidade = carrinho[id];

      const botaoRemover = U.criar('button', {
        class: 'btn-icone',
        type: 'button',
        'aria-label': 'Remover ' + produto.nome
      }, [U.icone('lixo', 18)]);
      botaoRemover.addEventListener('click', function () { remover(id); });

      const linha = U.criar('div', { class: 'item-carrinho' }, [
        U.criarImagem(produto.imagem, produto.nome, 'item-carrinho__img'),
        U.criar('div', {}, [
          U.criar('p', { class: 'item-carrinho__nome', texto: produto.nome }),
          U.criar('p', { class: 'item-carrinho__preco', texto: U.formatarPreco(produto.preco) + ' cada' })
        ]),
        U.criar('div', { class: 'item-carrinho__controlos' }, [
          U.criar('div', { class: 'quantidade' }, [
            botaoQuantidade('menos', 'Diminuir quantidade de ' + produto.nome, function () { alterarQuantidade(id, -1); }),
            U.criar('span', { class: 'quantidade__valor', 'aria-live': 'polite', texto: String(quantidade) }),
            botaoQuantidade('mais', 'Aumentar quantidade de ' + produto.nome, function () { alterarQuantidade(id, 1); })
          ]),
          U.criar('strong', { texto: U.formatarPreco(produto.preco * quantidade) }),
          botaoRemover
        ])
      ]);
      listaItens.appendChild(linha);
    });

    totalEl.textContent = U.formatarPreco(calcularTotal());
    // Sem itens não faz sentido finalizar nem esvaziar
    botaoFinalizar.disabled = ids.length === 0;
    botaoLimpar.hidden = ids.length === 0;
  }


  /* ======================================================================
     4. FINALIZAR ENCOMENDA (WhatsApp)
     ====================================================================== */

  function finalizarEncomenda() {
    const ids = Object.keys(carrinho);
    if (ids.length === 0) return;

    // Monta a mensagem linha a linha
    const linhas = ['Olá! Gostaria de fazer a seguinte encomenda:', ''];
    ids.forEach(function (id) {
      const produto = produtoPorId[id];
      linhas.push('• ' + carrinho[id] + 'x ' + produto.nome + ' — ' + U.formatarPreco(produto.preco * carrinho[id]));
    });
    linhas.push('', 'Total: ' + U.formatarPreco(calcularTotal()));

    // encodeURIComponent converte o texto para um formato seguro dentro de um link
    const endereco = 'https://wa.me/' + config.contacto.whatsapp + '?text=' + encodeURIComponent(linhas.join('\n'));
    // noopener: a nova página não ganha controlo sobre esta
    window.open(endereco, '_blank', 'noopener');
  }


  /* ======================================================================
     LIGAÇÃO DOS BOTÕES
     ====================================================================== */
  U.ligarDialogo(gaveta);

  botaoAbrir.addEventListener('click', function () {
    // Fecha o menu de telemóvel (se estiver aberto) antes de abrir a gaveta
    const menu = document.getElementById('menu-principal');
    if (menu) menu.classList.remove('is-aberto');
    const burger = document.getElementById('btn-menu');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    U.abrirDialogo(gaveta);
  });

  botaoFinalizar.addEventListener('click', finalizarEncomenda);
  botaoLimpar.addEventListener('click', esvaziar);

  /* Primeira pintura do carrinho com o que estava guardado */
  atualizar();
})();
