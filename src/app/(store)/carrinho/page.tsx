"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CartItem, getCart, saveCart } from "@/lib/cart";
import { formatPrice } from "@/data/catalog";
import { CheckoutButton } from "@/components/store/checkout-button";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1fr_360px] md:px-8">
      <section>
        <h1 className="mb-6 text-3xl font-semibold text-[#2f2a36]">Carrinho</h1>
        <div className="space-y-4">
          {items.length === 0 && <p className="text-[#6f6878]">Seu carrinho está vazio.</p>}
          {items.map((item) => (
            <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-[#eee7e0] bg-white p-4 shadow-sm">
              <Image src={item.image} alt={item.name} width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-medium text-[#2f2a36]">{item.name}</p>
                <p className="text-sm text-[#726b7c]">Qtd: {item.quantity}</p>
              </div>
              <p className="font-semibold text-[#1f1926]">{formatPrice(item.price * item.quantity)}</p>
              <button
                className="rounded-full border border-[#e9e2dc] px-3 py-1 text-xs text-[#6d6675]"
                onClick={() => {
                  const next = items.filter((current) => current.id !== item.id);
                  setItems(next);
                  saveCart(next);
                }}
              >
                Remover
              </button>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-2xl border border-[#eee7e0] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#2f2a36]">Resumo</h2>
        <p className="mt-3 text-[#615a6b]">Total: <strong>{formatPrice(total)}</strong></p>
        <div className="mt-5">
          <CheckoutButton productIds={items.map((item) => item.id)} />
        </div>
      </aside>
    </main>
  );
}
