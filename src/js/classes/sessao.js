import Filme from "./filme.js";
import Sala from "./sala.js";

class Sessao {
    constructor(id, filme, sala, dataHora, preco, idioma, formato) {
        this.id = id;
        this.filme = filme;
        this.sala = sala;
        this.dataHora = dataHora;
        this.preco = preco;
        this.idioma = idioma;
        this.formato = formato;
    }

    static fromJSON(obj) {
        return new Sessao(
            obj.id,
            Filme.fromJSON(obj.filme),
            Sala.fromJSON(obj.sala),
            obj.dataHora,
            obj.preco,
            obj.idioma,
            obj.formato
        );
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getFilme() { return this.filme; }
    setFilme(filme) { this.filme = filme; }

    getSala() { return this.sala; }
    setSala(sala) { this.sala = sala; }

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