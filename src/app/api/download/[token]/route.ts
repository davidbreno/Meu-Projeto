import { NextRequest, NextResponse } from "next/server";
import { consumeDownloadToken } from "@/lib/download-store";
import { products } from "@/data/catalog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = consumeDownloadToken(token);

  if (!result) return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  if ("error" in result && result.error === "expired") return NextResponse.json({ error: "Link expirado" }, { status: 401 });
  if ("error" in result && result.error === "limit") return NextResponse.json({ error: "Limite de downloads atingido" }, { status: 429 });

  const product = products.find((item) => item.id === result.productId);
  if (!product) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

  return NextResponse.redirect(`https://example.com/downloads/${product.slug}.pdf`);
}
