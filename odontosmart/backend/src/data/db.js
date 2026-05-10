const { v4: uuidv4 } = require("uuid");

const dentistas = [
  { id: "d1", nome: "Dra. Carla Mendes", especialidade: "Clínica Geral", cor: "#4f8ef7" },
  { id: "d2", nome: "Dr. Paulo Rezende", especialidade: "Endodontia", cor: "#22c9a0" },
  { id: "d3", nome: "Dra. Fernanda Lima", especialidade: "Estética Dental", cor: "#f7924f" },
];

const procedimentos = [
  { id: "p1", nome: "Limpeza", duracao: 30 },
  { id: "p2", nome: "Extração", duracao: 45 },
  { id: "p3", nome: "Clareamento", duracao: 60 },
  { id: "p4", nome: "Canal", duracao: 90 },
  { id: "p5", nome: "Restauração", duracao: 30 },
  { id: "p6", nome: "Implante", duracao: 120 },
];

let consultas = [
  {
    id: uuidv4(),
    paciente: "Ana Beatriz Costa",
    dentistaId: "d1",
    procedimentoId: "p1",
    inicio: "08:00",
    prazo: "09:00",
    data: "2025-05-10",
  },
  {
    id: uuidv4(),
    paciente: "Carlos Eduardo Silva",
    dentistaId: "d2",
    procedimentoId: "p4",
    inicio: "08:30",
    prazo: "11:00",
    data: "2025-05-10",
  },
  {
    id: uuidv4(),
    paciente: "Mariana Souza",
    dentistaId: "d3",
    procedimentoId: "p3",
    inicio: "09:00",
    prazo: "10:30",
    data: "2025-05-10",
  },
  {
    id: uuidv4(),
    paciente: "Roberto Alves",
    dentistaId: "d1",
    procedimentoId: "p2",
    inicio: "10:00",
    prazo: "11:30",
    data: "2025-05-10",
  },
  {
    id: uuidv4(),
    paciente: "Juliana Pires",
    dentistaId: "d2",
    procedimentoId: "p5",
    inicio: "11:00",
    prazo: "12:00",
    data: "2025-05-10",
  },
  {
    id: uuidv4(),
    paciente: "Fernando Castro",
    dentistaId: "d3",
    procedimentoId: "p6",
    inicio: "10:00",
    prazo: "13:00",
    data: "2025-05-10",
  },
];

module.exports = { dentistas, procedimentos, consultas };
