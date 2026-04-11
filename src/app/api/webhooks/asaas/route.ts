import { NextRequest, NextResponse } from "next/server";
import { validateWebhook } from "@/lib/asaas";
import { prisma } from "@/lib/prisma";
import crypto from "node:crypto";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("asaas-access-token") || "";
  if (!validateWebhook(sig)) return NextResponse.json({ error: "invalid" }, { status: 401 });
  const event = await req.json();
  if (event?.payment?.status === "RECEIVED") {
    const orderId = event.payment.externalReference;
    const token = crypto.randomUUID();
    await prisma.order.update({ where: { id: orderId }, data: { status: "PAID", downloadAccess: { create: { token, expiresAt: new Date(Date.now()+1000*60*60*24) } } } });
  }
  return NextResponse.json({ ok: true });
}
