import { NextRequest, NextResponse } from "next/server";
import { createDownloadToken } from "@/lib/download-store";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { productId?: string };
  if (!body.productId) {
    return NextResponse.json({ error: "Produto inválido" }, { status: 400 });
  }

  const token = createDownloadToken(body.productId);
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Simulação de envio por e-mail (integre com Resend/SendGrid em produção).
  console.info(`[email] Link de download enviado para cliente: ${base}/api/download/${token}`);

  return NextResponse.json({ url: `${base}/api/download/${token}` });
}
