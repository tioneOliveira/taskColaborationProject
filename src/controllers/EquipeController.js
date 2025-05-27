const database = require("../database/connection");

class EquipeController {
  novaEquipe(request, response) {
    const { nome, createdAt, deletedAt } = request.body;

    database
      .insert({ nome, createdAt, deletedAt })
      .table("Equipe")
      .then((data) => {
        console.log(data);
        response.json({ message: "Equipe criada com sucesso!" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  listarEquipes(request, response) {
    database
      .select("*")
      .table("Equipe")
      .then((equipes) => {
        console.log(equipes);
        response.json(equipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  atualizarEquipe(request, response) {
    const { id } = request.params;
    const { nome } = request.body;

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome;
    if (Object.keys(dadosAtualizados).length === 0) {
      return response
        .status(400)
        .json({ error: "Nenhum dado fornecido para atualização!" });
    }

    database
      .table("Equipe")
      .where({ IDEquipe: id })
      .update(dadosAtualizados)
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response.status(404).json({ error: "Equipe não encontrada!" });
        }
        response.json({ message: "Equipe atualizada com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao atualizar equipe:", error);
        response.status(500).json({ error: error.message });
      });
  }

  excluirEquipe(request, response) {
    const { id } = request.params;

    database
      .table("Equipe")
      .where({ IDEquipe: id })
      .update({ deletedAt: database.fn.now() })
      .then((rowsAffected) => {
        if (rowsAffected === 0) {
          return response.status(404).json({ error: "Equipe não encontrada!" });
        }
        response.json({ message: "Equipe excluida com sucesso!" });
      })
      .catch((error) => {
        console.log("Erro ao exlcuir equipe:", error);
        response.status(500).json({ error: error.message });
      });
  }
}

module.exports = new EquipeController();
