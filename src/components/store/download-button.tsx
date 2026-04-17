"use client";

import { useState } from "react";

export function DownloadButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="rounded-full border border-[#ded7cf] bg-[#f8f5f3] px-4 py-2 text-sm font-medium text-[#2f2938] hover:bg-[#f1ece8]"
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/download-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId })
          });
          const data = (await res.json()) as { url?: string };
          if (data.url) window.open(data.url, "_blank");
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? "Gerando link..." : "Download"}
    </button>
  );
}
