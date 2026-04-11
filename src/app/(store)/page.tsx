import Link from "next/link";

const sections = ["Modelos mais procurados", "Coleção rara", "Recém adicionados", "Mais vendidos", "Como funciona", "Prova social", "FAQ"];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <section className="premium-card p-10">
        <p className="text-agedGold uppercase">Destaque Principal</p>
        <h1 className="text-4xl font-bold">Manuais raros e eBooks de carros antigos para colecionadores</h1>
        <p className="mt-3 text-vintageBeige">Arquivos restaurados em alta qualidade, download imediato e peças digitais raras dos clássicos mais amados do Brasil.</p>
        <p className="mt-4 text-xl">Produto estrela: <strong>Fusca Itamar 1996</strong></p>
        <div className="mt-6 flex gap-3">
          <Link className="bg-agedGold text-matteBlack px-5 py-2 rounded" href="/catalogo">Comprar agora</Link>
          <Link className="border border-agedGold px-5 py-2 rounded" href="/catalogo">Ver coleção</Link>
        </div>
      </section>
      <section className="grid md:grid-cols-4 gap-3 text-sm">
        {['Download imediato','Alta qualidade restaurada','Arquivo raro','Compra segura via Pix'].map((s)=><div className='premium-card p-3' key={s}>{s}</div>)}
      </section>
      {sections.map((s)=> <section key={s} className="premium-card p-6"><h2 className="text-2xl text-agedGold">{s}</h2></section>)}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-agedGold text-matteBlack p-3 text-center font-semibold">Comprar manuais raros agora</div>
    </main>
  );
}
