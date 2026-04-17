"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductItem, formatPrice } from "@/data/catalog";
import { addToCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: ProductItem }) {
  const router = useRouter();

  return (
    <article className="rounded-2xl border border-[#eee7e0] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/produto/${product.slug}`}>
        <div className="relative mb-4 overflow-hidden rounded-xl bg-[#f6f3f1]">
          <Image src={product.image} alt={product.name} width={1000} height={760} loading="lazy" className="h-56 w-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold text-[#2f2a36]">{product.name}</h3>
        <p className="mt-2 text-sm text-[#6b6472]">{product.shortDescription}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-[#26212e]">{formatPrice(product.price)}</span>
        <button
          className="rounded-full bg-[#2f2938] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f1a26]"
          onClick={() => {
            addToCart(product);
            router.push("/carrinho");
          }}
        >
          Comprar
        </button>
      </div>
    </article>
  );
}
