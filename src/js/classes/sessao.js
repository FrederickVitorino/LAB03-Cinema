class Sessao{
    constructor(id, filmeId, salaId, dataHora, preco, idioma, formato){
        this.id = id;
        this.filmeId = filmeId;
        this.salaId = salaId;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;
        this.formato = formato;
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getFilmeId() { return this.filmeId; }
    setFilmeId(filmeId) { this.filmeId = filmeId; }

    getSalaId() { return this.salaId; }
    setSalaId(salaId) { this.salaId = salaId; }

    getDataHora() { return this.dataHora; }
    setDataHora(dataHora) { this.dataHora = dataHora; }

    getPreco() { return this.preco; }
    setPreco(preco) { this.preco = preco; }

    getIdioma() { return this.idioma; }
    setIdioma(idioma) { this.idioma = idioma; }

    getFormato() { return this.formato; }
    setFormato(formato) { this.formato = formato; }
}

export default Sessao;