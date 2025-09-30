import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";

import { Payable, TransactionType, useFinance } from "../context/FinanceContext";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionFormState = {
  amount: string;
  description: string;
  category: string;
  counterparty: string;
  date: string;
};

type PayableFormState = {
  description: string;
  amount: string;
  dueDate: string;
  counterparty: string;
};

const transactionInitialState: TransactionFormState = {
  amount: "",
  description: "",
  category: "",
  counterparty: "",
  date: new Date().toISOString().slice(0, 10)
};

const payableInitialState: PayableFormState = {
  description: "",
  amount: "",
  dueDate: new Date().toISOString().slice(0, 10),
  counterparty: ""
};

const categories = [
  "Assinaturas",
  "Folha de pagamento",
  "Marketing",
  "Receita recorrente",
  "Serviços",
  "Investimentos",
  "Infraestrutura"
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const Dashboard = () => {
  const {
    transactions,
    payables,
    addTransaction,
    addPayable,
    togglePayableStatus,
    metrics,
    reserveBalance,
    savingsTarget,
    updateSavingsTarget
  } = useFinance();

  const [incomeForm, setIncomeForm] = useState<TransactionFormState>(transactionInitialState);
  const [expenseForm, setExpenseForm] = useState<TransactionFormState>(transactionInitialState);
  const [payableForm, setPayableForm] = useState<PayableFormState>(payableInitialState);
  const [formError, setFormError] = useState<string | null>(null);

  const handleTransactionSubmit = (
    event: FormEvent<HTMLFormElement>,
    type: TransactionType,
    formState: TransactionFormState,
    setState: (state: TransactionFormState) => void
  ) => {
    event.preventDefault();
    setFormError(null);

    const amount = Number(formState.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      setFormError("Informe um valor numérico positivo para a transação.");
      return;
    }

    if (!formState.description.trim() || !formState.category.trim() || !formState.counterparty.trim()) {
      setFormError("Descrição, categoria e origem/destino são obrigatórias.");
      return;
    }

    addTransaction({
      type,
      amount,
      description: formState.description.trim(),
      category: formState.category.trim(),
      counterparty: formState.counterparty.trim(),
      date: formState.date
    });

    setState({ ...transactionInitialState, date: formState.date });
  };

  const handlePayableSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const amount = Number(payableForm.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      setFormError("Informe um valor numérico positivo para a conta a pagar.");
      return;
    }

    if (!payableForm.description.trim() || !payableForm.counterparty.trim()) {
      setFormError("Descrição e fornecedor são obrigatórios.");
      return;
    }

    addPayable({
      description: payableForm.description.trim(),
      amount,
      counterparty: payableForm.counterparty.trim(),
      dueDate: payableForm.dueDate
    });

    setPayableForm({ ...payableInitialState, dueDate: payableForm.dueDate });
  };

  const incomeData = useMemo(
    () => metrics.categories.filter((category) => category.type === "income"),
    [metrics.categories]
  );

  const expenseData = useMemo(
    () => metrics.categories.filter((category) => category.type === "expense"),
    [metrics.categories]
  );

  const pieChartData = useMemo(() => {
    if (!metrics.categories.length) {
      return {
        labels: ["Sem dados"],
        datasets: [
          {
            label: "Movimentações",
            data: [1],
            backgroundColor: ["#1F2937"],
            borderColor: ["#1F2937"],
            borderWidth: 2
          }
        ]
      };
    }

    const labels = [
      ...incomeData.map((item) => `Entrada · ${item.label}`),
      ...expenseData.map((item) => `Saída · ${item.label}`)
    ];
    const data = [...incomeData.map((item) => item.value), ...expenseData.map((item) => item.value)];
    const backgroundColor = [
      "#1F3C88",
      "#335BBF",
      "#F9A620",
      "#5CB8E4",
      "#00C49A",
      "#F55353",
      "#8C54FF",
      "#F59E0B"
    ];

    return {
      labels,
      datasets: [
        {
          label: "Movimentações",
          data,
          backgroundColor,
          borderColor: backgroundColor,
          borderWidth: 2
        }
      ]
    };
  }, [incomeData, expenseData, metrics.categories]);

  const nextPayables = useMemo(() => {
    return [...payables]
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 5);
  }, [payables]);

  const updateFormField = (
    setter: Dispatch<SetStateAction<TransactionFormState>>,
    field: keyof TransactionFormState,
    value: string
  ) => setter((prev) => ({ ...prev, [field]: value }));

  const updatePayableFormField = (field: keyof PayableFormState, value: string) => {
    setPayableForm((prev) => ({ ...prev, [field]: value }));
  };

  const savingsProgress = savingsTarget ? Math.min((reserveBalance / savingsTarget) * 100, 100) : 0;

  const totalPayables = payables.reduce((sum, payable) => sum + payable.amount, 0);
  const overduePayables = payables.filter((payable) => payable.status === "pending" && new Date(payable.dueDate) < new Date());

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-4" id="analytics">
        <SummaryCard
          label="Entradas no mês"
          value={currency.format(metrics.totalIncome)}
          helper={`${incomeData.length} categorias`}
        />
        <SummaryCard
          label="Saídas no mês"
          value={currency.format(metrics.totalExpenses)}
          helper={`${expenseData.length} categorias`}
        />
        <SummaryCard
          label="Reserva projetada"
          value={currency.format(reserveBalance)}
          helper="25% do saldo líquido"
        />
        <SummaryCard
          label="Contas a pagar"
          value={currency.format(totalPayables)}
          helper={`${overduePayables.length} em atraso`}
          tone="warning"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="glass-card xl:col-span-2">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="section-title">Fluxo financeiro</h2>
              <p className="text-sm text-slate-400">Distribuição de entradas e saídas por categoria.</p>
            </div>
          </header>
          <div className="flex min-h-[260px] items-center justify-center">
            <Pie
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#cbd5f5" }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="glass-card space-y-6">
          <header className="space-y-2">
            <h2 className="section-title">Meta de reservas</h2>
            <p className="text-sm text-slate-400">Ajuste a meta mensal conforme o planejamento estratégico.</p>
          </header>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Progresso</span>
                <span>{Math.round(savingsProgress)}%</span>
              </div>
              <div className="mt-2 h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300"
                  style={{ width: `${savingsProgress}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-300" htmlFor="savingsTarget">
                Definir nova meta (R$)
              </label>
              <input
                id="savingsTarget"
                type="number"
                min={0}
                step={100}
                className="w-full rounded-2xl border border-white/10 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                value={savingsTarget}
                onChange={(event) => {
                  const newValue = Number(event.target.value);
                  if (!Number.isNaN(newValue)) {
                    updateSavingsTarget(newValue);
                  }
                }}
              />
            </div>
            <p className="text-xs text-slate-500">
              Placeholder de integração com o serviço de planejamento financeiro. Configurações adicionais serão carregadas do
              ERP corporativo.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="glass-card xl:col-span-2">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="section-title">Registrar entrada</h2>
              <p className="text-sm text-slate-400">Informe novas receitas para atualizar métricas imediatamente.</p>
            </div>
          </header>
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => handleTransactionSubmit(event, "income", incomeForm, setIncomeForm)}
          >
            <InputField
              label="Valor"
              type="number"
              min="0"
              step="0.01"
              required
              value={incomeForm.amount}
              onChange={(event) => updateFormField(setIncomeForm, "amount", event.target.value)}
            />
            <InputField
              label="Categoria"
              placeholder="Ex.: Receita recorrente"
              list="category-list"
              value={incomeForm.category}
              onChange={(event) => updateFormField(setIncomeForm, "category", event.target.value)}
            />
            <InputField
              label="Descrição"
              placeholder="Ex.: Plano enterprise"
              value={incomeForm.description}
              onChange={(event) => updateFormField(setIncomeForm, "description", event.target.value)}
            />
            <InputField
              label="Origem"
              placeholder="Ex.: Cliente XPTO"
              value={incomeForm.counterparty}
              onChange={(event) => updateFormField(setIncomeForm, "counterparty", event.target.value)}
            />
            <InputField
              label="Data"
              type="date"
              value={incomeForm.date}
              onChange={(event) => updateFormField(setIncomeForm, "date", event.target.value)}
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400"
              >
                Salvar entrada
              </button>
            </div>
          </form>
        </div>

        <div className="glass-card">
          <header className="mb-6">
            <h2 className="section-title">Contas a pagar</h2>
            <p className="text-sm text-slate-400">
              Controle fornecedores e vencimentos críticos. Em breve conectaremos com o módulo de pagamentos.
            </p>
          </header>
          <form className="space-y-4" onSubmit={handlePayableSubmit} id="payables">
            <InputField
              label="Descrição"
              placeholder="Ex.: Renovação de software"
              value={payableForm.description}
              onChange={(event) => updatePayableFormField("description", event.target.value)}
            />
            <InputField
              label="Valor"
              type="number"
              min="0"
              step="0.01"
              value={payableForm.amount}
              onChange={(event) => updatePayableFormField("amount", event.target.value)}
            />
            <InputField
              label="Fornecedor"
              placeholder="Ex.: SaaS Cloud Inc"
              value={payableForm.counterparty}
              onChange={(event) => updatePayableFormField("counterparty", event.target.value)}
            />
            <InputField
              label="Vencimento"
              type="date"
              value={payableForm.dueDate}
              onChange={(event) => updatePayableFormField("dueDate", event.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:from-red-500 hover:via-orange-400 hover:to-amber-300"
            >
              Adicionar conta
            </button>
          </form>
        </div>

        <div className="glass-card xl:col-span-2">
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="section-title">Registrar saída</h2>
              <p className="text-sm text-slate-400">Documente despesas para manter o controle de fluxo de caixa.</p>
            </div>
          </header>
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => handleTransactionSubmit(event, "expense", expenseForm, setExpenseForm)}
          >
            <InputField
              label="Valor"
              type="number"
              min="0"
              step="0.01"
              required
              value={expenseForm.amount}
              onChange={(event) => updateFormField(setExpenseForm, "amount", event.target.value)}
            />
            <InputField
              label="Categoria"
              placeholder="Ex.: Marketing"
              list="category-list"
              value={expenseForm.category}
              onChange={(event) => updateFormField(setExpenseForm, "category", event.target.value)}
            />
            <InputField
              label="Descrição"
              placeholder="Ex.: Campanha Ads"
              value={expenseForm.description}
              onChange={(event) => updateFormField(setExpenseForm, "description", event.target.value)}
            />
            <InputField
              label="Destino"
              placeholder="Ex.: Agência Creativa"
              value={expenseForm.counterparty}
              onChange={(event) => updateFormField(setExpenseForm, "counterparty", event.target.value)}
            />
            <InputField
              label="Data"
              type="date"
              value={expenseForm.date}
              onChange={(event) => updateFormField(setExpenseForm, "date", event.target.value)}
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-400"
              >
                Salvar saída
              </button>
            </div>
          </form>
        </div>

        <div className="hidden xl:block" aria-hidden="true" />
      </section>

      <section className="glass-card">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="section-title">Próximos vencimentos</h2>
            <p className="text-sm text-slate-400">Organize prioridades e evite multas por atraso.</p>
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Fornecedor</th>
                <th className="px-4 py-3">Vencimento</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {nextPayables.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-slate-500" colSpan={5}>
                    Nenhuma conta cadastrada. Utilize o formulário ao lado para começar.
                  </td>
                </tr>
              ) : (
                nextPayables.map((payable) => (
                  <PayableRow key={payable.id} payable={payable} onToggle={togglePayableStatus} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {formError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-inner">
          {formError}
        </div>
      )}

      <datalist id="category-list">
        {categories.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
    </div>
  );
};

type SummaryCardProps = {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "warning";
};

const SummaryCard = ({ label, value, helper, tone = "default" }: SummaryCardProps) => (
  <article
    className={`glass-card space-y-3 border-l-4 ${
      tone === "warning" ? "border-amber-400" : "border-brand-500"
    }`}
  >
    <p className="text-sm uppercase tracking-wide text-slate-400">{label}</p>
    <h3 className="text-2xl font-semibold text-white">{value}</h3>
    {helper && <p className="text-xs text-slate-500">{helper}</p>}
  </article>
);

type InputFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  step?: string;
  list?: string;
  required?: boolean;
};

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  step,
  list,
  required
}: InputFieldProps) => (
  <label className="space-y-2 text-sm text-slate-300">
    <span>{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      step={step}
      list={list}
      required={required}
      className="w-full rounded-2xl border border-white/10 px-4 py-3 shadow-inner focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
    />
  </label>
);

type PayableRowProps = {
  payable: Payable;
  onToggle: (id: string) => void;
};

const PayableRow = ({ payable, onToggle }: PayableRowProps) => {
  const isOverdue = payable.status === "pending" && new Date(payable.dueDate) < new Date();

  return (
    <tr className="text-slate-200">
      <td className="px-4 py-3">
        <div className="font-medium text-white">{payable.description}</div>
        <div className="text-xs text-slate-500">#{payable.id.slice(-5)}</div>
      </td>
      <td className="px-4 py-3">{payable.counterparty}</td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-3 py-1 text-xs ${isOverdue ? "bg-red-500/10 text-red-200" : "bg-slate-800/80"}`}>
          {new Date(payable.dueDate).toLocaleDateString("pt-BR")}
        </span>
      </td>
      <td className="px-4 py-3">{currency.format(payable.amount)}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => onToggle(payable.id)}
          className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
            payable.status === "paid"
              ? "bg-green-500/10 text-green-300 hover:bg-green-500/20"
              : "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
          }`}
        >
          {payable.status === "paid" ? "Pago" : isOverdue ? "Atrasado" : "Pendente"}
        </button>
      </td>
    </tr>
  );
};

export default Dashboard;
