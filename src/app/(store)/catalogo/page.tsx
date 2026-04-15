import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { categoryLabels, products } from "@/data/catalog";

type Props = {
  searchParams: Promise<{ ano?: string; preco?: string; tipo?: string; premium?: string; categoria?: string }>;
};

export default async function CatalogoPage({ searchParams }: Props) {
  const filters = await searchParams;
  const year = Number(filters.ano || 0);
  const filtered = products.filter((item) => {
    const matchesYear = !year || (year >= item.yearStart && year <= item.yearEnd);
    const matchesType = !filters.tipo || item.type === filters.tipo;
    const matchesPremium = filters.premium !== "1" || item.premium;
    const matchesCategory = !filters.categoria || item.category === filters.categoria;
    const matchesPrice =
      !filters.preco ||
      (filters.preco === "ate-80" ? item.price <= 80 : filters.preco === "80-150" ? item.price > 80 && item.price <= 150 : item.price > 150);
    return matchesYear && matchesType && matchesPremium && matchesCategory && matchesPrice;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <section className="vintage-card mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9f6439]">Categoria por carro + filtros</p>
        <h1 className="mt-2 font-serif text-5xl">Catálogo vintage completo</h1>
        <p className="mt-2 max-w-2xl text-[#684731]">Filtre por ano, modelo, faixa de preço, físico/PDF e itens premium. Navegue por Fusca, Opala, Maverick, Gol Quadrado, Itamar e mais.</p>
      </section>

      <form className="mb-8 grid gap-3 rounded-2xl border border-[#bc946a] bg-[#f8eddc] p-4 md:grid-cols-5">
        <input name="ano" placeholder="Ano ex: 1973" className="rounded-lg border border-[#c4a079] bg-[#fff7eb] px-3 py-2" />
        <select name="categoria" className="rounded-lg border border-[#c4a079] bg-[#fff7eb] px-3 py-2">
          <option value="">Todas categorias</option>
          {Object.entries(categoryLabels).map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
        </select>
        <select name="preco" className="rounded-lg border border-[#c4a079] bg-[#fff7eb] px-3 py-2">
          <option value="">Faixa de preço</option><option value="ate-80">Até R$ 80</option><option value="80-150">R$ 80 a R$ 150</option><option value="150+">Acima de R$ 150</option>
        </select>
        <select name="tipo" className="rounded-lg border border-[#c4a079] bg-[#fff7eb] px-3 py-2"><option value="">Físico ou PDF</option><option value="fisico">Físico</option><option value="pdf">PDF</option></select>
        <button className="cta-button">Aplicar filtros</button>
        <label className="col-span-full flex items-center gap-2 text-sm"><input type="checkbox" name="premium" value="1" /> Somente premium</label>
      </form>

      <div className="mb-8 flex flex-wrap gap-2">
        {Object.entries(categoryLabels).map(([slug, label]) => (
          <Link key={slug} href={`/categoria/${slug}`} className="rounded-full border border-[#b4875a] bg-[#f4e2c9] px-4 py-2 text-sm font-medium">
            {label}
          </Link>
        ))}
      </div>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
