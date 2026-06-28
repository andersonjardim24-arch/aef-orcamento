// A&F Smart Uniformes v2.0

const state = {
  step: 0,
  cart: [],
  currentItem: {},
  leadSaved: false,
  data: {}
};

const screen = document.getElementById("screen");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const steps = [
  "home",
  "perfil",
  "produto",
  "quantidade",
  "personalizacao",
  "carrinho",
  "prazo",
  "decisor",
  "condicao",
  "promocao",
  "dados",
  "entrega",
  "loading",
  "resultado"
];

document.addEventListener("DOMContentLoaded", () => {
  backBtn.addEventListener("click", voltar);
  nextBtn.addEventListener("click", avancar);
  render();
});

function render() {
  const current = steps[state.step];

  updateProgress();
renderMiniCart();
  backBtn.classList.toggle("hidden", state.step === 0 || current === "loading" || current === "resultado");
  nextBtn.classList.toggle("hidden", ["home","perfil","produto","quantidade","personalizacao","carrinho","prazo","decisor","condicao","promocao","loading","resultado"].includes(current));

  if (current === "home") renderHome();
  if (current === "perfil") renderPerfil();
  if (current === "produto") renderProduto();
  if (current === "quantidade") renderQuantidade();
  if (current === "personalizacao") renderPersonalizacao();
  if (current === "carrinho") renderCarrinho();
  if (current === "prazo") renderPrazo();
  if (current === "decisor") renderDecisor();
  if (current === "condicao") renderCondicao();
  if (current === "promocao") renderPromocao();
  if (current === "dados") renderDados();
  if (current === "entrega") renderEntrega();
  if (current === "loading") renderLoading();
  if (current === "resultado") renderResultado();
}

function updateProgress() {
  document.getElementById("stepCounter").innerText = `Etapa ${state.step + 1} de ${steps.length}`;
  document.getElementById("progressBar").style.width = `${((state.step + 1) / steps.length) * 100}%`;
}

function avancar() {
  salvarInputs();

  if (state.step < steps.length - 1) {
    try {
      registrarEvento("Etapa concluída", steps[state.step]);
    } catch (erro) {
      console.log("Erro evento:", erro);
    }

    state.step++;
    render();
  }
}
function voltar() {
  if (state.step > 0) {
    state.step--;
    render();
  }
}
function renderHome() {
  screen.innerHTML = `
    <span class="badge">Orçamento rápido A&F</span>

    <h1>👕 Faça seu orçamento em menos de 1 minuto</h1>

    <p>
      Escolha os produtos, informe a quantidade e receba uma estimativa rápida e organizada.
      Sem esperar atendimento, sem enrolação e sem compromisso.
    </p>

    <div class="box green">
      👇 Para começar, clique no botão abaixo.
    </div>

    <button class="btn primary" onclick="avancar()">
      📋 FAZER MEU ORÇAMENTO AGORA
    </button>

    <p class="small">
      Leva menos de 1 minuto. Depois, se quiser avançar, nossa equipe te atende pelo WhatsApp.
    </p>

    <div class="box gold">
      ⭐⭐⭐⭐⭐<br>
      <strong>Uniformes personalizados para empresas, igrejas, eventos e equipes.</strong><br>
      Produção sob medida, layout para aprovação e atendimento para todo o Brasil.
    </div>

    <div class="clients">
      <h3>Alguns clientes que confiam na A&F Uniformes</h3>

      <div class="client-grid">

        <div class="client">
          <img class="client-img" src="primeiro-reino.jpg" alt="Primeiro Reino Burger">
          <strong>Primeiro Reino Burger</strong><br>
          <span>@primeiroreinoburger</span>
          <p class="small">Cliente A&F Uniformes</p>
        </div>

        <div class="client">
          <img class="client-img" src="no-stress.jpg" alt="No Stress">
          <strong>No Stress</strong><br>
          <span>@nostress</span>
          <p class="small">Cliente A&F Uniformes</p>
        </div>

        <div class="client">
          <img class="client-img" src="allufort-esquadrias.jpg" alt="Allufort Esquadrias">
          <strong>Allufort Esquadrias</strong><br>
          <span>@allufortesquadrias</span>
          <p class="small">Cliente A&F Uniformes</p>
        </div>

        <div class="client">
          <img class="client-img" src="vigilhao-ressuscita.jpg" alt="Vigilhão Ressuscita">
          <strong>Vigilhão Ressuscita</strong><br>
          <span>@vigiliaressuscita</span>
          <p class="small">Evento parceiro</p>
        </div>

      </div>
    </div>
  `;
}

