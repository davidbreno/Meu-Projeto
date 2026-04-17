"use client";

import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";
import { products } from "@/data/catalog";

export function CheckoutForm({ productId }: { productId: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        const product = products.find((item) => item.id === productId);
        if (!product) return;
        addToCart(product);
        router.push("/carrinho");
      }}
      className="w-full rounded-full bg-[#2d2735] px-6 py-3 font-medium text-white transition hover:bg-[#1d1825]"
    >
      Comprar agora
    </button>
  );
}
