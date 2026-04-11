import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/schemas";
import { createPixPayment } from "@/lib/asaas";

export async function POST(req: NextRequest) {
  const raw = req.headers.get("content-type")?.includes("application/json") ? await req.json() : Object.fromEntries((await req.formData()).entries());
  const parsed = checkoutSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });

  const productId = String(raw.productId || "");
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });

  const order = await prisma.order.create({
    data: {
      customerName: parsed.data.name,
      customerEmail: parsed.data.email,
      customerCpf: parsed.data.cpf,
      total: product.price,
      items: { create: [{ productId: product.id, price: product.price, quantity: 1 }] }
    }
  });

  const payment = await createPixPayment({
    customer: parsed.data.email,
    value: Number(product.price),
    description: product.title,
    externalReference: order.id
  });

  await prisma.order.update({ where: { id: order.id }, data: { paymentProviderId: payment.id } });

  return NextResponse.json({
    orderId: order.id,
    pixQrCode: payment?.encodedImage,
    pixCopyPaste: payment?.payload,
    status: "PENDING"
  });
}
