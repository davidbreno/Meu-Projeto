import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/store/product-card";
import { FAQAccordion } from "@/components/store/faq-accordion";
import { faqItems, products } from "@/data/catalog";

const benefits = [
  "Download automático",
  "Impressão fácil",
  "Moldes prontos",
  "Material de apoio"
];

export default function HomePage() {
  return (
    <main className="bg-[#ffffff]">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1fr_0.9fr] md:px-8 md:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight text-[#2f2a36] md:text-6xl">Moldes prontos, passo a passo detalhado</h1>
          <p className="max-w-xl text-lg text-[#6d6674]">Arquivos digitais elegantes para costura criativa. Compre, baixe e comece hoje mesmo.</p>
          <Link href="/catalogo" className="inline-flex rounded-full bg-[#2f2938] px-6 py-3 font-medium text-white hover:bg-[#1e1926]">Ver moldes</Link>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-[#f0e8e1] bg-[#faf7f4] p-4 shadow-sm">
          <Image src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1500&q=80" alt="Moldes de costura" width={1400} height={1000} priority className="h-full w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <h2 className="mb-8 text-2xl font-semibold text-[#2f2a36]">Nossos moldes</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#fbf8f6] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-semibold text-[#2f2a36]">Por que escolher nossos moldes?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article key={benefit} className="rounded-2xl border border-[#eee7e0] bg-white p-5 text-[#5c5566] shadow-sm">
                {benefit}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8">
        <h2 className="mb-6 text-2xl font-semibold text-[#2f2a36]">FAQ</h2>
        <FAQAccordion items={faqItems} />
      </section>
    </main>
  );
}
