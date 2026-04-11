import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Counter } from "@/components/counter";

const classics = ["Fusca Itamar 1996", "Opala Diplomata", "Caravan", "Chevette", "Gol GTI quadrado", "Kombi Clipper", "Santana GLS"];

export default async function HomePage() {
  const [featured, latest, highlighted] = await Promise.all([
    prisma.product.findFirst({ where: { isFeatured: true, isActive: true } }),
    prisma.product.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    prisma.product.findMany({ where: { isActive: true }, orderBy: { updatedAt: "desc" }, take: 3 })
  ]);

  return (
    <main className="relative mx-auto max-w-7xl space-y-10 px-4 pb-24 pt-6 md:px-8">
      <section className="premium-panel film-grain relative overflow-hidden p-6 md:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-6">
            <span className="vintage-tag">Acervo de Colecionador</span>
            <h1 className="text-4xl leading-tight md:text-6xl">Manuais raros e eBooks de carros antigos para verdadeiros colecionadores.</h1>
            <p className="max-w-2xl text-vintageBeige/90 md:text-lg">Arquivos restaurados em alta qualidade, download imediato e relíquias digitais dos clássicos mais desejados do Brasil.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalogo" className="rounded-full bg-agedGold px-6 py-3 font-semibold text-matteBlack transition hover:brightness-110">Explorar coleção</Link>
              <Link href="/produto/fusca-itamar-1996" className="rounded-full border border-agedGold/60 px-6 py-3 font-semibold text-agedGold transition hover:bg-agedGold/10">Comprar Fusca Itamar 96</Link>
            </div>
          </div>
          <div className="gold-frame texture-paper rounded-2xl p-4">
            <div className="premium-panel rounded-xl border border-agedGold/25 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-agedGold">Destaque cinematográfico</p>
              <h2 className="mt-2 text-3xl">Fusca Itamar 1996</h2>
              <p className="mt-2 text-sm text-vintageBeige/80">Mockup premium do manual original em perspectiva, com acabamento restaurado em definição de colecionador.</p>
              <div className="mt-4 rounded-xl border border-agedGold/25 bg-black/40 p-4">
                <p className="text-sm text-agedGold">Manual original zero km • Edição digital restaurada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Counter value={2000} prefix="+" suffix=" downloads" label="Acervo entregue com confiança" />
        <Counter value={500} prefix="+" suffix=" clientes" label="Colecionadores atendidos" />
        <Counter value={100} prefix="+" suffix=" modelos raros" label="Catálogo em expansão" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="catalog-card"><h2 className="text-3xl">Coleção rara</h2><p className="mt-2 text-sm text-vintageBeige/80">Manuais originais e versões restauradas com curadoria editorial.</p></div>
        <div className="catalog-card"><h2 className="text-3xl">Manuais recém adicionados</h2><div className="mt-2 space-y-1 text-sm text-vintageBeige/90">{latest.map((p) => <p key={p.id}>• {p.title}</p>)}</div></div>
        <div className="catalog-card"><h2 className="text-3xl">Clássicos mais procurados</h2><div className="mt-2 flex flex-wrap gap-2">{classics.map((c) => <span key={c} className="vintage-tag">{c}</span>)}</div></div>
      </section>

      <section className="catalog-card">
        <p className="vintage-tag">Fusca Itamar em destaque</p>
        <h2 className="mt-3 text-4xl">{featured?.title ?? "Fusca Itamar 1996"}</h2>
        <p className="mt-2 text-vintageBeige/85">Peça digital com aparência de catálogo raro de concessionária antiga. Ideal para restauração, coleção ou presente memorável.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Escolha o manual", "Pague por Pix", "Baixe na hora"].map((step, i) => (
          <div key={step} className="catalog-card">
            <p className="text-agedGold">0{i + 1}</p>
            <h3 className="text-3xl">{step}</h3>
            <p className="text-sm text-vintageBeige/80">Após a confirmação do Pix, seu arquivo é liberado instantaneamente.</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="catalog-card">
          <h2 className="text-3xl">Prova social</h2>
          <p className="mt-2 text-vintageBeige">“Qualidade impecável, parecia o manual original em minhas mãos.” — Marcelo, SP</p>
          <p className="mt-2 text-vintageBeige">“Comprei o Fusca Itamar e recebi instantaneamente.” — Helena, PR</p>
        </div>
        <div className="catalog-card">
          <h2 className="text-3xl">FAQ premium</h2>
          <p className="mt-2 text-sm text-vintageBeige"><strong className="text-agedGold">Entrega:</strong> Link liberado automaticamente após pagamento.</p>
          <p className="mt-2 text-sm text-vintageBeige"><strong className="text-agedGold">Formato:</strong> PDF em alta qualidade restaurada.</p>
          <p className="mt-2 text-sm text-vintageBeige"><strong className="text-agedGold">Pagamento:</strong> Somente Pix (QR Code + copia e cola).</p>
        </div>
      </section>

      <section className="premium-panel p-7 text-center">
        <h2 className="text-4xl">Sua garagem clássica merece esse acervo raro.</h2>
        <p className="mt-3 text-vintageBeige/90">Compre agora e transforme nostalgia em patrimônio digital de colecionador.</p>
        <Link href="/catalogo" className="mt-5 inline-flex rounded-full bg-agedGold px-8 py-3 font-semibold text-matteBlack">Entrar na coleção</Link>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-agedGold/30 bg-[#0b0b0ce8] p-3 md:hidden">
        <Link href="/catalogo" className="block rounded-full bg-agedGold px-4 py-3 text-center font-semibold text-matteBlack">Explorar coleção rara</Link>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {highlighted.map((p) => (
          <Link key={p.id} href={`/produto/${p.slug}`} className="catalog-card">
            <div className="flex gap-2"><span className="vintage-tag">Arquivo raro</span><span className="vintage-tag">Restaurado</span></div>
            <h3 className="mt-3 text-3xl">{p.title}</h3>
            <p className="mt-2 text-sm text-vintageBeige/80">R$ {Number(p.price).toFixed(2)}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
