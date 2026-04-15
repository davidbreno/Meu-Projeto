import Image from "next/image";
import Link from "next/link";
import type { ProductItem } from "@/data/catalog";
import { Badge } from "./badge";

export function ProductCard({ product }: { product: ProductItem }) {
  return (
    <article className="vintage-card group">
      <Link href={`/produto/${product.slug}`}>
        <div className="relative mb-4 overflow-hidden rounded-xl border border-[#b79063]/60">
          <Image src={product.images[0]} alt={product.name} width={900} height={700} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <Badge key={badge} label={badge} className="bg-[#4d2f1f] text-[#f2dfc8]" />
            ))}
          </div>
        </div>
        <h3 className="font-serif text-2xl text-[#402719]">{product.name}</h3>
        <p className="mt-2 text-sm text-[#664731]">{product.shortDescription}</p>
        <p className="mt-3 text-3xl font-bold text-[#8f4f27]">R$ {product.price.toFixed(2)}</p>
      </Link>
    </article>
  );
}
