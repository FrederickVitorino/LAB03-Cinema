function show(){ //Função temporária para mostrar os dados salvos no localStorage
    let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
    let salas = JSON.parse(localStorage.getItem("salas")) || [];
    let sessoes = JSON.parse(localStorage.getItem("sessoes")) || [];

    console.log(filmes);
    console.log(salas);
    console.log(sessoes);
}