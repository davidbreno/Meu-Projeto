"use client";

import { useEffect, useMemo, useState } from "react";
import { CartItem, getCart } from "@/lib/cart";
import { CheckoutButton } from "@/components/store/checkout-button";
import { formatPrice } from "@/data/catalog";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-3xl font-semibold text-[#2f2a36]">Checkout</h1>
      <p className="mt-2 text-[#706978]">Pagamento seguro via Stripe.</p>
      <div className="mt-8 space-y-3 rounded-2xl border border-[#eee7e0] bg-white p-6 shadow-sm">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm text-[#5f586a]">
            <span>{item.name} x{item.quantity}</span>
            <strong>{formatPrice(item.price * item.quantity)}</strong>
          </div>
        ))}
        <div className="border-t border-[#f1ebe6] pt-3 text-base">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
      <div className="mt-6">
        <CheckoutButton productIds={items.map((item) => item.id)} />
      </div>
    </main>
  );
}
