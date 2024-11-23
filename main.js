if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  var totalAmount = "0,00"
  
  function ready() {
    // Botão remover produto
    const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeCartProductButtons.length; i++) {
      removeCartProductButtons[i].addEventListener("click", removeProduct)
    }
  
    // Mudança valor dos inputs
    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
      quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }
  
    // Botão add produto ao carrinho
    const addToCartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener("click", addProductToCart)
    }
  
    // Botão comprar
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
  }
  
  function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
  }
  
  function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
      event.target.parentElement.parentElement.remove()
    }
  
    updateTotal()
  }
  
  function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productName = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText
  
    const productsCartNames = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productsCartNames.length; i++) {
      if (productsCartNames[i].innerText === productName) {
        productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
        updateTotal()
        return
      }
    }
  
    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")
  
    newCartProduct.innerHTML =
      `
        <td class="product-identification">
          <img src="${productImage}" alt="${productName}" class="cart-product-image">
          <strong class="cart-product-title">${productName}</strong>
        </td>
        <td>
          <span class="cart-product-price">${productPrice}</span>
        </td>
        <td>
          <input type="number" value="1" min="0" class="product-qtd-input">
          <button type="button" class="remove-product-button">Remover</button>
        </td>
      `
    
    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCartProduct)
    updateTotal()
  
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
  }
  
  function makePurchase() {
    if (totalAmount === "0,00") {
      alert("Seu carrinho está vazio!")
    } else {   
      alert(
        `
          Obrigado pela sua compra!
          Valor do pedido: R$${totalAmount}\n
          Volte sempre :)
        `
      )
  
      document.querySelector(".cart-table tbody").innerHTML = ""
      updateTotal()
    }
  }
  
  // Atualizar o valor total do carrinho
  function updateTotal() {
    const cartProducts = document.getElementsByClassName("cart-product")
    totalAmount = 0
  
    for (var i = 0; i < cartProducts.length; i++) {
      const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
      const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
  
      totalAmount += productPrice * productQuantity
    }
    
    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
  }


  let produtos = [];
                let total = 0;

                function abrirMiniJanela() {
                    document.getElementById('carrinho').style.display = 'block';
                }

                function fecharMiniJanela() {
                    document.getElementById('carrinho').style.display = 'none';
                }

                function adicionarProduto(nome, preco) {
                    let produtoExiste = false;
                    for (let i = 0; i < produtos.length; i++) {
                        if (produtos[i].nome === nome) {
                            produtos[i].quantidade++;
                            produtoExiste = true;
                            break;
                        }
                    }
                    if (!produtoExiste) {
                        produtos.push({ nome, preco, quantidade: 1 });
                    }
                    total += preco;
                    listarProdutos();
                    atualizarTotal();
                }

                function removerProduto(index) {
                    let produto = produtos[index];
                    if (produto.quantidade > 1) {
                        produto.quantidade--;
                        total -= produto.preco;
                    } else {
                        total -= produto.preco;
                        produtos.splice(index, 1);
                    }
                    listarProdutos();
                    atualizarTotal();
                }

                function atualizarTotal() {
                    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
                }


                function listarProdutos() {
                    const listaProdutos = document.getElementById('lista-produtos');
                    listaProdutos.innerHTML = '';

                    produtos.forEach((produto, index) => {
                        const itemLinha = document.createElement('div');
                        itemLinha.classList.add('carrinho-item');

                        // Adiciona nome e preço do produto
                        const nomeProduto = document.createElement('span');
                        nomeProduto.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
                        nomeProduto.classList.add('carrinho-item-nome');
                        itemLinha.appendChild(nomeProduto);

                        // Checa se o produto é um complemento
                        const ehComplemento = produto.nome.endsWith('Complemento');

                        const botaoMenos = document.createElement('button');
                        botaoMenos.textContent = '-';
                        botaoMenos.onclick = function () { removerProduto(index); };
                        itemLinha.appendChild(botaoMenos);

                        const quantidadeProduto = document.createElement('span');
                        quantidadeProduto.textContent = ` ${produto.quantidade}`;
                        quantidadeProduto.classList.add('carrinho-item-quantidade');
                        itemLinha.appendChild(quantidadeProduto);

                        const botaoMais = document.createElement('button');
                        botaoMais.textContent = '+';
                        botaoMais.onclick = function () { adicionarAoCarrinho(produto.nome, produto.preco); };
                        itemLinha.appendChild(botaoMais);

                        listaProdutos.appendChild(itemLinha);

                        if (!ehComplemento) {


                            // Adicionar botão "Adicionar Complemento" após cada item do carrinho
                            const botaoComplemento = document.createElement('button');
                            botaoComplemento.textContent = 'Adicionar Complemento';
                            botaoComplemento.classList.add('carrinho-item-complemento');
                            botaoComplemento.onclick = function () {
                                abrirMenudeComplemento()
                            };

                            itemLinha.appendChild(botaoComplemento);
                        }

                        listaProdutos.appendChild(itemLinha);
                    });

                    if (produtos.length === 0) {
                        listaProdutos.innerHTML = '<li>Seu carrinho está vazio. Adicione produtos!</li>';
                    }
                }
                function abrirMenudeComplemento() {
                    var modal = document.getElementById("modalComplemento");
                    modal.style.display = "block";
                }

                // Quando o usuário clica em (x), feche a janela modal
                document.getElementsByClassName("close")[0].onclick = function () {
                    var modal = document.getElementById("modalComplemento");
                    modal.style.display = "none";
                }

                // Quando o usuário clica fora da janela modal, feche-a
                window.onclick = function (event) {
                    var modal = document.getElementById("modalComplemento");
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
                function adicionarAoCarrinho(nome, preco) {
                    adicionarProduto(nome, preco);
                    abrirMiniJanela();
                    // alert(`${nome} foi adicionado ao carrinho!`); // Linha comentada, removendo o alerta
                }

                function finalizarPedido() {
                    if (produtos.length > 0) {
                        // Substitua esta linha pela sua lógica de finalização de pedido
                        // alert('numero de protocolo enviado para seu celular ou Email'); // Linha comentada, removendo o alerta
                        produtos = [];
                        total = 0;
                        listarProdutos();
                        atualizarTotal();
                    } else {
                        // alert('Adicione algum produto ao carrinho antes de finalizar o pedido.'); // Linha comentada, removendo o alerta
                    }
                }
                // Inicializa o carrinho com uma mensagem de vazio
                listarProdutos();
                function adicionarAoCarrinhoComContador(nome, preco) {
                    let produtoExiste = false;
                    for (let i = 0; i < produtos.length; i++) {
                        if (produtos[i].nome === nome) {
                            produtos[i].quantidade++;
                            produtoExiste = true;
                            break;
                        }
                    }
                    if (!produtoExiste) {
                        produtos.push({ nome, preco, quantidade: 1 });
                    }
                    total += preco;
                    listarProdutos();
                    atualizarTotal();
                }

                function removerProdutoComContador(index) {
                    let produto = produtos[index];
                    if (produto.quantidade > 1) {
                        produto.quantidade--;
                        total -= produto.preco;
                    } else {
                        total -= produto.preco;
                        produtos.splice(index, 1);
                    }
                    listarProdutos();
                    atualizarTotal();
                }

                function abrirSobreposicao() {
                    // Cria a div de sobreposição
                    const sobreposicao = document.createElement('div');
                    sobreposicao.className = 'sobreposicao';

                    // Conteúdo da sobreposição
                    const conteudoSobreposicao = document.createElement('div');
                    conteudoSobreposicao.className = 'conteudo-sobreposicao';
                    conteudoSobreposicao.innerHTML = `
      <h2>Complemento</h2>
      <p>Selecione o complemento desejado:</p>
      <!-- Aqui você pode adicionar opções de complementos -->
    `;

                    // Botão para fechar a sobreposição
                    const botaoFechar = document.createElement('button');
                    botaoFechar.textContent = 'Fechar';
                    botaoFechar.onclick = function () { fecharSobreposicao(sobreposicao); };

                    conteudoSobreposicao.appendChild(botaoFechar);
                    sobreposicao.appendChild(conteudoSobreposicao);

                    // Adiciona a sobreposição ao corpo do documento
                    document.body.appendChild(sobreposicao);
                }

                function fecharSobreposicao(sobreposicao) {
                    sobreposicao.remove();
                }

                function adicionarComplemento(nomeComplemento, precoComplemento, isChecked) {
                    let nomeProduto = nomeComplemento + " Complemento";
                    if (isChecked) {
                        // Se o complemento foi marcado, adicione-o ao carrinho
                        adicionarProduto(nomeProduto, precoComplemento);
                    } else {
                        // Se o complemento foi desmarcado, procure-o no carrinho e remova
                        for (let i = 0; i < produtos.length; i++) {
                            if (produtos[i].nome === nomeProduto) {
                                
                                break;
                            }
                        }
                    }
                    
                }

                


                let contadorCarrinho = 0; // Inicializa o contador do carrinho
                const spanContador = document.getElementById('contador-carrinho');
                
                function atualizarContadorCarrinho() {
                    spanContador.textContent = contadorCarrinho;
                }
                
                function adicionarProduto(nome, preco) {
                    let produtoExiste = false;
                    for (let i = 0; i < produtos.length; i++) {
                        if (produtos[i].nome === nome) {
                            produtos[i].quantidade++;
                            produtoExiste = true;
                            break;
                        }
                    }
                    if (!produtoExiste) {
                        produtos.push({ nome, preco, quantidade: 1 });
                    }
                    total += preco;
                    contadorCarrinho++; // Incrementa o contador do carrinho
                    atualizarContadorCarrinho(); // Atualiza o contador no ícone
                    listarProdutos();
                    atualizarTotal();
                }
                
                function removerProduto(index) {
                    let produto = produtos[index];
                    if (produto.quantidade > 1) {
                        produto.quantidade--;
                        total -= produto.preco;
                    } else {
                        total -= produto.preco;
                        produtos.splice(index, 1);
                    }
                    contadorCarrinho--; // Decrementa o contador do carrinho
                    atualizarContadorCarrinho(); // Atualiza o contador no ícone
                    listarProdutos();
                    atualizarTotal();
                }
                
                // Função para listar os produtos no carrinho
                function listarProdutos() {
                    const listaProdutos = document.getElementById('lista-produtos');
                    listaProdutos.innerHTML = '';
                
                    produtos.forEach((produto, index) => {
                        const itemLinha = document.createElement('div');
                        itemLinha.classList.add('carrinho-item');
                
                        const nomeProduto = document.createElement('span');
                        nomeProduto.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
                        nomeProduto.classList.add('carrinho-item-nome');
                        itemLinha.appendChild(nomeProduto);
                
                        const ehComplemento = produto.nome.endsWith('Complemento');
                
                        const botaoMenos = document.createElement('button');
                        botaoMenos.textContent = '-';
                        botaoMenos.onclick = function () { removerProduto(index); };
                        itemLinha.appendChild(botaoMenos);
                
                        const quantidadeProduto = document.createElement('span');
                        quantidadeProduto.textContent = ` ${produto.quantidade}`;
                        quantidadeProduto.classList.add('carrinho-item-quantidade');
                        itemLinha.appendChild(quantidadeProduto);
                
                        const botaoMais = document.createElement('button');
                        botaoMais.textContent = '+';
                        botaoMais.onclick = function () { adicionarProduto(produto.nome, produto.preco); };
                        itemLinha.appendChild(botaoMais);
                
                        listaProdutos.appendChild(itemLinha);
                
                        if (!ehComplemento) {
                            const botaoComplemento = document.createElement('button');
                            botaoComplemento.textContent = 'Adicionar Complemento';
                            botaoComplemento.classList.add('carrinho-item-complemento');
                            botaoComplemento.onclick = function () {
                                abrirMenudeComplemento()
                            };
                            itemLinha.appendChild(botaoComplemento);
                        }
                
                        listaProdutos.appendChild(itemLinha);
                    });
                
                    if (produtos.length === 0) {
                        listaProdutos.innerHTML = '<li>Seu carrinho está vazio. Adicione produtos!</li>';
                    }
                }
                
                // Função para abrir a mini janela do carrinho
                function abrirMiniJanela() {
                    document.getElementById('carrinho').style.display = 'block';
                }
                
                // Função para fechar a mini janela do carrinho
                function fecharMiniJanela() {
                    document.getElementById('carrinho').style.display = 'none';
                }
                
                // Atualiza o total do carrinho
                function atualizarTotal() {
                    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
                }
                
                function adicionarAoCarrinho(nome, preco) {
                    adicionarProduto(nome, preco);
                    abrirMiniJanela();
                }
                
                function finalizarPedido() {
                    if (produtos.length > 0) {
                        produtos = [];
                        total = 0;
                        contadorCarrinho = 0; // Reseta o contador quando o pedido é finalizado
                        atualizarContadorCarrinho(); // Atualiza o contador no ícone
                        listarProdutos();
                        atualizarTotal();
                    }
                }
                
                // Inicializa o carrinho com uma mensagem de vazio
                listarProdutos();
                
                function capturarTelaCarrinho() {
                    const carrinho = document.getElementById('carrinho');
                    const listaProdutos = carrinho.querySelector('#lista-produtos').innerText;
                    const total = carrinho.querySelector('#total').innerText;
                    const observacoes = encodeURIComponent(carrinho.querySelector('#observacoes-gerais').value);
                
                    const params = new URLSearchParams();
                    params.append('produtos', encodeURIComponent(listaProdutos));
                    params.append('total', total);
                    params.append('observacoes', observacoes);
                
                    window.location.href = 'carrinho.html?' + params.toString();
                }
                