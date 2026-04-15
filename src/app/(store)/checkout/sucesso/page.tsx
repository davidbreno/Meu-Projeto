import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <section className="vintage-card text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[#9c6038]">Pedido confirmado</p>
        <h1 className="mt-2 font-serif text-5xl">Obrigado por preservar a história automotiva.</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#63422d]">Seu pagamento PIX foi recebido e o pedido já entrou na fila de expedição premium.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/catalogo" className="cta-button">Continuar comprando</Link>
          <Link href="/contato" className="rounded-full border border-[#a86d43] px-6 py-3 text-sm uppercase tracking-[0.14em]">Falar com suporte</Link>
        </div>
      </section>
    </main>
  );
}
