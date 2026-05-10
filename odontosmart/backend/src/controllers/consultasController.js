const { v4: uuidv4 } = require("uuid");
const { consultas, dentistas, procedimentos } = require("../data/db");
const { minimizeLateness, intervalScheduling } = require("./algoritmosController");

function listarConsultas(req, res) {
  const { data } = req.query;
  const filtradas = data ? consultas.filter((c) => c.data === data) : consultas;

  const { ordenadas, totalLateness, maxLateness } = minimizeLateness(filtradas, procedimentos);
  const { selecionados, conflitos, totalSelecionados, totalConflitos } = intervalScheduling(filtradas, procedimentos);
  const selecionadosIds = new Set(selecionados.map((c) => c.id));

  const resultado = ordenadas.map((c) => {
    const dentista = dentistas.find((d) => d.id === c.dentistaId);
    const proc = procedimentos.find((p) => p.id === c.procedimentoId);
    return {
      ...c,
      dentistaNome: dentista ? dentista.nome : "—",
      dentistaCor: dentista ? dentista.cor : "#ccc",
      procedimentoNome: proc ? proc.nome : "—",
      selecionadoIS: selecionadosIds.has(c.id),
    };
  });

  res.json({
    consultas: resultado,
    algoritmos: {
      minimizeLateness: { totalLateness, maxLateness },
      intervalScheduling: { totalSelecionados, totalConflitos },
    },
    totais: {
      total: filtradas.length,
      noPrazo: ordenadas.filter((c) => c.lateness === 0).length,
    },
  });
}

function criarConsulta(req, res) {
  const { paciente, dentistaId, procedimentoId, inicio, prazo, data } = req.body;

  if (!paciente || !dentistaId || !procedimentoId || !inicio || !prazo || !data) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const dentista = dentistas.find((d) => d.id === dentistaId);
  const proc = procedimentos.find((p) => p.id === procedimentoId);

  if (!dentista) return res.status(400).json({ erro: "Dentista inválido." });
  if (!proc) return res.status(400).json({ erro: "Procedimento inválido." });

  const novaConsulta = { id: uuidv4(), paciente, dentistaId, procedimentoId, inicio, prazo, data };
  consultas.push(novaConsulta);

  res.status(201).json({ mensagem: "Consulta agendada com sucesso!", consulta: novaConsulta });
}

function deletarConsulta(req, res) {
  const { id } = req.params;
  const idx = consultas.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ erro: "Consulta não encontrada." });
  consultas.splice(idx, 1);
  res.json({ mensagem: "Consulta removida com sucesso." });
}

module.exports = { listarConsultas, criarConsulta, deletarConsulta };
