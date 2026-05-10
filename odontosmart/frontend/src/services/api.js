import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getConsultas = (data) =>
  api.get("/consultas", { params: data ? { data } : {} });

export const criarConsulta = (payload) =>
  api.post("/consultas", payload);

export const deletarConsulta = (id) =>
  api.delete(`/consultas/${id}`);

export const getDentistas = () => api.get("/dentistas");
export const getProcedimentos = () => api.get("/procedimentos");
