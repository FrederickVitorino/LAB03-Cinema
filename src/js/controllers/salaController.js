import Sala from "../classes/sala.js";

class SalaController{
    constructor(){
        this.listaSalas = JSON.parse(localStorage.getItem("salas")) || [];
        this.listaSalas = this.listaSalas.map(sala => Sala.fromJSON(sala));
        this.form = document.getElementById("form-cadastro-salas");
        this.tabelaSalas = document.getElementById("tabela-salas");
        this.init();
    }

    init(){
        this.form.addEventListener("submit", (event) => this.cadastrarSala(event));
        this.atualizarTabelaSalas();
    }

    cadastrarSala(event){
        event.preventDefault();
        const novoId = this.listaSalas.length > 0 ? this.listaSalas[this.listaSalas.length - 1].id + 1 : 1;

        const novaSala = new Sala(
            novoId,
            document.getElementById("nome-sala").value,
            parseInt(document.getElementById("capacidade").value),
            document.getElementById("tipo-sala").value
        );

        this.listaSalas.push(novaSala);
        localStorage.setItem("salas", JSON.stringify(this.listaSalas));
        alert(`Sala "${novaSala.getNome()}" cadastrada com sucesso!`);
        this.form.reset();
        this.atualizarTabelaSalas();
    }

    atualizarTabelaSalas(){
        const tbody = this.tabelaSalas.querySelector("tbody") || document.createElement("tbody");
        tbody.innerHTML = "";
        this.listaSalas.forEach(sala => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${sala.getId()}</td>
                <td>${sala.getNome()}</td>
                <td>${sala.getCapacidade()}</td>
                <td>${sala.getTipo()}</td>
            `;
            const botoes = this.criarBotoes(sala);
            const tdBotoes = document.createElement("td");
            botoes.forEach(botao => { tdBotoes.appendChild(botao); });
            tr.appendChild(tdBotoes);
            tbody.appendChild(tr);
        });

        if(!this.tabelaSalas.querySelector("tbody")){
            this.tabelaSalas.appendChild(tbody);
        }
    }

    criarBotoes(sala){
        const btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        btnEditar.classList.add("btn", "btn-warning");
        btnEditar.addEventListener("click", () => this.editarSala(sala.getId()));

        const btnExcluir = document.createElement("button");
        btnExcluir.innerText = "Excluir";
        btnExcluir.classList.add("btn", "btn-danger", "ms-2");
        btnExcluir.addEventListener("click", () => this.excluirSala(sala.getId()));

        return [btnEditar, btnExcluir];
    }

    editarSala(id){
        const sala = this.listaSalas.find(s => s.getId() === id);

        document.getElementById("nome-sala").value = sala.getNome();
        document.getElementById("capacidade").value = sala.getCapacidade();
        document.getElementById("tipo-sala").value = sala.getTipo();

        const salvarBtn = document.querySelector("button[type='submit']");
        salvarBtn.innerText = "Salvar Alterações";
        salvarBtn.classList.add("btn-warning");

        let cancelarBtn = document.getElementById("cancelar-edicao");
        if(!cancelarBtn){
            cancelarBtn = document.createElement("button");
            cancelarBtn.innerText = "Cancelar";
            cancelarBtn.classList.add("btn", "btn-secondary", "ms-2");
            cancelarBtn.id = "cancelar-edicao";

            salvarBtn.parentNode.appendChild(cancelarBtn);
        }

        const salvarAlteracoes = (event) => {
            event.preventDefault();

            sala.setNome(document.getElementById("nome-sala").value);
            sala.setCapacidade(parseInt(document.getElementById("capacidade").value));
            sala.setTipo(document.getElementById("tipo-sala").value);

            localStorage.setItem("salas", JSON.stringify(this.listaSalas));
            alert(`Sala "${sala.getNome()}" atualizada com sucesso!`);
            this.atualizarTabelaSalas();

            resetarFormulario();
        };

        const cancelarEdicao = () => {
            resetarFormulario();
        };

        const resetarFormulario = () => {
            this.form.reset();
            salvarBtn.innerText = "Salvar Sala";
            salvarBtn.classList.remove("btn-warning");
            salvarBtn.removeEventListener("click", salvarAlteracoes);
            cancelarBtn.removeEventListener("click", cancelarEdicao);
            cancelarBtn.remove();
        };

        salvarBtn.addEventListener("click", salvarAlteracoes);
        cancelarBtn.addEventListener("click", cancelarEdicao);
    }

    excluirSala(id){
        const confirmar = confirm("Tem certeza de que deseja excluir esta sala?");
        if(!confirmar){
            return;
        }

        const indice = this.listaSalas.findIndex(s => s.getId() === id);
        if(indice !== -1){
            this.listaSalas.splice(indice, 1);
            localStorage.setItem("salas", JSON.stringify(this.listaSalas));
            alert("Sala excluída com sucesso!");
            this.atualizarTabelaSalas();
        }
    }
}

export default SalaController;

document.addEventListener("DOMContentLoaded", () => { const salaController = new SalaController(); });