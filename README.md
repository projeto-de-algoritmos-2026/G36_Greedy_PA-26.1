# OdontoSmart

Número da Lista: 36
Conteúdo da Disciplina: Algoritmos Greedy (Projeto de Algoritmos)

## Alunos

| Matrícula  | Aluno                              |
| ---------- | ---------------------------------- |
| 231026616  | Davi Emanuel Ribeiro de Oliveira   |
| 231026330          | Felipe Lopes Pedroza               |

## Sobre

Sistema web desenvolvido para gerenciamento inteligente de agendamento odontológico utilizando **algoritmos greedy** de otimização. O projeto implementa duas estratégias principais: **Minimize Lateness** para ordenação eficiente de consultas por prazo e **Interval Scheduling** para detecção e resolução de conflitos de agendamento.

**Stack:**
- **Frontend:** React.js
- **Backend:** Node.js com Express
- **API:** RESTful com JSON

## Screenshots

![Print do OdontoSmart](/odontosmart/assets/dashboard.png)

## Vídeo

https://youtu.be/4GEj9lRNCsg

## Instalação

Linguagens: **JavaScript (Node.js)** e **React**

### Pré-requisitos

* Node.js v16+ instalado
* npm (Node Package Manager)
* Git
* Terminal ou prompt de comando

### Instalação e Execução

#### 1. Clonar o repositório

```bash
git clone https://github.com/projeto-de-algoritmos-2026/G36_Greedy_PA-26.1.git
cd G36_Greedy_PA-26.1/odontosmart
```

#### 2. Instalar e rodar Backend

```bash
cd backend
npm install
npm start
```

O servidor estará disponível em `http://localhost:3001`

#### 3. Instalar e rodar Frontend (em outro terminal)

```bash
cd frontend
npm install
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## Funcionalidades

### Sistema de Agendamento

* ✅ Criar, listar e deletar consultas
* ✅ Seleção de dentista e procedimento
* ✅ Validação de horários
* ✅ Persistência de dados em memória

### Algoritmo: Minimize Lateness (⏱)

Ordena as consultas pelo prazo mais apertado primeiro, minimizando o atraso máximo:

* **Ordenação:** Por prazo crescente
* **Objetivo:** Minimizar lateness (atraso)
* **Métrica:** Total de atrasos + Pior atraso individual
* **Entrada:** Lista de consultas com horário de início, duração e prazo

**Exemplo:**
- Consulta A: 09:00 → 09:30, prazo 10:00 (lateness = 0)
- Consulta B: 14:00 → 15:30, prazo 15:00 (lateness = 30 min)
- Ordenação: A → B (prazo A é menor)

### Algoritmo: Interval Scheduling (📊)

Seleciona o máximo de consultas sem conflito por dentista:

* **Estratégia:** Greedy por tempo de término
* **Objetivo:** Maximizar aproveitamento
* **Métrica:** Consultas selecionadas vs. conflitos
* **Entrada:** Lista de consultas com horários de início e fim

**Exemplo:**
- Consulta A: 09:00 → 09:30 (dentista 1) ✓ selecionada
- Consulta B: 09:15 → 10:00 (dentista 1) ✗ conflito
- Consulta C: 09:30 → 10:00 (dentista 1) ✓ selecionada

### Dashboard

* 📊 Painel de métricas em tempo real
* 📈 Timeline visual por dentista
* 🗓️ Lista de consultas do dia
* 📋 Estatísticas dos algoritmos

## Estrutura do Projeto

```
odontosmart/
├── backend/
│   ├── src/
│   │   ├── server.js                    # Servidor Express
│   │   ├── routes/
│   │   │   └── api.js                   # Rotas da API
│   │   ├── controllers/
│   │   │   ├── consultasController.js   # Lógica de consultas
│   │   │   └── algoritmosController.js  # Algoritmos Greedy
│   │   └── data/
│   │       └── db.js                    # Dados em memória
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                       # Componente principal
│   │   ├── pages/
│   │   │   └── Dashboard.jsx            # Página principal
│   │   ├── components/
│   │   │   ├── FormAgendamento.jsx      # Formulário
│   │   │   ├── ListaConsultas.jsx       # Lista de consultas
│   │   │   ├── PainelAlgoritmos.jsx     # Painel de algoritmos
│   │   │   └── Timeline.jsx             # Timeline visual
│   │   ├── hooks/
│   │   │   └── useConsultas.js          # Hook customizado
│   │   ├── services/
│   │   │   └── api.js                   # Cliente HTTP (Axios)
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Consultas

**GET** `/api/consultas` - Listar consultas (com query param `?data=YYYY-MM-DD`)
```json
{
  "consultas": [...],
  "algoritmos": {
    "minimizeLateness": { "totalLateness": 0, "maxLateness": 0 },
    "intervalScheduling": { "totalSelecionados": 1, "totalConflitos": 2 }
  },
  "totais": { "total": 3, "noPrazo": 3 }
}
```

**POST** `/api/consultas` - Criar consulta
```json
{
  "paciente": "João Silva",
  "dentistaId": "d1",
  "procedimentoId": "p1",
  "inicio": "09:00",
  "prazo": "10:00",
  "data": "2026-05-10"
}
```

**DELETE** `/api/consultas/:id` - Deletar consulta

### Dados

**GET** `/api/dentistas` - Listar dentistas

**GET** `/api/procedimentos` - Listar procedimentos

## Dentistas

| ID  | Nome                     | Especialidade      | Cor      |
| --- | ------------------------ | ------------------ | -------- |
| d1  | Dra. Carla Mendes        | Clínica Geral      | #4f8ef7  |
| d2  | Dr. Paulo Rezende        | Endodontia         | #22c9a0  |
| d3  | Dra. Fernanda Lima       | Estética Dental    | #f7924f  |

## Procedimentos

| ID  | Nome           | Duração |
| --- | -------------- | ------- |
| p1  | Limpeza        | 30 min  |
| p2  | Extração       | 45 min  |
| p3  | Clareamento    | 60 min  |
| p4  | Canal          | 90 min  |
| p5  | Restauração    | 30 min  |
| p6  | Implante       | 120 min |

## Conceitos Importantes

**Lateness:** Atraso na conclusão de uma tarefa em relação ao seu prazo.
- lateness = max(0, tempo_fim - prazo)

**Conflito (Interval Scheduling):** Sobreposição de horários para o mesmo dentista.

**Greedy:** Abordagem que faz escolhas localmente ótimas em cada passo.

## Tecnologias Utilizadas

### Frontend

- **React 18.2.0** - UI Framework
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

### Backend

- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **CORS** - Cross-Origin Resource Sharing
- **UUID** - Geração de IDs únicos

## Observações

* Dados armazenados em memória (não persistem entre reinicializações)
* Capacidade de até 100+ consultas simultâneas
* Interface responsiva para dispositivos móveis
* Validações client-side e server-side
* Algoritmos executados em tempo real a cada operação

## Contribuidores

- **Davi Emanuel Ribeiro de Oliveira** (231026616)
- **Felipe Lopes Pedroza**

---

**Universidade de Brasília (UnB)**  
**Disciplina:** Projeto de Algoritmos (2026/1)
