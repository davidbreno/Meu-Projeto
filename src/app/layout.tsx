import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manuais Raros de Carros Antigos",
  description: "Loja premium de manuais restaurados e eBooks de clássicos.",
  openGraph: { title: "Manuais Raros", description: "Download imediato via Pix" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <a className="fixed right-4 bottom-4 rounded-full bg-agedGold px-4 py-2 text-matteBlack font-bold" href="https://wa.me/5500000000000">WhatsApp</a>
      </body>
    </html>
  );
}
