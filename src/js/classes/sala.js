class Sala{
    constructor(id, nome, capacidade, tipo){
        this.id = id;
        this.nome = nome;
        this.capacidade = capacidade;
        this.tipo = tipo;
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getNome() { return this.nome; }
    setNome(nome) { this.nome = nome; }

    getCapacidade() { return this.capacidade; }
    setCapacidade(capacidade) { this.capacidade = capacidade; }

    getTipo() { return this.tipo; }
    setTipo(tipo) { this.tipo = tipo; }
}

export default Sala;