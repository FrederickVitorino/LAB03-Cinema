class Filme{
    constructor(id, titulo, descricao, genero, classificacao, duracao, dataEstreia, imagem){
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.genero = genero;
        this.classificacao = classificacao;
        this.duracao = duracao;
        this.dataEstreia = dataEstreia;
        this.imagem = imagem;
    }

    static fromJSON(obj) {
        return new Filme(
            obj.id,
            obj.titulo,
            obj.descricao,
            obj.genero,
            obj.classificacao,
            obj.duracao,
            obj.dataEstreia,
            obj.imagem
        );
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getTitulo() { return this.titulo; }
    setTitulo(titulo) { this.titulo = titulo; }

    getImagem() { return this.imagem; }
    setImagem(imagem) { this.imagem = imagem; }

    getDescricao() { return this.descricao; }
    setDescricao(descricao) { this.descricao = descricao; }

    getGenero() { return this.genero; }
    setGenero(genero) { this.genero = genero; }

    getClassificacao() { return this.classificacao; }
    setClassificacao(classificacao) { this.classificacao = classificacao; }

    getDuracao() { return this.duracao; }
    setDuracao(duracao) { this.duracao = duracao; }
    
    getDataEstreia() { return this.dataEstreia; }
    setDataEstreia(dataEstreia) { this.dataEstreia = dataEstreia; }
}

export default Filme;