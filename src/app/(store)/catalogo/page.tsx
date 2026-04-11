import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CatalogoPage() {
  const produtos = await prisma.product.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl mb-4">Catálogo Premium</h1>
      <div className="grid md:grid-cols-4 gap-3 mb-4 text-sm">
        {['Busca rápida','Marca','Modelo','Ano','Categoria','Tipo','Ordenação'].map(f=><div className='premium-card p-3' key={f}>{f}</div>)}
      </div>
      <div className="grid md:grid-cols-3 gap-4">{produtos.map(p=><Link className="premium-card p-4" key={p.id} href={`/produto/${p.slug}`}><h2>{p.title}</h2><p>R$ {p.price.toFixed(2)}</p></Link>)}</div>
    </main>
  );
}
