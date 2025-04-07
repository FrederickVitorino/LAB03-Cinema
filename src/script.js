function cadastrarFilme(event){
    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const novoId = filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1;

    const novoFilme = {
        id: novoId,
        titulo: document.getElementById("titulo-filme").value,
        descricao: document.getElementById("descricao-filme").value,
        genero: document.getElementById("genero-filme").value,
        classificacao: document.getElementById("classificacao-filme").value,
        duracao: document.getElementById("duracao-filme").value,
        dataEstreia: document.getElementById("data-estreia").value
    };

    filmes.push(novoFilme);
    localStorage.setItem("filmes", JSON.stringify(filmes));
    alert(`Filme "${novoFilme.titulo}" cadastrado com sucesso!`);
}