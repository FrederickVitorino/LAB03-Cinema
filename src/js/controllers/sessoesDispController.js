import Sessao from "../classes/sessao.js";

class SessoesDispController{
    constructor(){
        this.listaSessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
        this.listaSessoes = this.listaSessoes.map(sessao => Sessao.fromJSON(sessao));
        this.tabelaSessoes = document.getElementById("tabela-sessoes-disponiveis");
        this.init();
    }

    init(){
        this.atualizarTabelaSessoes();
    }

    atualizarTabelaSessoes(){
        const tbody = this.tabelaSessoes.querySelector("tbody") || document.createElement("tbody");
        tbody.innerHTML = "";
        this.listaSessoes.forEach(sessao => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sessao.getFilme().getTitulo()}</td>
                <td>${sessao.getSala().getNome()}</td>
                <td>${sessao.getDataHora().replace("T", " ")}</td>
                <td>R$ ${sessao.getPreco().toFixed(2)}</td>
            `;
            const botao = this.criarBotao(sessao);
            const tdBotoes = document.createElement("td");
            tdBotoes.appendChild(botao);
            tr.appendChild(tdBotoes);
            tbody.appendChild(tr);
        });
        this.tabelaSessoes.appendChild(tbody);
    }

    criarBotao(sessao){
        const btnComprarIngresso = document.createElement("button");
        btnComprarIngresso.innerText = "Comprar Ingresso";
        btnComprarIngresso.classList.add("btn", "btn-success");
        btnComprarIngresso.addEventListener("click", () => this.comprarIngresso(sessao.getId()));

        return btnComprarIngresso;
    }

    comprarIngresso(id){
        window.location.href = `venda-ingressos.html?sessaoId=${id}`;
    }
}

export default SessoesDispController;

document.addEventListener("DOMContentLoaded", () => { const sessoesDispController = new SessoesDispController(); });