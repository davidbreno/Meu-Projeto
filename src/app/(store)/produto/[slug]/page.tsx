import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/catalog";
import { CheckoutForm } from "./checkout-form";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((item) => product.relatedSlugs.includes(item.slug));

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {product.images.map((image) => (
              <div key={image} className="overflow-hidden rounded-2xl border border-[#b88d60] bg-[#f9edd9] p-2">
                <Image src={image} alt={product.name} width={900} height={700} className="h-64 w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#b88d60] bg-[#f9edd9] p-2">
            <iframe src={product.videoUrl} title="Vídeo do manual" className="h-[320px] w-full rounded-xl" allowFullScreen />
          </div>
        </div>

        <aside className="vintage-card h-fit">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9b653a]">Página de produto premium</p>
          <h1 className="mt-2 font-serif text-4xl">{product.name}</h1>
          <p className="mt-3 text-[#61412c]">{product.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-4xl font-bold text-[#8f4f27]">R$ {product.price.toFixed(2)}</p>
            {product.compareAtPrice && <p className="text-lg text-[#7c6048] line-through">R$ {product.compareAtPrice.toFixed(2)}</p>}
          </div>
          <p className="mt-2 text-sm">Compatível: {product.yearStart} - {product.yearEnd} ({product.model})</p>
          <div className="mt-5"><CheckoutForm productId={product.id} productName={product.name} productPrice={product.price} /></div>
          <div className="mt-6 space-y-2 rounded-xl border border-[#c9a37a] bg-[#f5e6d0] p-4 text-sm">
            <p><strong>Acabamento do papel:</strong> {product.paperFinish}</p>
            <p><strong>Prazo de envio:</strong> {product.shippingDeadline}</p>
            <p><strong>Estoque:</strong> {product.stock} unidades</p>
          </div>
        </aside>
      </section>

      <section className="vintage-card">
        <h2 className="font-serif text-3xl">Compatibilidade por ano/modelo</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-[#60412d]">{product.compatibility.map((entry) => <li key={entry}>{entry}</li>)}</ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="vintage-card">
          <h3 className="font-serif text-3xl">Produtos relacionados</h3>
          <div className="mt-4 space-y-3">{related.map((item) => <Link key={item.id} href={`/produto/${item.slug}`} className="block rounded-lg border border-[#c49c72] bg-[#f8ecd8] p-3 font-medium">{item.name}</Link>)}</div>
        </article>
        <article className="vintage-card">
          <h3 className="font-serif text-3xl">FAQ</h3>
          <div className="mt-4 space-y-3 text-sm text-[#61412c]">
            <p><strong>É original?</strong> Sim, restaurado fielmente com curadoria editorial.</p>
            <p><strong>Tem versão PDF?</strong> Para alguns títulos sim, com entrega imediata.</p>
            <p><strong>Pode parcelar?</strong> PIX com confirmação rápida; cartões serão adicionados no próximo release.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
