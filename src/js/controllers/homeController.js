import Filme from "../classes/filme.js";

class HomeController {
    constructor() {
        this.listaFilmes = JSON.parse(localStorage.getItem("filmes")) || [];
        this.listaFilmes = this.listaFilmes.map(filme => Filme.fromJSON(filme));
        this.containerFilmes = document.getElementById("container-filmes");
    }

    exibirFilmes() {
        this.listaFilmes.forEach(filme => {
            const col = document.createElement("div");
            col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");

            const imagemSrc = filme.imagem.startsWith("data:")
                ? filme.imagem
                : `data:image/jpeg;base64,${filme.imagem}`;

            col.innerHTML = `
                <div class="card h-100 text-dark">
                    <img src="${imagemSrc}" class="card-img-top" alt="${filme.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <p class="card-text">${filme.descricao}</p>
                    </div>
                </div>
            `;

            this.containerFilmes.appendChild(col);
        });
    }
}

export default HomeController;

document.addEventListener("DOMContentLoaded", () => {
    const homeController = new HomeController();
    homeController.exibirFilmes();
});
