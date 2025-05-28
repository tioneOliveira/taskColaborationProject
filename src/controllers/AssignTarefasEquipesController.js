const database = require("../database/connection");

class AssignTarefasEquipeController {
  async assignTarefasEquipe(resquest, response) {
    const { tarefaid, idequipe } = await resquest.params;

    try {
      await database
        .table("Equipe")
        .where({ IDEquipe: idequipe })
        .then((rowsAffected) => {
          if (rowsAffected.length === 0) {
            return response
              .status(404)
              .json({ error: "Equipe não encontrada!" });
          }
        });

      await database
        .table("Tarefa")
        .where({ TarefaID: tarefaid })
        .then((rowsAffected) => {
          if (rowsAffected === 0) {
            return response
              .status(404)
              .json({ error: "Tarefa não encontrada!" });
          }
        });

      await database
        .insert({ tarefaid, idequipe })
        .table("Equipe_Tarefa")
        .then((tarefaAssignedToEquipe) => {
          console.log(tarefaAssignedToEquipe);
          response
            .status(201)
            .json({ message: "Tarefa dada a equipe com sucesso!" });
        });
    } catch (error) {
      console.log("Erro ao dar tarefa a equipe!", error);
      response.status(500).json({ error: error.message });
    }
  }

  async listarAssignTarefasEquipe(request, response) {
    try {
      await database
        .select("*")
        .table("Equipe_Tarefa")
        .then((equipe_tarefa) => {
          console.log(equipe_tarefa);
          response.status(200).json(equipe_tarefa);
        });
    } catch (error) {
      console.log("Erro ao listar tarefas dadas à equipes!", error);
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AssignTarefasEquipeController();
