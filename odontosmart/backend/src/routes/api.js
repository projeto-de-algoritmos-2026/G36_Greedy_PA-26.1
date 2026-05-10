const express = require("express");
const router = express.Router();
const { listarConsultas, criarConsulta, deletarConsulta } = require("../controllers/consultasController");
const { dentistas, procedimentos } = require("../data/db");

router.get("/consultas", listarConsultas);
router.post("/consultas", criarConsulta);
router.delete("/consultas/:id", deletarConsulta);

router.get("/dentistas", (req, res) => res.json(dentistas));
router.get("/procedimentos", (req, res) => res.json(procedimentos));

module.exports = router;
