import React from "react";

export default function PainelAlgoritmos({ algoritmos, totais }) {
  if (!algoritmos || !totais) return null;
  const { minimizeLateness: ml, intervalScheduling: is } = algoritmos;

  return (
    <div className="algo-panels">
      <div className="algo-card">
        <div className="algo-header">
          <span className="algo-icon">⏱</span>
          <div>
            <div className="algo-titulo">Minimize Lateness</div>
            <div className="algo-desc">Ordena por prazo mais apertado primeiro</div>
          </div>
        </div>
        <div className="algo-stats">
          <div className="algo-stat">
            <span className="algo-stat-label">No prazo</span>
            <span className="algo-stat-val ok">{totais.noPrazo}/{totais.total}</span>
          </div>
          <div className="algo-stat">
            <span className="algo-stat-label">Atraso total</span>
            <span className="algo-stat-val warn">{ml.totalLateness} min</span>
          </div>
          <div className="algo-stat">
            <span className="algo-stat-label">Pior atraso</span>
            <span className="algo-stat-val erro">{ml.maxLateness} min</span>
          </div>
        </div>
      </div>

      <div className="algo-card">
        <div className="algo-header">
          <span className="algo-icon">📊</span>
          <div>
            <div className="algo-titulo">Interval Scheduling</div>
            <div className="algo-desc">Máximo de consultas sem conflito por dentista</div>
          </div>
        </div>
        <div className="algo-stats">
          <div className="algo-stat">
            <span className="algo-stat-label">Selecionadas</span>
            <span className="algo-stat-val ok">{is.totalSelecionados}</span>
          </div>
          <div className="algo-stat">
            <span className="algo-stat-label">Com conflito</span>
            <span className="algo-stat-val erro">{is.totalConflitos}</span>
          </div>
          <div className="algo-stat">
            <span className="algo-stat-label">Aproveitamento</span>
            <span className="algo-stat-val info">
              {totais.total > 0
                ? Math.round((is.totalSelecionados / totais.total) * 100)
                : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
