import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:px-8">
      <section className="vintage-card space-y-4">
        <h1 className="font-serif text-4xl">Checkout Premium</h1>
        <p className="text-[#64422e]">Finalize em poucos passos com PIX via Asaas.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <input placeholder="Nome completo" className="rounded-lg border border-[#c59d73] bg-[#fff4e4] px-3 py-2" />
          <input placeholder="Email" className="rounded-lg border border-[#c59d73] bg-[#fff4e4] px-3 py-2" />
          <input placeholder="CEP" className="rounded-lg border border-[#c59d73] bg-[#fff4e4] px-3 py-2" />
          <input placeholder="Endereço" className="rounded-lg border border-[#c59d73] bg-[#fff4e4] px-3 py-2" />
        </div>
        <div className="rounded-xl border border-[#cba57c] bg-[#f5e6cf] p-4 text-sm">
          <p><strong>Frete:</strong> Calculado automaticamente por CEP.</p>
          <p><strong>Pagamento:</strong> PIX instantâneo via Asaas.</p>
        </div>
        <Link href="/checkout/sucesso" className="cta-button inline-block">Confirmar pedido</Link>
      </section>
    </main>
  );
}
