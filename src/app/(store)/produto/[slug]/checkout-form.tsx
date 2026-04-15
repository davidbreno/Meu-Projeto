"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { productId: string; productName: string; productPrice: number };

export function CheckoutForm({ productId, productName, productPrice }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pixLoading, setPixLoading] = useState(false);

  function addToCart() {
    const raw = localStorage.getItem("garage-cart");
    const cart = raw ? JSON.parse(raw) : [];
    const exists = cart.find((item: { id: string }) => item.id === productId);
    const next = exists ? cart.map((item: { id: string; qty: number }) => (item.id === productId ? { ...item, qty: item.qty + 1 } : item)) : [...cart, { id: productId, name: productName, price: productPrice, qty: 1 }];
    localStorage.setItem("garage-cart", JSON.stringify(next));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/carrinho");
    }, 400);
  }

  async function payWithPix() {
    setPixLoading(true);
    setTimeout(() => {
      setPixLoading(false);
      router.push("/checkout");
    }, 450);
  }

  return (
    <div className="space-y-3">
      <button onClick={addToCart} className="w-full rounded-full border border-[#9d643c] bg-[#9d582f] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f6e9d3]">
        {loading ? "Adicionando..." : "Comprar"}
      </button>
      <button onClick={payWithPix} className="w-full rounded-full border border-[#4c311f] bg-[#f1e1c9] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#4d2f1f]">
        {pixLoading ? "Processando..." : "PIX via Asaas"}
      </button>
    </div>
  );
}
