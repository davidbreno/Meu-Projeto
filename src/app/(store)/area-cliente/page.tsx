"use client";

import { FormEvent, useState } from "react";
import { DownloadButton } from "@/components/store/download-button";
import { products } from "@/data/catalog";

export default function ClientAreaPage() {
  const [email, setEmail] = useState("");
  const [logged, setLogged] = useState(false);

  const purchased = products.slice(0, 4);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <h1 className="text-3xl font-semibold text-[#2f2a36]">Área do cliente</h1>
      {!logged ? (
        <form
          className="mt-6 rounded-2xl border border-[#eee7e0] bg-white p-6 shadow-sm"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            if (!email) return;
            setLogged(true);
          }}
        >
          <p className="mb-4 text-sm text-[#6f6778]">Entre com seu e-mail para acessar seus downloads.</p>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@email.com"
            className="w-full rounded-xl border border-[#ece4dd] px-4 py-3"
          />
          <button className="mt-4 rounded-full bg-[#2f2938] px-5 py-3 text-white">Entrar</button>
        </form>
      ) : (
        <section className="mt-6 space-y-4">
          <p className="text-sm text-[#6f6778]">Logado como: {email}</p>
          {purchased.map((product) => (
            <article key={product.id} className="flex items-center justify-between rounded-2xl border border-[#eee7e0] bg-white p-4 shadow-sm">
              <div>
                <p className="font-medium text-[#2f2a36]">{product.name}</p>
                <p className="text-sm text-[#6f6778]">Produto digital • disponível para download</p>
              </div>
              <DownloadButton productId={product.id} />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