function renderPerfil() {
  screen.innerHTML = `
    <h1>Para quem será esse uniforme?</h1>
    <p>Assim conseguimos montar uma estimativa mais adequada para sua necessidade.</p>
    <div class="grid">
      ${btn("objetivo","Empresa / Equipe")}
      ${btn("objetivo","Igreja / Ministério")}
      ${btn("objetivo","Evento / Congresso")}
      ${btn("objetivo","Prestação de serviço")}
      ${btn("objetivo","Escola / Projeto")}
    </div>
  `;
}

function renderProduto() {
  screen.innerHTML = `
    <h1>Qual item deseja adicionar ao orçamento?</h1>
    <p>Você pode adicionar vários produtos no mesmo pedido.</p>
    <div class="grid">
      ${btnProduto("Camiseta")}
      ${btnProduto("Polo")}
      ${btnProduto("Moletom")}
      ${btnProduto("Boné")}
      ${btnProduto("Calça de sarja")}
    </div>
  `;
}

function renderQuantidade() {
  const qtds = [3,5,8,10,12,15,18,20,23,25,28,30,40,50,80,100];
  screen.innerHTML = `
    <h1>Quantidade deste item</h1>
    <p>Quanto maior a quantidade, melhor tende a ficar o valor por peça.</p>
    <div class="grid two">
      ${qtds.map(q => `<button class="option" onclick="selecionarQuantidade(${q})">${q === 100 ? "100 ou mais" : q + " unidades"}</button>`).join("")}
    </div>
  `;
}

function renderPersonalizacao() {
  let opcoes = [];

  if (state.currentItem.produto === "Boné") {
    opcoes = ["Sem personalização", "Logo na frente"];
  } else if (state.currentItem.produto === "Calça de sarja") {
    opcoes = ["Sem personalização", "Logo na perna"];
  } else {
    opcoes = ["Logo na frente", "Frente e costas", "Frente, costas e manga", "Frente e barra"];
  }

  screen.innerHTML = `
    <h1>Escolha a personalização</h1>
    <p>Clique em uma das opções abaixo para adicionar o item ao orçamento.</p>
    <div class="grid">
      ${opcoes.map(o => `<button class="option" onclick="selecionarPersonalizacao('${o}')">${o}</button>`).join("")}
    </div>
  `;
}

function renderCarrinho() {
  screen.innerHTML = `
    <h1>Seu orçamento até aqui</h1>
    <p>Você pode adicionar mais itens ou finalizar a simulação.</p>

    <div class="cart">
      ${state.cart.length ? state.cart.map((item, i) => `
        <div class="cart-item">
          <span>${item.qtd}x ${item.produto} — ${item.personalizacao}<br><strong>R$ ${moeda(item.total)}</strong></span>
          <button class="remove" onclick="removerItem(${i})">Remover</button>
        </div>
      `).join("") : "<p>Nenhum item adicionado.</p>"}
    </div>

    <button class="btn primary" onclick="irParaProduto()">+ Adicionar outro produto</button>
    <br><br>
    <button class="btn secondary" onclick="avancar()">Finalizar simulação</button>
  `;
}

function renderPrazo() {
  screen.innerHTML = `
    <h1>Existe alguma data importante para receber os uniformes?</h1>
    <p>Isso nos ajuda a entender a urgência e orientar melhor a produção.</p>
    <div class="grid">
      ${btn("prazo","Quero produzir imediatamente")}
      ${btn("prazo","Nesta semana")}
      ${btn("prazo","Nos próximos 30 dias")}
      ${btn("prazo","Nos próximos 3 meses")}
      ${btn("prazo","Estou apenas pesquisando")}
    </div>
  `;
}

function renderDecisor() {
  screen.innerHTML = `
    <h1>Quem participa da decisão desse pedido?</h1>
    <p>Assim conseguimos preparar uma proposta mais adequada.</p>
    <div class="grid">
      ${btn("decisor","Eu mesmo decido")}
      ${btn("decisor","Preciso apresentar para alguém")}
      ${btn("decisor","Diretoria / liderança decide")}
      ${btn("decisor","Ainda estamos avaliando")}
    </div>
  `;
}

function renderCondicao() {
  screen.innerHTML = `
    <h1>O que mais ajudaria você a avançar?</h1>
    <p>Quando possível, tentamos adaptar a proposta ao que faz mais sentido para cada cliente.</p>
    <div class="grid">
      ${btn("ajudaFechar","Frete grátis")}
      ${btn("ajudaFechar","Melhor preço")}
      ${btn("ajudaFechar","Prazo mais rápido")}
      ${btn("ajudaFechar","Parcelamento")}
      ${btn("ajudaFechar","Layout para visualizar antes")}
    </div>
  `;
}

