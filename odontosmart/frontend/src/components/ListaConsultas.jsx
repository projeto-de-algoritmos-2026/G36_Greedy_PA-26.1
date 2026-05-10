import React from "react";

function initials(nome) {
  return nome.split(" ").slice(0, 2).map((x) => x[0]).join("").toUpperCase();
}

export default function ListaConsultas({ consultas, onRemover }) {
  if (!consultas.length)
    return <p className="vazio">Nenhuma consulta agendada para este dia.</p>;

  return (
    <div className="lista-consultas">
      {consultas.map((c) => (
        <div key={c.id} className={`consulta-item ${c.selecionadoIS ? "" : "conflito"}`}>
          <div className="avatar" style={{ background: c.dentistaCor + "22", color: c.dentistaCor }}>
            {initials(c.paciente)}
          </div>
          <div className="consulta-info">
            <div className="consulta-nome">{c.paciente}</div>
            <div className="consulta-sub">
              {c.procedimentoNome} · {c.dentistaNome}
            </div>
            <div className="consulta-horario">
              {c.inicio} → {c.fimEstimado} &nbsp;|&nbsp; Prazo: {c.prazo}
            </div>
          </div>
          <div className="consulta-badges">
            {c.lateness > 0 ? (
              <span className="badge badge-erro">+{c.lateness}min atraso</span>
            ) : (
              <span className="badge badge-ok">no prazo</span>
            )}
            {c.selecionadoIS ? (
              <span className="badge badge-info">IS ✓</span>
            ) : (
              <span className="badge badge-warn">conflito IS</span>
            )}
          </div>
          <button className="btn-remover" onClick={() => onRemover(c.id)} title="Remover consulta">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
