import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CatalogoPage() {
  const produtos = await prisma.product.findMany({ where: { isActive: true }, orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] });

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      <section className="premium-panel p-6 md:p-8">
        <p className="vintage-tag">Coleção rara</p>
        <h1 className="mt-3 text-5xl">Catálogo de manuais restaurados e eBooks clássicos</h1>
        <p className="mt-2 max-w-2xl text-vintageBeige/85">Cada item foi tratado como peça de colecionador: acabamento premium, leitura impecável e entrega instantânea por Pix.</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((p) => (
          <Link key={p.id} href={`/produto/${p.slug}`} className="catalog-card">
            <div className="flex flex-wrap gap-2">
              <span className="vintage-tag">Arquivo raro</span>
              <span className="vintage-tag">Restaurado</span>
              {p.isFeatured && <span className="vintage-tag">Destaque</span>}
            </div>
            <h2 className="mt-4 text-4xl">{p.title}</h2>
            <p className="mt-2 text-sm text-vintageBeige/80">{p.year} • {p.category}</p>
            <p className="mt-4 text-2xl text-agedGold">R$ {Number(p.price).toFixed(2)}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
