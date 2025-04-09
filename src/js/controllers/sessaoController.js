import Sessao from "../classes/sessao.js";
import Filme from "../classes/filme.js";
import Sala from "../classes/sala.js";

class SessaoController {
    constructor() {
        this.listaSessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
        this.listaSessoes = this.listaSessoes.map(sessao => Sessao.fromJSON(sessao));
        this.form = document.getElementById("form-cadastro-sessoes");
        this.tabelaSessoes = document.getElementById("tabela-sessoes");
        this.init();
    }

    init() {
        this.form.addEventListener("submit", (event) => this.cadastrarSessao(event));
        this.atualizarTabelaSessoes();
    }

    cadastrarSessao(event) {
        event.preventDefault();
        const novoId = this.listaSessoes.length > 0 ? this.listaSessoes[this.listaSessoes.length - 1].id + 1 : 1;
    
        const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
        const salas = JSON.parse(localStorage.getItem("salas")) || [];
    
        const filmeSelecionado = filmes.find(f => f.id === parseInt(document.getElementById("filme-sessao").value));
        const salaSelecionada = salas.find(s => s.id === parseInt(document.getElementById("sala-sessao").value));
    
        const novaSessao = new Sessao(
            novoId,
            Filme.fromJSON(filmeSelecionado),
            Sala.fromJSON(salaSelecionada),
            document.getElementById("data-hora").value,
            parseFloat(document.getElementById("preco").value),
            document.getElementById("idioma-sessao").value,
            document.getElementById("formato-sessao").value
        );
    
        this.listaSessoes.push(novaSessao);
        localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
        alert(`Sessão cadastrada com sucesso!`);
        this.form.reset();
        this.atualizarTabelaSessoes();
    }

    atualizarTabelaSessoes() {
        const tbody = this.tabelaSessoes.querySelector("tbody") || document.createElement("tbody");
        tbody.innerHTML = "";
        this.listaSessoes.forEach(sessao => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sessao.getId()}</td>
                <td>${sessao.getFilme().getTitulo()}</td>
                <td>${sessao.getSala().getNome()}</td>
                <td>${sessao.getDataHora().replace("T", " ")}</td>
                <td>R$ ${sessao.getPreco().toFixed(2)}</td>
                <td>${sessao.getIdioma()}</td>
                <td>${sessao.getFormato()}</td>
            `;
            const botoes = this.criarBotoes(sessao);
            const tdBotoes = document.createElement("td");
            botoes.forEach(botao => { tdBotoes.appendChild(botao); });
            tr.appendChild(tdBotoes);
            tbody.appendChild(tr);
        });
    
        if (!this.tabelaSessoes.querySelector("tbody")) {
            this.tabelaSessoes.appendChild(tbody);
        }
    }

    criarBotoes(sessao) {
        const btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.classList.add("btn", "btn-warning");
        btnEditar.addEventListener("click", () => this.editarSessao(sessao.getId()));

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "Excluir";
        btnExcluir.classList.add("btn", "btn-danger", "ms-2");
        btnExcluir.addEventListener("click", () => this.excluirSessao(sessao.getId()));

        return [btnEditar, btnExcluir];
    }

    editarSessao(id) {
        const sessao = this.listaSessoes.find(s => s.getId() === id);
    
        document.getElementById("filme-sessao").value = sessao.getFilme().getId();
        document.getElementById("sala-sessao").value = sessao.getSala().getId();
        document.getElementById("data-hora").value = sessao.getDataHora();
        document.getElementById("preco").value = sessao.getPreco();
        document.getElementById("idioma-sessao").value = sessao.getIdioma();
        document.getElementById("formato-sessao").value = sessao.getFormato();
    
        const salvarBtn = document.querySelector("button[type='submit']");
        salvarBtn.innerText = "Salvar Alterações";
        salvarBtn.classList.add("btn-warning");
    
        let cancelarBtn = document.getElementById("cancelar-edicao");
        if (!cancelarBtn) {
            cancelarBtn = document.createElement("button");
            cancelarBtn.innerText = "Cancelar";
            cancelarBtn.classList.add("btn", "btn-secondary", "ms-2");
            cancelarBtn.id = "cancelar-edicao";
    
            salvarBtn.parentNode.appendChild(cancelarBtn);
        }
    
        const salvarAlteracoes = (event) => {
            event.preventDefault();
    
            const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
            const salas = JSON.parse(localStorage.getItem("salas")) || [];
    
            const filmeSelecionado = filmes.find(f => f.id === parseInt(document.getElementById("filme-sessao").value));
            const salaSelecionada = salas.find(s => s.id === parseInt(document.getElementById("sala-sessao").value));
    
            if (!filmeSelecionado || !salaSelecionada) {
                alert("Erro ao salvar alterações: Filme ou Sala não encontrados.");
                return;
            }
    
            sessao.setFilme(Filme.fromJSON(filmeSelecionado));
            sessao.setSala(Sala.fromJSON(salaSelecionada));
            sessao.setDataHora(document.getElementById("data-hora").value);
            sessao.setPreco(parseFloat(document.getElementById("preco").value));
            sessao.setIdioma(document.getElementById("idioma-sessao").value);
            sessao.setFormato(document.getElementById("formato-sessao").value);
    
            localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
            alert(`Sessão atualizada com sucesso!`);
            this.atualizarTabelaSessoes();
    
            resetarFormulario();
        };
    
        const cancelarEdicao = () => {
            resetarFormulario();
        };
    
        const resetarFormulario = () => {
            this.form.reset();
            salvarBtn.innerText = "Salvar Sessão";
            salvarBtn.classList.remove("btn-warning");
            salvarBtn.removeEventListener("click", salvarAlteracoes);
            cancelarBtn.removeEventListener("click", cancelarEdicao);
            cancelarBtn.remove();
        };
    
        salvarBtn.addEventListener("click", salvarAlteracoes);
        cancelarBtn.addEventListener("click", cancelarEdicao);
    }

    excluirSessao(id) {
        const confirmar = confirm("Tem certeza de que deseja excluir esta sessão?");
        if (!confirmar) {
            return;
        }

        const indice = this.listaSessoes.findIndex(s => s.getId() === id);
        if (indice !== -1) {
            this.listaSessoes.splice(indice, 1);
            localStorage.setItem("sessoes", JSON.stringify(this.listaSessoes));
            alert("Sessão excluída com sucesso!");
            this.atualizarTabelaSessoes();
        }
    }
}

export default SessaoController;

document.addEventListener("DOMContentLoaded", () => { 
    const sessaoController = new SessaoController(); 
    carregarFilmes();
    carregarSalas();
});

function carregarFilmes() {
    const filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const selectFilmes = document.getElementById("filme-sessao");

    filmes.forEach(filme => {
        const option = document.createElement("option");
        option.value = filme.id;
        option.textContent = filme.titulo;
        selectFilmes.appendChild(option);
    });
}

function carregarSalas() {
    const salas = JSON.parse(localStorage.getItem("salas")) || [];
    const selectSalas = document.getElementById("sala-sessao");

    salas.forEach(sala => {
        const option = document.createElement("option");
        option.value = sala.id;
        option.textContent = sala.nome;
        selectSalas.appendChild(option);
    });
}