const database = require("../database/connection");

class ColaboradoresController {
  novoColaborador(request, response) {
    const { nome, cargo, createdAt, deletedAt } = request.body;

    database
      .insert({ nome, cargo, createdAt, deletedAt })
      .table("Colaborador")
      .then((data) => {
        console.log(data);
        response.json({ message: "Colaborador inserido com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  listarColaboradores(request, response) {
    database
      .select("*")
      .table("Colaborador")
      .where({ deletedAt: null })
      .then((colaborador) => {
        console.log(colaborador);
        response.json(colaborador);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  atualizarColaborador(request, response) {
    const { id } = request.params;
    const { nome, cargo } = request.body;

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome;
    if (cargo !== undefined) dadosAtualizados.cargo = cargo;
    if (Object.keys(dadosAtualizados).length === 0) {
      return response
        .status(400)
        .json({ error: "Nenhum dado fornecido para atualização!" });
    }

    database
      .table("Colaborador")
      .where({ IDColab: id })
      .update(dadosAtualizados)
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response
            .status(404)
            .json({ error: "Colaborador não encontrado!" });
        }
        response.json({ message: "Colaborador atualizado com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao atualizar colaborador:", error);
        response.status(500).json({ error: error.message });
      });
  }

  excluirColaborador(request, response) {
    const { id } = request.params;

    database
      .table("Colaborador")
      .where({ IDColab: id })
      .update({ deletedAt: database.fn.now() })
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response
            .status(404)
            .json({ error: "Colaborador não encontrado!" });
        }
        response.json({ message: "Colaborador excluido com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao exlcuir colaborador:", error);
        response.status(500).json({ error: error.message });
      });
  }
}

module.exports = new ColaboradoresController();
