# Painel Financeiro

Projeto frontend criado com Vite + React + TypeScript localizado em `frontend/`. O dashboard oferece autenticação mock, formulários de entradas/saídas, gestão de contas a pagar, métricas consolidadas e gráfico de pizza estilizado com Tailwind CSS.

## Executando localmente

```bash
cd frontend
npm install
npm run dev
```

O servidor ficará disponível em `http://localhost:5173`.

## Principais funcionalidades

- Login com validação e persistência básica em `localStorage`.
- Contextos (`AuthContext` e `FinanceContext`) para gerenciar sessão, transações e contas a pagar.
- Formulários responsivos para registrar entradas, saídas e contas a pagar com feedback visual.
- Métricas consolidadas, cards de resumo e meta de reserva financeira com barra de progresso.
- Gráfico de pizza via `react-chartjs-2` exibindo distribuição de categorias.
- Estilização sofisticada com Tailwind CSS e layout inspirado em painéis SaaS.
- Placeholder de integração futura disponível em `src/services/transactions.ts`.

## Estrutura

```
frontend/
├── index.html
├── package.json
├── src
│   ├── App.tsx
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── styles/
└── vite.config.ts
```

Ajuste conforme necessário para integração com APIs reais ou implantação em plataformas como Vercel.
