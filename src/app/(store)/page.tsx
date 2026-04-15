import Image from "next/image";
import Link from "next/link";
import { featuredSlugs, products } from "@/data/catalog";
import { ProductCard } from "@/components/store/product-card";

const featured = products.filter((product) => featuredSlugs.includes(product.slug));
const bestSellers = [...products].sort((a, b) => a.price - b.price).slice(0, 4);
const kits = products.filter((product) => product.category === "kits");
const stickers = products.filter((product) => product.category === "adesivos");

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-[#bf986e] bg-[linear-gradient(110deg,#4a2e1f_0%,#6f4126_38%,#8f582f_100%)] px-4 py-16 text-[#f3dfc4] md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#f2c997]">Acervo de colecionador</p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">Manuais de carros antigos com acabamento premium.</h1>
            <p className="mt-5 max-w-xl text-lg text-[#f7e9d5]">Restauração editorial, textura vintage e curadoria para Fusca, Opala, Maverick, Gol Quadrado e clássicos brasileiros.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalogo" className="cta-button">Conferir manuais</Link>
              <Link href="/categoria/kits" className="rounded-full border border-[#f6d9b7] px-6 py-3 text-sm uppercase tracking-[0.18em] transition hover:bg-white/10">Ver kits premium</Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-[#c89b6a] bg-[#3c2518] p-3 shadow-2xl">
            <Image src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=1600&q=80" alt="Fusca amarelo vintage em garagem" width={1600} height={1000} className="h-[420px] w-full rounded-[1.6rem] object-cover" priority />
          </div>
        </div>
      </section>

      <section className="border-b border-[#c69c71] bg-[#f4e5d0] px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#6e472d]">
          <p>Frete Rápido</p><p>Pagamento Seguro</p><p>Garantia de satisfação</p><p>Pix via Asaas</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <h2 className="mb-8 text-center font-serif text-5xl text-[#4a2f1f]">Destaques da Garagem</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#f0ddc0] px-4 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-serif text-4xl">Mais vendidos</h2>
            <div className="space-y-4">
              {bestSellers.map((item) => (
                <Link key={item.id} href={`/produto/${item.slug}`} className="vintage-card block">
                  <p className="font-serif text-2xl">{item.name}</p>
                  <p className="text-sm text-[#67452f]">{item.vehicle} • {item.yearStart} - {item.yearEnd}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="vintage-card bg-[#4a2f1f] text-[#f2dfc7]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#f4c692]">Banner promocional</p>
            <h3 className="mt-3 font-serif text-5xl">Kit Fusca Completo</h3>
            <p className="mt-3 text-lg">10% OFF no combo manual + porta manual + adesivos de coleção.</p>
            <Link href="/produto/kit-fusca-porta-manual-premium" className="mt-6 inline-flex rounded-full border border-[#f4c692] px-6 py-3 text-sm uppercase tracking-[0.18em]">Quero o kit</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="mb-5 font-serif text-4xl">Kits Premium</h2>
          <div className="space-y-4">{kits.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </div>
        <div>
          <h2 className="mb-5 font-serif text-4xl">Adesivos Vintage</h2>
          <div className="space-y-4">{stickers.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </div>
      </section>

      <section className="bg-[#4e301f] px-4 py-14 text-[#f3dfc4] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Resgatando a memória dos clássicos brasileiros.</h2>
            <p className="mt-4 text-lg">Mais que um e-commerce: um acervo emocional para restauradores, apaixonados por garagem e colecionadores exigentes.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Comprei o manual do Opala e parecia peça de museu.",
              "Os adesivos são absurdamente bonitos na oficina.",
              "Entrega rápida e qualidade que justifica cada centavo."
            ].map((quote) => (
              <article key={quote} className="rounded-xl border border-[#d8b38f]/50 bg-[#6d452d] p-4 text-sm">“{quote}”</article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center md:px-8">
        <h2 className="font-serif text-4xl">Entre para a lista de colecionadores</h2>
        <p className="mt-3 text-[#60412c]">Receba lançamentos raros, cupons e edições limitadas de manuais restaurados.</p>
        <form className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Seu melhor e-mail" className="w-full rounded-full border border-[#b68e66] bg-[#fbf0df] px-5 py-3" />
          <button className="cta-button">Assinar newsletter</button>
        </form>
      </section>
    </main>
  );
}
