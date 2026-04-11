import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const access = await prisma.downloadAccess.findUnique({ where: { token }, include: { order: { include: { items: { include: { product: true } } } } } });
  if (!access || access.expiresAt < new Date()) return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  await prisma.downloadAccess.update({ where: { id: access.id }, data: { downloadCount: { increment: 1 } } });
  return NextResponse.redirect(access.order.items[0].product.pdfUrl);
}
