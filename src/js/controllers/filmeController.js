import Filme from "../classes/filme.js";

class FilmeController{
    constructor(){
        this.listaFilmes = JSON.parse(localStorage.getItem("filmes")) || [];
        this.listaFilmes = this.listaFilmes.map(filme => Filme.fromJSON(filme));
        this.form = document.getElementById("form-cadastro-filmes");
        this.tabelaFilmes = document.getElementById("tabela-filmes");
        this.init();
    }

    init(){
        this.form.addEventListener("submit", (event) => this.cadastrarFilme(event));
        this.atualizarTabelaFilmes();
    }

    cadastrarFilme(event){
        event.preventDefault();
        const novoId = this.listaFilmes.length > 0 ? this.listaFilmes[this.listaFilmes.length - 1].id + 1 : 1;
    
        const titulo = document.getElementById("titulo-filme").value;
        const descricao = document.getElementById("descricao-filme").value;
        const genero = document.getElementById("genero-filme").value;
        const classificacao = document.getElementById("classificacao-filme").value;
        const duracao = parseInt(document.getElementById("duracao-filme").value);
        const dataEstreia = document.getElementById("data-estreia").value;

        const novoFilme = new Filme(novoId, titulo, descricao, genero, classificacao, duracao, dataEstreia);
    
        this.listaFilmes.push(novoFilme);
        localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
        alert(`Filme "${novoFilme.getTitulo()}" cadastrado com sucesso!`);

        document.getElementById("form-cadastro-filmes").reset();
        this.atualizarTabelaFilmes();
    }

    atualizarTabelaFilmes(){
        const tbody = this.tabelaFilmes.querySelector("tbody") || document.createElement("tbody");
        tbody.innerHTML = "";
        this.listaFilmes.forEach(filme => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${filme.getId()}</td>
                <td>${filme.getTitulo()}</td>
                <td>${filme.getGenero()}</td>
                <td>${filme.getClassificacao()}</td>
                <td>${filme.getDuracao()} min</td>
                <td>${filme.getDataEstreia()}</td>
            `;
            const botoes = this.criarBotoes(filme);
            const tdBotoes = document.createElement("td");
            botoes.forEach(botao => { tdBotoes.appendChild(botao); });
            tr.appendChild(tdBotoes);
            tbody.appendChild(tr);
        });

        if (!this.tabelaFilmes.querySelector("tbody")) {
            this.tabelaFilmes.appendChild(tbody);
        }
    }

    criarBotoes(filme){
        const btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.classList.add("btn", "btn-warning");
        btnEditar.addEventListener("click", () => this.editarFilme(filme.getId()));

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "Excluir";
        btnExcluir.classList.add("btn", "btn-danger", "ms-2");
        btnExcluir.addEventListener("click", () => this.excluirFilme(filme.getId()));

        return [btnEditar, btnExcluir];
    }

    editarFilme(id) {
        const filme = this.listaFilmes.find(f => f.getId() === id);
    
        document.getElementById("titulo-filme").value = filme.getTitulo();
        document.getElementById("descricao-filme").value = filme.getDescricao();
        document.getElementById("genero-filme").value = filme.getGenero();
        document.getElementById("classificacao-filme").value = filme.getClassificacao();
        document.getElementById("duracao-filme").value = filme.getDuracao();
        document.getElementById("data-estreia").value = filme.getDataEstreia();
    
        const salvarBtn = document.querySelector("button[type='submit']");
        salvarBtn.innerText = "Salvar Alterações";
        salvarBtn.classList.add("btn-warning");

        let cancelarBtn = document.getElementById("cancelar-edicao");
        if(!cancelarBtn){ 
            cancelarBtn = document.createElement("button");
            cancelarBtn.innerText = "Cancelar";
            cancelarBtn.classList.add("btn", "btn-secondary", "ms-2");
            cancelarBtn.id = "cancelar-edicao";

            salvarBtn.parentNode.appendChild(cancelarBtn);
        }
    
        const salvarAlteracoes = (event) => {
            event.preventDefault();
    
            filme.setTitulo(document.getElementById("titulo-filme").value);
            filme.setDescricao(document.getElementById("descricao-filme").value);
            const generoSelect = document.getElementById("genero-filme");
            filme.setGenero(generoSelect.options[generoSelect.selectedIndex].value);
            filme.setClassificacao(document.getElementById("classificacao-filme").value);
            filme.setDuracao(parseInt(document.getElementById("duracao-filme").value));
            filme.setDataEstreia(document.getElementById("data-estreia").value);
    
            localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
            alert(`Filme "${filme.getTitulo()}" atualizado com sucesso!`);
            this.atualizarTabelaFilmes();
    
            resetarFormulario();
        };

        const cancelarEdicao = () => {
            resetarFormulario();
        };

        const resetarFormulario = () => {
            document.getElementById("form-cadastro-filmes").reset();
            salvarBtn.innerText = "Salvar Filme";
            salvarBtn.classList.remove("btn-warning");
            salvarBtn.removeEventListener("click", salvarAlteracoes);
            cancelarBtn.removeEventListener("click", cancelarEdicao);
            cancelarBtn.remove();
        };
    
        salvarBtn.addEventListener("click", salvarAlteracoes);
        cancelarBtn.addEventListener("click", cancelarEdicao);
    }

    excluirFilme(id){
        const confirmar = confirm("Tem certeza de que deseja excluir este filme?");
        if (!confirmar) {
            return;
        }

        const indice = this.listaFilmes.findIndex(f => f.getId() === id);
        if(indice !== -1){
            this.listaFilmes.splice(indice, 1);
            localStorage.setItem("filmes", JSON.stringify(this.listaFilmes));
            alert("Filme excluído com sucesso!");
            this.atualizarTabelaFilmes();
        }
    }
}

export default FilmeController;

document.addEventListener("DOMContentLoaded", () => { const filmeController = new FilmeController(); });