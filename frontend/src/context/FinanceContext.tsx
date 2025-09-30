import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from "react";

import { fetchTransactionsMock } from "../services/transactions";

type TransactionBase = {
  description: string;
  amount: number;
  category: string;
  counterparty: string;
  date: string;
};

export type TransactionType = "income" | "expense";

export type Transaction = TransactionBase & {
  id: string;
  type: TransactionType;
};

export type PayableStatus = "pending" | "paid";

export type Payable = {
  id: string;
  description: string;
  amount: number;
  counterparty: string;
  dueDate: string;
  status: PayableStatus;
};

type FinanceState = {
  transactions: Transaction[];
  payables: Payable[];
  savingsTarget: number;
};

type FinanceAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "ADD_PAYABLE"; payload: Payable }
  | { type: "TOGGLE_PAYABLE"; payload: { id: string } }
  | { type: "UPDATE_SAVINGS_TARGET"; payload: { target: number } }
  | { type: "HYDRATE"; payload: FinanceState };

type FinanceContextValue = {
  transactions: Transaction[];
  payables: Payable[];
  savingsTarget: number;
  reserveBalance: number;
  metrics: {
    totalIncome: number;
    totalExpenses: number;
    monthlyAverage: number;
    categories: { label: string; value: number; type: TransactionType }[];
  };
  addTransaction: (payload: Omit<Transaction, "id">) => void;
  addPayable: (payload: Omit<Payable, "id" | "status">) => void;
  togglePayableStatus: (id: string) => void;
  updateSavingsTarget: (target: number) => void;
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

const STORAGE_KEY = "finance-dashboard::data";

const initialState: FinanceState = {
  transactions: [],
  payables: [],
  savingsTarget: 5000
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case "ADD_PAYABLE":
      return {
        ...state,
        payables: [action.payload, ...state.payables]
      };
    case "TOGGLE_PAYABLE":
      return {
        ...state,
        payables: state.payables.map((payable) =>
          payable.id === action.payload.id
            ? { ...payable, status: payable.status === "pending" ? "paid" : "pending" }
            : payable
        )
      };
    case "UPDATE_SAVINGS_TARGET":
      return {
        ...state,
        savingsTarget: action.payload.target
      };
    default:
      return state;
  }
};

const generateId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2, 11);

const deserializeState = (value: string | null): FinanceState | null => {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as FinanceState;
    return {
      transactions: parsed.transactions ?? [],
      payables: parsed.payables ?? [],
      savingsTarget: typeof parsed.savingsTarget === "number" ? parsed.savingsTarget : 5000
    };
  } catch (error) {
    console.warn("Não foi possível restaurar dados financeiros", error);
    return null;
  }
};

const serializeState = (state: FinanceState) => JSON.stringify(state);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  const isBrowser = typeof window !== "undefined";
  const hasHydrated = useRef(false);

  useEffect(() => {
    if (!isBrowser) return;
    if (hasHydrated.current) return;

    const restored = deserializeState(window.localStorage.getItem(STORAGE_KEY));
    if (restored) {
      dispatch({ type: "HYDRATE", payload: restored });
      hasHydrated.current = true;
      return;
    }

    const seedData = async () => {
      try {
        const data = await fetchTransactionsMock();
        hasHydrated.current = true;
        data.forEach((transaction) =>
          dispatch({
            type: "ADD_TRANSACTION",
            payload: {
              ...transaction,
              id: transaction.id || generateId()
            }
          })
        );
      } catch (error) {
        console.error("Falha ao carregar dados mockados", error);
        hasHydrated.current = true;
      }
    };

    seedData();
  }, [isBrowser]);

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(STORAGE_KEY, serializeState(state));
  }, [state, isBrowser]);

  const addTransaction = useCallback((payload: Omit<Transaction, "id">) => {
    const transaction: Transaction = { ...payload, id: generateId() };
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }, []);

  const addPayable = useCallback((payload: Omit<Payable, "id" | "status">) => {
    const payable: Payable = { ...payload, id: generateId(), status: "pending" };
    dispatch({ type: "ADD_PAYABLE", payload: payable });
  }, []);

  const togglePayableStatus = useCallback((id: string) => {
    dispatch({ type: "TOGGLE_PAYABLE", payload: { id } });
  }, []);

  const updateSavingsTarget = useCallback((target: number) => {
    dispatch({ type: "UPDATE_SAVINGS_TARGET", payload: { target } });
  }, []);

  const metrics = useMemo(() => {
    const totalIncome = state.transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = state.transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const categories = state.transactions.reduce<
      { label: string; value: number; type: TransactionType }[]
    >((acc, transaction) => {
      const key = `${transaction.type}-${transaction.category}`;
      const existing = acc.find((category) => `${category.type}-${category.label}` === key);
      if (existing) {
        existing.value += transaction.amount;
      } else {
        acc.push({ label: transaction.category, value: transaction.amount, type: transaction.type });
      }
      return acc;
    }, []);

    const monthlyAverage = state.transactions.length
      ? (totalExpenses / Math.max(new Set(state.transactions.map((t) => t.date.slice(0, 7))).size, 1))
      : 0;

    return {
      totalIncome,
      totalExpenses,
      monthlyAverage,
      categories
    };
  }, [state.transactions]);

  const reserveBalance = useMemo(() => {
    const net = metrics.totalIncome - metrics.totalExpenses;
    return Math.max(net * 0.25, 0);
  }, [metrics.totalIncome, metrics.totalExpenses]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      transactions: state.transactions,
      payables: state.payables,
      savingsTarget: state.savingsTarget,
      reserveBalance,
      metrics,
      addTransaction,
      addPayable,
      togglePayableStatus,
      updateSavingsTarget
    }),
    [state.transactions, state.payables, state.savingsTarget, reserveBalance, metrics, addTransaction, addPayable, togglePayableStatus, updateSavingsTarget]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance deve ser utilizado dentro de FinanceProvider");
  }
  return context;
};
