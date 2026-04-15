"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CartItem = { id: string; name: string; price: number; qty: number };

function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem("garage-cart");
    return raw ? JSON.parse(raw) : [];
  });

  function update(next: CartItem[]) {
    setItems(next);
    localStorage.setItem("garage-cart", JSON.stringify(next));
  }

  return { items, update };
}

export default function CartPage() {
  const [coupon, setCoupon] = useState("");
  const { items, update } = useCart();

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.qty, 0), [items]);
  const discount = coupon.toUpperCase() === "GARAGEM10" ? subtotal * 0.1 : 0;
  const shipping = subtotal > 180 ? 0 : 18;
  const total = subtotal - discount + shipping;

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_0.45fr] md:px-8">
      <section className="vintage-card">
        <h1 className="font-serif text-4xl">Carrinho Vintage</h1>
        <div className="mt-6 space-y-3">
          {items.length === 0 && <p className="text-[#684730]">Seu carrinho está vazio.</p>}
          {items.map((item) => (
            <article key={item.id} className="flex items-center justify-between rounded-xl border border-[#c89e73] bg-[#f8ecd8] p-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">Qtd: {item.qty}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">R$ {(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => update(items.filter((it) => it.id !== item.id))} className="rounded bg-[#6e4228] px-3 py-1 text-xs text-[#f8e8d2]">Remover</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="vintage-card h-fit">
        <h2 className="font-serif text-3xl">Resumo do pedido</h2>
        <label className="mt-4 block text-sm">Cupom</label>
        <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Ex: GARAGEM10" className="mt-1 w-full rounded-lg border border-[#c49c72] bg-[#fff4e4] px-3 py-2" />
        <div className="mt-4 space-y-2 text-sm">
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Frete: R$ {shipping.toFixed(2)}</p>
          <p>Desconto: -R$ {discount.toFixed(2)}</p>
          <p className="text-lg font-bold">Total: R$ {total.toFixed(2)}</p>
        </div>
        <Link href="/checkout" className="cta-button mt-6 inline-block w-full text-center">Checkout rápido</Link>
      </aside>
    </main>
  );
}
