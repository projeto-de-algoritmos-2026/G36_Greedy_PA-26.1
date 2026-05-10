import React, { useState } from "react";
import { useConsultas } from "../hooks/useConsultas";
import FormAgendamento from "../components/FormAgendamento";
import ListaConsultas from "../components/ListaConsultas";
import PainelAlgoritmos from "../components/PainelAlgoritmos";
import Timeline from "../components/Timeline";

export default function Dashboard() {
  const hoje = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(hoje);

  const {
    consultas,
    algoritmos,
    totais,
    dentistas,
    procedimentos,
    loading,
    erro,
    agendar,
    remover,
  } = useConsultas(data);

  return (
    <div className="dashboard">
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-icon">🦷</span>
          <div>
            <h1>OdontoSmart</h1>
            <p>Sistema inteligente de agendamento odontológico</p>
          </div>
        </div>
        <div className="header-date">
          <label>Visualizar data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </div>
      </header>

      {erro && <div className="alert alert-erro">{erro}</div>}

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Consultas</div>
          <div className="stat-val">{totais?.total ?? "—"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">No prazo</div>
          <div className="stat-val ok">{totais?.noPrazo ?? "—"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">IS selecionadas</div>
          <div className="stat-val info">{algoritmos?.intervalScheduling?.totalSelecionados ?? "—"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Conflitos IS</div>
          <div className="stat-val erro">{algoritmos?.intervalScheduling?.totalConflitos ?? "—"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Atraso total</div>
          <div className="stat-val warn">{algoritmos?.minimizeLateness?.totalLateness ?? "—"} min</div>
        </div>
      </div>

      <PainelAlgoritmos algoritmos={algoritmos} totais={totais} />

      <div className="card">
        <h2 className="card-title"><span className="icon">📈</span> Timeline do dia</h2>
        {loading ? (
          <p className="carregando">Carregando...</p>
        ) : (
          <Timeline consultas={consultas} dentistas={dentistas} />
        )}
      </div>

      <div className="two-col">
        <FormAgendamento
          dentistas={dentistas}
          procedimentos={procedimentos}
          onAgendar={agendar}
        />
        <div className="card">
          <h2 className="card-title">
            <span className="icon">🗓</span> Consultas do dia
            <span className="badge-count">{consultas.length}</span>
          </h2>
          {loading ? (
            <p className="carregando">Carregando...</p>
          ) : (
            <ListaConsultas consultas={consultas} onRemover={remover} />
          )}
        </div>
      </div>
    </div>
  );
}
