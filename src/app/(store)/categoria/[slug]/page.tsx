import { notFound } from "next/navigation";
import { ProductCard } from "@/components/store/product-card";
import { categoryLabels, products, type ProductCategory } from "@/data/catalog";

const categories = Object.keys(categoryLabels) as ProductCategory[];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categories.includes(slug as ProductCategory)) notFound();

  const items = products.filter((item) => item.category === slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <h1 className="font-serif text-5xl">Categoria: {categoryLabels[slug as ProductCategory]}</h1>
      <p className="mt-2 text-[#6b4830]">Seleção premium com curadoria de garagem de colecionador.</p>
      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
