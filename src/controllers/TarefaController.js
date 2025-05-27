const database = require("../database/connection");

class TarefaController {
  novaTarefa(request, response) {
    const { nome, descricao, statusTarefa, startTask, deadline } = request.body;

    database
      .insert({ nome, descricao, statusTarefa, startTask, deadline })
      .table("Tarefa")
      .then((tarefa) => {
        console.log(tarefa);
        response.json({ message: "Tarefa criada com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  listarTarefas(request, response) {
    database
      .select("*")
      .table("Tarefa")
      .where({ deletedAt: null })
      .then((tarefas) => {
        console.log(tarefas);
        response.json(tarefas);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  atualizarTarefa(request, response) {
    const { id } = request.params;
    const { nome, descricao, statusTarefa, startTask, deadline } = request.body;

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome;
    if (descricao) dadosAtualizados.descricao = descricao;
    if (statusTarefa) dadosAtualizados.statusTarefa = statusTarefa;
    if (startTask) dadosAtualizados.startTask = startTask;
    if (deadline) dadosAtualizados.deadline = deadline;
    if (Object.keys(dadosAtualizados).length === 0) {
      return response
        .status(400)
        .json({ error: "Nenhum dado fornecido para atualização!" });
    }

    database
      .table("Tarefa")
      .where({ TarefaID: id })
      .update(dadosAtualizados)
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response.status(404).json({ error: "Tarefa não encontrada!" });
        }
        response.json({ message: "Tarefa atualizada com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao atualizar tarefa:", error);
        response.status(500).json({ error: error.message });
      });
  }

  excluirTarefa(request, response) {
    const { id } = request.params;

    database
      .table("Tarefa")
      .where({ TarefaID: id })
      .update({ deletedAt: database.fn.now() })
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response.status(404).json({ error: "Tarefa não encontrada!" });
        }
        response.json({ message: "Tarefa excluida com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao exlcuir tarefa:", error);
        response.status(500).json({ error: error.message });
      });
  }
}

module.exports = new TarefaController();
