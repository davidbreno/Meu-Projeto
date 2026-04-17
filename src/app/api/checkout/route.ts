import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { productIds?: string[] };

  if (!body.productIds || body.productIds.length === 0) {
    return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const fallbackSuccess = `${base}/checkout/sucesso?session=demo`;

  // Integração Stripe real: configurar STRIPE_PAYMENT_LINK_URL para redirecionar
  // para um Payment Link/Checkout Session do Stripe.
  const stripeUrl = process.env.STRIPE_PAYMENT_LINK_URL;

  return NextResponse.json({ url: stripeUrl ?? fallbackSuccess });
}
