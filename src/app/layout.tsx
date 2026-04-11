import "./globals.css";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findFirst();
  const storeName = settings?.storeName ?? "Manuais Raros";
  const description = "Acervo premium de manuais raros, restaurados e eBooks para carros antigos.";
  return {
    metadataBase: new URL("https://manuaisraros.com"),
    title: { default: storeName, template: `%s | ${storeName}` },
    description,
    openGraph: { title: storeName, description, type: "website" }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findFirst();
  const whatsapp = settings?.whatsapp?.replace(/\D/g, "") || "5511900000000";

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <a className="fixed bottom-5 right-5 z-40 rounded-full border border-agedGold/40 bg-agedGold px-5 py-3 font-semibold text-matteBlack shadow-2xl" href={`https://wa.me/${whatsapp}`}>
          WhatsApp
        </a>
      </body>
    </html>
  );
}
