import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  return { title: p ? `${p.title} | Manual raro` : "Produto" };
}

export default async function Produto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) notFound();
  return <main className="max-w-4xl mx-auto p-6 space-y-4"><h1 className="text-3xl">{p.title}</h1><p>{p.description}</p><p>Veículo: {p.vehicle} • Ano: {p.year}</p><p>Formato PDF • Qualidade {p.quality}</p><p className="text-agedGold">Receba instantaneamente após a confirmação do Pix.</p><form action="/api/checkout" method="post" className="sticky bottom-2 premium-card p-4"><input type="hidden" name="productId" value={p.id}/><button className="bg-agedGold text-matteBlack px-4 py-2 rounded">Comprar por Pix</button></form></main>;
}
