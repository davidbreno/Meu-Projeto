import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) return { title: "Produto não encontrado" };
  return {
    title: `${p.title} | Acervo Premium`,
    description: p.description,
    openGraph: { title: p.title, description: p.description, images: [p.coverUrl] }
  };
}

export default async function Produto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug }, include: { orderItems: true } });
  if (!p) notFound();
  const related = await prisma.product.findMany({ where: { id: { not: p.id }, isActive: true }, take: 3 });

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.description,
    image: p.coverUrl,
    offers: { "@type": "Offer", priceCurrency: "BRL", price: Number(p.price), availability: "https://schema.org/InStock" }
  };

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1.15fr_.85fr] md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <section className="space-y-4">
        <div className="catalog-card">
          <div className="flex flex-wrap gap-2">
            <span className="vintage-tag">Download imediato</span>
            <span className="vintage-tag">Restaurado em alta qualidade</span>
          </div>
          <h1 className="mt-3 text-5xl">{p.title}</h1>
          <p className="mt-3 text-vintageBeige/90">{p.description}</p>
          <p className="mt-3 text-sm text-vintageBeige/80">{p.vehicle} • {p.year} • {p.category}</p>
          <div className="mt-6 rounded-2xl border border-agedGold/30 bg-black/35 p-5">
            <h2 className="text-3xl">Preview visual do PDF</h2>
            <p className="mt-2 text-sm text-vintageBeige/80">Mockup premium de páginas internas com textura de revista automotiva sofisticada.</p>
          </div>
        </div>

        <div className="catalog-card">
          <h2 className="text-3xl">Produtos relacionados</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/produto/${r.slug}`} className="rounded-xl border border-agedGold/30 bg-black/25 p-3 transition hover:bg-agedGold/10">
                <p className="text-xl">{r.title}</p>
                <p className="text-sm text-vintageBeige/80">R$ {Number(r.price).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <aside className="md:sticky md:top-5 md:h-fit">
        <div className="catalog-card space-y-3">
          <h2 className="text-4xl text-agedGold">R$ {Number(p.price).toFixed(2)}</h2>
          <p className="text-sm text-vintageBeige">Após a confirmação do Pix, seu arquivo é liberado instantaneamente.</p>
          <CheckoutForm productId={p.id} />
        </div>
      </aside>
    </main>
  );
}
