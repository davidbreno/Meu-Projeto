import Image from "next/image";
import { notFound } from "next/navigation";
import { Download, ShieldCheck } from "lucide-react";
import { getProductBySlug, formatPrice } from "@/data/catalog";
import { CheckoutForm } from "./checkout-form";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
      <div>
        <div className="overflow-hidden rounded-3xl border border-[#eee7e0] bg-[#faf7f4] p-4 shadow-sm">
          <Image src={product.image} alt={product.name} width={1600} height={1200} className="h-[520px] w-full rounded-2xl object-cover" />
        </div>
      </div>

      <aside className="rounded-3xl border border-[#eee7e0] bg-white p-7 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#2f2a36]">{product.name}</h1>
        <p className="mt-3 text-[#6d6675]">{product.description}</p>
        <p className="mt-6 text-3xl font-semibold text-[#1f1a26]">{formatPrice(product.price)}</p>

        <div className="mt-5 rounded-2xl border border-[#ebe4dd] bg-[#fbf8f5] p-4 text-sm text-[#5f5868]">
          <p className="flex items-center gap-2"><ShieldCheck size={16} /> Produto digital</p>
          <p className="mt-1 flex items-center gap-2"><Download size={16} /> Download após pagamento</p>
        </div>

        <div className="mt-6">
          <CheckoutForm productId={product.id} />
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#433c4d]">Tamanhos</h2>
            <p className="mt-2 text-sm text-[#6f6879]">{product.sizes.join(", ")}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#433c4d]">O que inclui</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#6f6879]">
              {product.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#433c4d]">Avaliações</h2>
            <p className="mt-2 text-sm text-[#6f6879]">{product.rating.toFixed(1)} ★ ({product.reviewCount} avaliações)</p>
          </div>
        </div>
      </aside>
    </main>
  );
}
