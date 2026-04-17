import { ProductCard } from "@/components/store/product-card";
import { products } from "@/data/catalog";

export default async function CategoryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="mb-8 text-3xl font-semibold text-[#2f2a36]">Categoria</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
