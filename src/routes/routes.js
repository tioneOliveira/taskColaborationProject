const connection = require("../database/connection");
const express = require("express");
const router = express.Router();
const EquipeController = require("../controllers/EquipeController");
const ColaboradoresController = require("../controllers/ColaboradoresController");
const TarefaController = require("../controllers/TarefaController");

router.post("/equipes", EquipeController.novaEquipe);
router.get("/equipes", EquipeController.listarEquipes);
router.put("/equipes/:id", EquipeController.atualizarEquipe);
router.delete("/equipes/:id", EquipeController.excluirEquipe);

router.post("/colaboradores", ColaboradoresController.novoColaborador);
router.get("/colaboradores", ColaboradoresController.listarColaboradores);
router.put("/colaboradores/:id", ColaboradoresController.atualizarColaborador);
router.delete("/colaboradores/:id", ColaboradoresController.excluirColaborador);

router.post("/tarefa", TarefaController.novaTarefa);
router.get("/tarefa", TarefaController.listarTarefas);
router.put("/tarefa/:id", TarefaController.atualizarTarefa);
router.delete("/tarefa/:id", TarefaController.excluirTarefa);

module.exports = router;
