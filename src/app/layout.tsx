import "./globals.css";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let storeName = "Dr. David Breno";

  try {
    const settings = await prisma.siteSettings.findFirst();
    storeName = settings?.storeName ?? storeName;
  } catch {
    storeName = "Dr. David Breno";
  }

  const description = "Portfolio premium de odontologia estética autoral do Dr. David Breno.";

  return {
    metadataBase: new URL("https://manuaisraros.com"),
    title: { default: storeName, template: `%s | ${storeName}` },
    description,
    openGraph: { title: storeName, description, type: "website" }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let whatsapp = "5511900000000";

  try {
    const settings = await prisma.siteSettings.findFirst();
    whatsapp = settings?.whatsapp?.replace(/\D/g, "") || whatsapp;
  } catch {
    whatsapp = "5511900000000";
  }

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <a className="fixed bottom-5 right-5 z-40 rounded-full border border-white/30 bg-[#B83268] px-5 py-3 font-semibold text-white shadow-2xl" href={`https://wa.me/${whatsapp}`}>
          WhatsApp
        </a>
      </body>
    </html>
  );
}
