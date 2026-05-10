import { useState, useEffect, useCallback } from "react";
import {
  getConsultas,
  criarConsulta,
  deletarConsulta,
  getDentistas,
  getProcedimentos,
} from "../services/api";

export function useConsultas(data) {
  const [consultas, setConsultas] = useState([]);
  const [algoritmos, setAlgoritmos] = useState(null);
  const [totais, setTotais] = useState(null);
  const [dentistas, setDentistas] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const [resC, resD, resP] = await Promise.all([
        getConsultas(data),
        getDentistas(),
        getProcedimentos(),
      ]);
      setConsultas(resC.data.consultas);
      setAlgoritmos(resC.data.algoritmos);
      setTotais(resC.data.totais);
      setDentistas(resD.data);
      setProcedimentos(resP.data);
    } catch (e) {
      setErro("Erro ao carregar dados. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  const agendar = async (payload) => {
    await criarConsulta(payload);
    await carregar();
  };

  const remover = async (id) => {
    await deletarConsulta(id);
    await carregar();
  };

  return {
    consultas,
    algoritmos,
    totais,
    dentistas,
    procedimentos,
    loading,
    erro,
    agendar,
    remover,
    recarregar: carregar,
  };
}
