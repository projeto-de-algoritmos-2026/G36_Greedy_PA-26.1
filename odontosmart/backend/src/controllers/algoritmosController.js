function toMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Minimize Lateness: ordena por prazo crescente
// Garante que quem tem prazo mais apertado seja atendido primeiro
function minimizeLateness(consultas, procedimentos) {
  const enriched = consultas.map((c) => {
    const proc = procedimentos.find((p) => p.id === c.procedimentoId);
    const duracao = proc ? proc.duracao : 30;
    const fimMin = toMin(c.inicio) + duracao;
    const prazoMin = toMin(c.prazo);
    const lateness = Math.max(0, fimMin - prazoMin);
    return { ...c, duracao, fimEstimado: toHHMM(fimMin), lateness };
  });

  const sorted = [...enriched].sort((a, b) => toMin(a.prazo) - toMin(b.prazo));
  const totalLateness = sorted.reduce((acc, c) => acc + c.lateness, 0);
  const maxLateness = Math.max(...sorted.map((c) => c.lateness));

  return { ordenadas: sorted, totalLateness, maxLateness };
}

// Interval Scheduling: seleciona o máximo de consultas sem sobreposição por dentista
// Critério greedy: escolhe a consulta que termina mais cedo
function intervalScheduling(consultas, procedimentos) {
  const enriched = consultas.map((c) => {
    const proc = procedimentos.find((p) => p.id === c.procedimentoId);
    const duracao = proc ? proc.duracao : 30;
    const startMin = toMin(c.inicio);
    const endMin = startMin + duracao;
    return { ...c, duracao, startMin, endMin };
  });

  // Agrupa por dentista para verificar conflito por sala/profissional
  const porDentista = {};
  for (const c of enriched) {
    if (!porDentista[c.dentistaId]) porDentista[c.dentistaId] = [];
    porDentista[c.dentistaId].push(c);
  }

  const selecionadosIds = new Set();

  for (const dentistaId of Object.keys(porDentista)) {
    const lista = [...porDentista[dentistaId]].sort((a, b) => a.endMin - b.endMin);
    let lastEnd = -1;
    for (const c of lista) {
      if (c.startMin >= lastEnd) {
        selecionadosIds.add(c.id);
        lastEnd = c.endMin;
      }
    }
  }

  return {
    selecionados: enriched.filter((c) => selecionadosIds.has(c.id)),
    conflitos: enriched.filter((c) => !selecionadosIds.has(c.id)),
    totalSelecionados: selecionadosIds.size,
    totalConflitos: enriched.length - selecionadosIds.size,
  };
}

module.exports = { minimizeLateness, intervalScheduling, toMin, toHHMM };
