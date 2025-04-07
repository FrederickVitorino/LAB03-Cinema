import Filme from "../classes/filme.js";

class FilmeController{
    constructor(){
        this.listaFilmes = JSON.parse(localStorage.getItem("filmes")) || [];
        this.form = document.getElementById("form-cadastro-filmes");
        this.init();
    }

    init(){
        this.form.addEventListener("submit", (event) => this.cadastrarFilme(event));
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
    }
}

export default FilmeController;

document.addEventListener("DOMContentLoaded", () => { const filmeController = new FilmeController(); });