function renderPromocao() {
  screen.innerHTML = `
    <h1>Se surgir uma condição especial para esse tipo de pedido...</h1>
    <p>Gostaria que avisássemos você?</p>
    <div class="grid">
      ${btn("promocao","Sim, quero receber condições especiais")}
      ${btn("promocao","Não, obrigado")}
    </div>
  `;
}

function renderDados() {
  screen.innerHTML = `
    <h1>Para quem devemos salvar esta simulação?</h1>
    <p>Sua simulação ficará registrada caso queira retomar ou ajustar depois.</p>
    <input id="nome" placeholder="Seu nome">
    <input id="telefone" placeholder="WhatsApp com DDD">
    <input id="empresa" placeholder="Nome da empresa, igreja ou equipe">
  `;
  nextBtn.classList.remove("hidden");
}

function renderEntrega() {
  screen.innerHTML = `
    <h1>Para onde seria a entrega?</h1>
    <p>Essas informações ajudam a confirmar prazo e frete depois.</p>
    <input id="cidade" placeholder="Cidade/UF">
    <input id="cep" placeholder="CEP">
  `;
  nextBtn.classList.remove("hidden");
}

function renderLoading() {
  calcularTotal();
  salvarLead();

  screen.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <div>Calculando sua estimativa...</div>
      <div>Registrando sua simulação...</div>
      <div>Preparando sua condição personalizada...</div>
    </div>
  `;

  setTimeout(() => {
    state.step++;
    render();
  }, 1800);
}

function renderResultado() {
  calcularTotal();
if (typeof fbq !== 'undefined') {
    fbq('track', 'CompleteRegistration', {
       value: Number(state.data.total || 0),
        currency: 'BRL'
    });
}
  screen.innerHTML = `
    <span class="badge">Simulação concluída</span>
    <h1>Sua estimativa ficou pronta!</h1>
    <p>Sua simulação foi salva. Se quiser retomar ou ajustar depois, teremos essas informações registradas.</p>

    <div class="result">
      <div>Investimento estimado:</div>
      <div class="price">R$ ${moeda(state.data.total)}</div>
      <div>Média aproximada: R$ ${moeda(state.data.unitario)} por peça</div>
    </div>

   <div class="box green">
  ${freteMensagem()}
  ${barraFreteGratis()}
</div>

<div class="box gold">
  ${condicaoMensagem()}
</div>
    <div class="box">
      ✅ Tecido de alta qualidade<br>
      ✅ Personalização em alta definição<br>
      ✅ Layout profissional para aprovação<br>
      ✅ Atendimento especializado<br>
      ✅ Produção ágil
    </div>

    <div class="summary">
      <strong>Resumo:</strong><br>
      ${state.data.itensDetalhados}<br>
      Prazo: ${state.data.prazo}<br>
      Objetivo: ${state.data.objetivo}<br>
      O que ajudaria: ${state.data.ajudaFechar}<br>
      Promoções: ${state.data.promocao}
    </div>

    <button class="btn secondary" onclick="adicionarMaisNoResultado()">
➕ Adicionar mais itens ao orçamento
</button>

<br><br>
<div class="box">

  <h3 style="margin-bottom:12px;">
    👕 Veja como outras empresas, igrejas e equipes personalizaram seus uniformes.
  </h3>

  <p style="margin-bottom:18px;">
    Inspire-se em projetos reais produzidos pela A&F Uniformes antes de avançar.
  </p>

  <button class="btn secondary"
    onclick="window.open('https://instagram.com/aefuniformes','_blank')">
    📸 Ver projetos reais
  </button>

  <p class="small">
    Abre em nova aba para você não perder sua simulação.
  </p>

</div>

<br>
<button class="btn whatsapp" onclick="abrirWhatsApp()">
🚀 Quero receber meu layout personalizado
</button>

<p class="small">
Ao avançar, nossa equipe poderá auxiliar com layout, ajustes e fechamento.
</p>
  `;
}

function btn(campo, valor) {
  return `<button class="option" onclick="selecionarOpcao('${campo}', '${valor}')">${valor}</button>`;
}

function selecionarOpcao(campo, valor) {
  state.data[campo] = valor;
  state.step++;
  render();
}

function btnProduto(produto) {
  return `<button class="option" onclick="selecionarProduto('${produto}')">${produto}</button>`;
}

function selecionarProduto(produto) {
  state.currentItem = { produto };
  avancar();
}

function selecionarQuantidade(qtd) {
  state.currentItem.qtd = qtd;
  state.currentItem.quantidade = qtd === 100 ? "100 ou mais" : `${qtd} unidades`;
  avancar();
}

function selecionarPersonalizacao(personalizacao) {
  state.currentItem.personalizacao = personalizacao;
  const calc = calcularItem(state.currentItem.produto, state.currentItem.qtd, personalizacao);

  state.cart.push({
    ...state.currentItem,
    unitario: calc.unitario,
    total: calc.total
  });

  state.currentItem = {};
  avancar();
}

function irParaProduto() {
  state.step = 2;
  render();
}

function removerItem(index) {
  state.cart.splice(index, 1);
  render();
}

function precoBase(produto, qtd) {
  if (produto === "Camiseta") {
    if (qtd <= 3) return 79;
    if (qtd <= 5) return 69;
    if (qtd <= 8) return 55;
    if (qtd <= 20) return 49.90;
    if (qtd <= 30) return 45.50;
    if (qtd <= 40) return 45;
    if (qtd <= 80) return 39.90;
    return 35;
  }

  if (produto === "Polo") {
    if (qtd <= 3) return 79;
    if (qtd <= 5) return 69;
    if (qtd <= 20) return 65;
    if (qtd <= 40) return 59;
    if (qtd <= 80) return 55;
    return 52;
  }

  if (produto === "Moletom") {
    if (qtd <= 3) return 149;
    if (qtd <= 5) return 139;
    if (qtd <= 20) return 129;
    if (qtd <= 30) return 119;
    if (qtd <= 40) return 115;
    if (qtd <= 80) return 109;
    return 99;
  }

  if (produto === "Boné") {
    if (qtd <= 5) return 59;
    if (qtd <= 20) return 55;
    if (qtd <= 40) return 49;
    if (qtd <= 80) return 45;
    return 42;
  }

  if (produto === "Calça de sarja") {
    if (qtd <= 3) return 109;
    if (qtd <= 5) return 99;
    if (qtd <= 8) return 95;
    if (qtd <= 20) return 89;
    if (qtd <= 30) return 85;
    if (qtd <= 40) return 82;
    if (qtd <= 80) return 79;
    return 75;
  }

  return 0;
}

function calcularItem(produto, qtd, personalizacao) {
  let unitario = precoBase(produto, qtd);

  if (produto !== "Boné" && produto !== "Calça de sarja") {
    if (personalizacao === "Frente e costas") unitario += 5;
    if (personalizacao === "Frente, costas e manga") unitario += 10;
    if (personalizacao === "Frente e barra") unitario += 7;
  }

  if (produto === "Calça de sarja" && personalizacao === "Logo na perna") unitario += 5;

  return {
    unitario,
    total: unitario * qtd
  };
}

function calcularTotal() {
  const qtdTotal = state.cart.reduce((s, i) => s + i.qtd, 0);
  const total = state.cart.reduce((s, i) => s + i.total, 0);
  const media = qtdTotal ? total / qtdTotal : 0;

  state.data.qtdNumero = qtdTotal;
  state.data.total = total;
  state.data.unitario = media;
  state.data.produto = state.cart.length > 1 ? "Pedido misto" : state.cart[0]?.produto || "";
  state.data.quantidade = `${qtdTotal} peças no total`;
  state.data.personalizacao = state.cart.length > 1 ? "Múltiplas" : state.cart[0]?.personalizacao || "";
  state.data.itensDetalhados = state.cart.map(i => `${i.qtd}x ${i.produto} — ${i.personalizacao} — R$ ${moeda(i.total)}`).join(" | ");
}

function salvarInputs() {
  ["nome","telefone","empresa","cidade","cep"].forEach(id => {
    const el = document.getElementById(id);
    if (el) state.data[id] = el.value;
  });
}

function classificarLead() {
  const qtd = state.data.qtdNumero || 0;

  if (qtd >= 20 && ["Quero produzir imediatamente", "Nesta semana"].includes(state.data.prazo)) {
    return "🔥 Lead Quente";
  }

  if (qtd >= 10 && state.data.prazo !== "Estou apenas pesquisando") {
    return "🟡 Lead Morno";
  }

  return "❄️ Lead Frio";
}

function salvarLead() {
  if (state.leadSaved) return;

  state.data.status = classificarLead();
  state.data.origem = CONFIG.empresa;

  fetch(CONFIG.scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.data)
  });

  state.leadSaved = true;
}

function abrirWhatsApp() {
  const msg = `
Olá! Fiz uma simulação no A&F Smart Uniformes.

Nome: ${state.data.nome || "Não informado"}
WhatsApp: ${state.data.telefone || "Não informado"}
Empresa/Igreja/Equipe: ${state.data.empresa || "Não informado"}

Itens:
${state.data.itensDetalhados}

Quantidade total: ${state.data.quantidade}
Cidade/UF: ${state.data.cidade || "Não informado"}
CEP: ${state.data.cep || "Não informado"}

Estimativa aproximada: R$ ${moeda(state.data.total)}
Média por peça: R$ ${moeda(state.data.unitario)}

Gostaria de avançar com meu pedido e receber atendimento da equipe.
`;
if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {
        value: state.data.total,
        currency: 'BRL'
    });
}
 
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function freteMensagem() {
  if (state.data.qtdNumero >= CONFIG.freteGratis) {
    return "🎉 Sua simulação pode desbloquear frete grátis para pedidos acima de 30 peças.";
  }

  return `🚚 Faltam apenas ${CONFIG.freteGratis - state.data.qtdNumero} peças para alcançar a condição de frete grátis.`;
}

function condicaoMensagem() {
  if (state.data.total >= 1500) {
    return "🎁 Seu pedido se enquadra em uma condição corporativa especial.";
  }

  return "🎁 Aumentando a quantidade, você pode liberar condições especiais.";
}
function adicionarMaisNoResultado() {
    state.leadSaved = false;
    state.step = 2; // volta para a tela de escolha de produtos
    render();
}
function moeda(valor) {
  return Number(valor || 0).toFixed(2).replace(".", ",");
}
function barraFreteGratis() {
  const qtd = state.data.qtdNumero || 0;
  const meta = CONFIG.freteGratis;
  const percentual = Math.min((qtd / meta) * 100, 100);

  if (qtd >= meta) {
    return `
      <div style="margin-top:12px;">
        <div style="background:#d1fae5;border-radius:999px;overflow:hidden;height:12px;">
          <div style="width:100%;height:100%;background:#1f7a3f;"></div>
        </div>
        <p style="margin-top:8px;color:#14532d;font-weight:800;">
          ${qtd}/${meta} peças — condição especial desbloqueada.
        </p>
      </div>
    `;
  }

  return `
    <div style="margin-top:12px;">
      <div style="background:#d1fae5;border-radius:999px;overflow:hidden;height:12px;">
        <div style="width:${percentual}%;height:100%;background:#1f7a3f;"></div>
      </div>
      <p style="margin-top:8px;color:#14532d;font-weight:800;">
        ${qtd}/${meta} peças — faltam apenas ${meta - qtd} peças.
      </p>
    </div>
  `;
}

function adicionarMaisNoResultado() {
  state.leadSaved = false;
  state.step = 2;
  render();
}
function renderMiniCart() {
  let miniCart = document.getElementById("miniCart");

  if (!miniCart) {
    miniCart = document.createElement("div");
    miniCart.id = "miniCart";
    screen.before(miniCart);
  }

  if (!state.cart.length || state.step === 0 || state.step >= 12) {
    miniCart.innerHTML = "";
    miniCart.style.display = "none";
    return;
  }
function renderMiniCart() {
  let miniCart = document.getElementById("miniCart");

  if (!miniCart) {
    miniCart = document.createElement("div");
    miniCart.id = "miniCart";
    screen.before(miniCart);
  }

  if (!state.cart.length || state.step === 0 || state.step >= 12) {
    miniCart.innerHTML = "";
    miniCart.style.display = "none";
    return;
  }

  calcularTotal();

  miniCart.style.display = "block";
  miniCart.innerHTML = `
    <div class="mini-cart">
      🛒 ${state.cart.length} item(ns) no orçamento
      <strong>R$ ${moeda(state.data.total)}</strong>
    </div>
  `;
}

function registrarEvento(evento, detalhe = "") {
  try {
    fetch(CONFIG.scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "evento",
        sessao: localStorage.getItem("sessaoAef") || criarSessaoAef(),
        etapa: detalhe,
        evento: evento,
        valor: "",
        produto: state.currentItem.produto || state.data.produto || "",
        quantidade: state.currentItem.quantidade || state.data.quantidade || "",
        total: state.data.total || "",
        nome: state.data.nome || "",
        telefone: state.data.telefone || ""
      })
    });
  } catch (erro) {
    console.log("Erro ao registrar evento:", erro);
  }
}

function criarSessaoAef() {
  const id = "AEF-" + Date.now() + "-" + Math.floor(Math.random() * 9999);
  localStorage.setItem("sessaoAef", id);
  return id;
}
 
