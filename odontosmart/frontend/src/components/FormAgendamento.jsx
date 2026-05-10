import React, { useState, useEffect } from "react";

export default function FormAgendamento({ dentistas, procedimentos, onAgendar }) {
  const hoje = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    paciente: "",
    dentistaId: "",
    procedimentoId: "",
    inicio: "09:00",
    prazo: "10:00",
    data: hoje,
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dentistas.length > 0 && procedimentos.length > 0) {
      setForm((f) => ({
        ...f,
        dentistaId: f.dentistaId || dentistas[0].id,
        procedimentoId: f.procedimentoId || procedimentos[0].id,
      }));
    }
  }, [dentistas, procedimentos]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    if (!form.paciente.trim()) return setErro("Informe o nome do paciente.");
    if (form.prazo <= form.inicio) return setErro("O prazo deve ser após o horário de início.");
    setLoading(true);
    try {
      await onAgendar(form);
      setSucesso("Consulta agendada com sucesso!");
      setForm((f) => ({ ...f, paciente: "", inicio: "09:00", prazo: "10:00" }));
    } catch {
      setErro("Erro ao agendar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <span className="icon">📅</span> Nova consulta
      </h2>
      {erro && <div className="alert alert-erro">{erro}</div>}
      {sucesso && <div className="alert alert-sucesso">{sucesso}</div>}
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label>Paciente</label>
          <input type="text" value={form.paciente} onChange={set("paciente")} placeholder="Nome completo" />
        </div>
        <div className="form-group">
          <label>Data</label>
          <input type="date" value={form.data} onChange={set("data")} />
        </div>
        <div className="form-group">
          <label>Dentista</label>
          <select value={form.dentistaId} onChange={set("dentistaId")}>
            {dentistas.map((d) => (
              <option key={d.id} value={d.id}>{d.nome} — {d.especialidade}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Procedimento</label>
          <select value={form.procedimentoId} onChange={set("procedimentoId")}>
            {procedimentos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome} ({p.duracao} min)</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Início</label>
          <input type="time" value={form.inicio} onChange={set("inicio")} min="08:00" max="17:30" />
        </div>
        <div className="form-group">
          <label>Prazo máximo</label>
          <input type="time" value={form.prazo} onChange={set("prazo")} />
        </div>
        <div className="form-group full">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Agendando..." : "Agendar consulta"}
          </button>
        </div>
      </form>
    </div>
  );
}
