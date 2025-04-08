function cadastrarSala(event){ //passar função para o devido controller
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

function cadastrarSessao(event){ //passar função para o devido controller
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