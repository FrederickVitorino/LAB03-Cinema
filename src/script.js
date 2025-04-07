function cadastrarFilme(event){
    event.preventDefault();
    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    const novoId = filmes.length > 0 ? filmes[filmes.length - 1].id + 1 : 1;

    const novoFilme = {
        id: novoId,
        titulo: document.getElementById("titulo-filme").value,
        descricao: document.getElementById("descricao-filme").value,
        genero: document.getElementById("genero-filme").value,
        classificacao: document.getElementById("classificacao-filme").value,
        duracao: parseInt(document.getElementById("duracao-filme").value),
        dataEstreia: document.getElementById("data-estreia").value
    };

    filmes.push(novoFilme);
    localStorage.setItem("filmes", JSON.stringify(filmes));
    alert(`Filme "${novoFilme.titulo}" cadastrado com sucesso!`);
    document.getElementById("form-cadastro-filmes").reset();
}

function cadastrarSala(event){
    event.preventDefault();
    let salas = JSON.parse(localStorage.getItem("salas")) || [];
    const novoId = salas.length > 0 ? salas[salas.length - 1].id + 1 : 1;

    const novaSala = {
        id: novoId,
        nome: document.getElementById("nome-sala").value,
        capacidade: parseInt(document.getElementById("capacidade").value),
        tipo: document.getElementById("tipo-sala").value
    };

    salas.push(novaSala);
    localStorage.setItem("salas", JSON.stringify(salas));
    alert(`Sala "${novaSala.nome}" cadastrada com sucesso!`);
    document.getElementById("form-cadastro-salas").reset();
}

function cadastrarSessao(event){
    event.preventDefault();
    let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];
    const novoId = sessoes.length > 0 ? sessoes[sessoes.length - 1].id + 1 : 1;

    const novaSessao = {
        id: novoId,
        filmeId: parseInt(document.getElementById("filme-sessao").value),
        salaId: parseInt(document.getElementById("sala-sessao").value),
        dataHora: document.getElementById("data-hora").value,
        preco: parseFloat(document.getElementById("preco").value),
        idioma: document.getElementById("idioma-sessao").value,
        formato: document.getElementById("formato-sessao").value
    };

    sessoes.push(novaSessao);
    localStorage.setItem("sessoes", JSON.stringify(sessoes));
    alert(`Sessão cadastrada com sucesso!`);
    document.getElementById("form-cadastro-sessoes").reset();
}

function show(){ //Função temporária para mostrar os dados salvos no localStorage
    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    let salas = JSON.parse(localStorage.getItem("salas")) || [];
    let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    console.log(filmes);
    console.log(salas);
    console.log(sessoes);
}