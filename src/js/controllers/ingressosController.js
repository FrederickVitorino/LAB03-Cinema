import Sessao from "../classes/sessao.js";
import Ingresso from "../classes/ingressos.js";

class IngressosController{
    constructor(){
        this.listaIngressos = JSON.parse(localStorage.getItem("ingressos")) || [];
        this.listaIngressos = this.listaIngressos.map(ingresso => Ingresso.fromJSON(ingresso));
        this.listaSessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
        this.listaSessoes = this.listaSessoes.map(sessao => Sessao.fromJSON(sessao));
        this.form = document.getElementById("form-ingressos");
        this.init();
    }

    init(){
        this.form.addEventListener("submit", (event) => this.confirmarVenda(event));
        this.carregarSessoes();
        const urlParams = new URLSearchParams(window.location.search);
        const sessaoId = urlParams.get("sessaoId");
        if(sessaoId){ this.carregarSessaoSelecionada(sessaoId); }
    }

    carregarSessoes(){
        const selectSessao = document.getElementById("sessao");

        this.listaSessoes.forEach(sessao => {
            const option = document.createElement("option");
            option.value = sessao.getId();
            option.textContent = `Filme: ${sessao.getFilme().getTitulo()} | Sala: ${sessao.getSala().getNome()} | Data e Hora: ${sessao.getDataHora().replace("T", " ")}`;
            selectSessao.appendChild(option);
        });
    }

    carregarSessaoSelecionada(id){
        const selectSessao = document.getElementById("sessao");
        selectSessao.value = id;
    }

    confirmarVenda(event){
        event.preventDefault();

        const novoId = this.listaIngressos.length > 0 ? this.listaIngressos[this.listaIngressos.length - 1].id + 1 : 1;

        let sessao = document.getElementById("sessao").value;
        sessao = this.listaSessoes.find(s => s.getId() == sessao);
        const nome = document.getElementById("nome-cliente").value;
        const cpf = document.getElementById("cpf").value;
        const assento = document.getElementById("assento").value;
        const tipoPagamento = document.getElementById("tipo-pagamento").value;

        const novoIngresso = new Ingresso(novoId, sessao, nome, cpf, assento, tipoPagamento);
        this.listaIngressos.push(novoIngresso);
        localStorage.setItem("ingressos", JSON.stringify(this.listaIngressos));

        alert(`Compra de ingresso realizada com sucesso!`);
        this.form.reset();
        window.location.href = `sessoes.html`;
    }
}

export default IngressosController;

document.addEventListener("DOMContentLoaded", () => { const ingressosController = new IngressosController(); });