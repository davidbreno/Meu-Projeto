"use client";

import { useState } from "react";

type Props = { productId: string };

export function CheckoutForm({ productId }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ pixCopyPaste?: string; pixQrCode?: string; error?: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setResult(null);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setResult(res.ok ? data : { error: data.error ?? "Não foi possível gerar Pix." });
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <input name="productId" defaultValue={productId} type="hidden" />
      <input required name="name" placeholder="Seu nome" className="w-full rounded-lg border border-agedGold/35 bg-black/40 px-3 py-2" />
      <input required name="email" type="email" placeholder="Seu e-mail" className="w-full rounded-lg border border-agedGold/35 bg-black/40 px-3 py-2" />
      <button disabled={loading} className="w-full rounded-full bg-agedGold px-4 py-3 font-semibold text-matteBlack disabled:opacity-70">{loading ? "Gerando Pix..." : "Comprar por Pix"}</button>

      {result?.error && <p className="text-sm text-red-300">{result.error}</p>}
      {result?.pixCopyPaste && (
        <div className="rounded-xl border border-agedGold/35 bg-black/30 p-3 text-sm">
          <p className="font-semibold text-agedGold">Pix copia e cola:</p>
          <p className="mt-1 break-all text-vintageBeige/90">{result.pixCopyPaste}</p>
        </div>
      )}
    </form>
  );
}
