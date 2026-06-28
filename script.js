// =============================
// A&F Smart Uniformes v2.0
// Desenvolvido para A&F Uniformes
// =============================

// Estado da aplicação
const app = {
    etapa: 0,
    carrinho: [],
    cliente: {},
    total: 0
};

// Lista de telas
const telas = [];

// Inicialização
document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema() {
    console.log("A&F Smart Uniformes iniciado.");
    renderizarTelaInicial();
}

// Tela inicial
function renderizarTelaInicial() {

    document.getElementById("screen").innerHTML = `
    
    <span class="badge">Bem-vindo</span>

    <h1>Receba sua estimativa em menos de 1 minuto</h1>

    <p>
    Monte seu orçamento de forma rápida.
    Você poderá adicionar vários produtos,
    comparar valores e, no final, decidir
    se deseja falar com nossa equipe.
    </p>

    <div class="authority">

        <div>✔ +500 pedidos entregues</div>

        <div>✔ Atendimento em todo Brasil</div>

        <div>✔ Layout para aprovação</div>

        <div>✔ Personalização Premium</div>

    </div>

    <div class="clients">

        <h3>Alguns clientes que confiam na A&F Uniformes</h3>

        <div class="client-grid">

            <div class="client">
                <div class="client-img">
                Foto
                </div>

                <span>@cliente1</span>

            </div>

            <div class="client">
                <div class="client-img">
                Foto
                </div>

                <span>@cliente2</span>

            </div>

            <div class="client">
                <div class="client-img">
                Foto
                </div>

                <span>@cliente3</span>

            </div>

            <div class="client">
                <div class="client-img">
                Foto
                </div>

                <span>@cliente4</span>

            </div>

        </div>

    </div>

    `;

    atualizarBarra(1,12);

}

function atualizarBarra(etapa,total){

    document.getElementById("stepCounter").innerHTML =
    `Etapa ${etapa} de ${total}`;

    document.getElementById("progressBar").style.width =
    ((etapa/total)*100)+"%";

}
