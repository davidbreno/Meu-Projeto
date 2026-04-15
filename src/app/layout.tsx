import "./globals.css";
import type { Metadata } from "next";
import { StoreHeader } from "@/components/store/header";
import { StoreFooter } from "@/components/store/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://garagemvintage.com.br"),
  title: {
    default: "Garagem Vintage | Manuais de Carros Antigos",
    template: "%s | Garagem Vintage"
  },
  description:
    "E-commerce premium de manuais restaurados, kits de coleção, adesivos vintage e ebooks automotivos para clássicos brasileiros.",
  openGraph: {
    title: "Garagem Vintage",
    description: "Resgatando a memória dos clássicos brasileiros.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="texture-paper text-[#4a2f1f]">
        <StoreHeader />
        {children}
        <StoreFooter />
        <a className="fixed bottom-5 right-5 z-40 rounded-full border border-[#f4d4af] bg-[#9a582f] px-5 py-3 font-semibold text-[#f8ead6] shadow-xl" href="https://wa.me/5511988880000">
          WhatsApp
        </a>
      </body>
    </html>
  );
}
