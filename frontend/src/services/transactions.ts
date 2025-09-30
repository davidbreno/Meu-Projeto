export type TransactionResponse = {
  id: string;
  type: "income" | "expense";
  description: string;
  amount: number;
  category: string;
  counterparty: string;
  date: string;
};

/**
 * Placeholder para integração futura com API real (ex.: Vercel / Serverless). Atualmente retorna dados mockados.
 */
export const fetchTransactionsMock = async (): Promise<TransactionResponse[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return [
    {
      id: "seed-1",
      type: "income",
      description: "Plano enterprise",
      amount: 18990,
      category: "Receita recorrente",
      counterparty: "Cliente TechPro",
      date: new Date().toISOString()
    },
    {
      id: "seed-2",
      type: "expense",
      description: "Infraestrutura cloud",
      amount: 8290,
      category: "Infraestrutura",
      counterparty: "Cloud Provider",
      date: new Date().toISOString()
    }
  ];
};
