"use client";

import { useState } from "react";

export function CheckoutButton({ productIds }: { productIds: string[] }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        setLoading(true);
        try {
          const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productIds })
          });
          const data = (await response.json()) as { url?: string };
          if (data.url) window.location.href = data.url;
        } finally {
          setLoading(false);
        }
      }}
      className="w-full rounded-full bg-[#2d2735] px-6 py-3 font-medium text-white transition hover:bg-[#1d1825]"
    >
      {loading ? "Redirecionando..." : "Finalizar compra"}
    </button>
  );
}
