import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [orders, products] = await Promise.all([prisma.order.count(), prisma.product.count({ where: { isActive: true } })]);
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl">/admin Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="premium-card p-4">Total vendas: {orders}</div>
        <div className="premium-card p-4">Produtos ativos: {products}</div>
        <div className="premium-card p-4">Mais vendidos: Fusca Itamar 1996</div>
        <div className="premium-card p-4">Faturamento recente: em painel</div>
      </div>
    </main>
  );
}
