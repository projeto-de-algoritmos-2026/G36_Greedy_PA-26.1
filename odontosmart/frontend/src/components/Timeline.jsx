import React from "react";

const DAY_START = 8 * 60;
const DAY_END = 18 * 60;
const DAY_DUR = DAY_END - DAY_START;

function toMin(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export default function Timeline({ consultas, dentistas }) {
  const horas = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <div className="tl-label-col" />
        <div className="tl-track">
          {horas.map((h) => (
            <span
              key={h}
              className="tl-hora"
              style={{ left: `${((h * 60 - DAY_START) / DAY_DUR) * 100}%` }}
            >
              {h}h
            </span>
          ))}
        </div>
      </div>

      {dentistas.map((d) => {
        const dCons = consultas.filter((c) => c.dentistaId === d.id);
        return (
          <div key={d.id} className="tl-row">
            <div className="tl-label-col">
              <span className="tl-dentista-nome">{d.nome.split(" ").slice(1).join(" ")}</span>
            </div>
            <div className="tl-track tl-track-row">
              {dCons.map((c) => {
                const start = toMin(c.inicio) - DAY_START;
                const dur = c.duracao || 30;
                const left = (start / DAY_DUR) * 100;
                const width = (dur / DAY_DUR) * 100;
                return (
                  <div
                    key={c.id}
                    className={`tl-bar ${c.selecionadoIS ? "" : "tl-bar-conflito"}`}
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      background: c.dentistaCor + (c.selecionadoIS ? "33" : "15"),
                      borderColor: c.dentistaCor,
                      color: c.dentistaCor,
                    }}
                    title={`${c.paciente} · ${c.procedimentoNome} · ${c.inicio}–${c.fimEstimado}`}
                  >
                    {c.paciente.split(" ")[0]}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
