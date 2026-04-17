import "./globals.css";
import type { Metadata } from "next";
import { StoreHeader } from "@/components/store/header";
import { StoreFooter } from "@/components/store/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://costurinhadigital.vercel.app"),
  title: {
    default: "Costurinha Digital | Moldes em PDF",
    template: "%s | Costurinha Digital"
  },
  description: "Loja de moldes digitais em PDF com download automático após pagamento e área do cliente.",
  openGraph: {
    title: "Costurinha Digital",
    description: "Moldes prontos, passo a passo detalhado.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-[#2f2a36]">
        <StoreHeader />
        {children}
        <StoreFooter />
      </body>
    </html>
  );
}
