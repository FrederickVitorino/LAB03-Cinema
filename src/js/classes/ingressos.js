import Sessao from "../classes/sessao.js";

class Ingresso{
    constructor(id, sessao, nomeCliente, cpfCliente, assento, pagamento){
        this.id = id;
        this.sessao = sessao;
        this.nomeCliente = nomeCliente;
        this.cpfCliente = cpfCliente;
        this.assento = assento;
        this.pagamento = pagamento;
    }

    static fromJSON(obj){
        return new Ingresso(
            obj.id, 
            Sessao.fromJSON(obj.sessao), 
            obj.nomeCliente, 
            obj.cpfCliente, 
            obj.assento, 
            obj.pagamento
        );
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getSessao() { return this.sessao; }
    setSessao(sessao) { this.sessao = sessao; }

    getNomeCliente() { return this.nomeCliente; }
    setNomeCliente(nomeCliente) { this.nomeCliente = nomeCliente; }

    getCpfCliente() { return this.cpfCliente; }
    setCpfCliente(cpfCliente) { this.cpfCliente = cpfCliente; }

    getAssento() { return this.assento; }
    setAssento(assento) { this.assento = assento; }

    getPagamento() { return this.pagamento; }
    setPagamento(pagamento) { this.pagamento = pagamento; }
}

export default Ingresso;