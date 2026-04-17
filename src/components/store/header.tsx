import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const links = [
  { label: "Todos os moldes", href: "/catalogo" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" }
];

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#efe9e3] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[#2f2a36]">costurinha digital</Link>
        <nav className="hidden items-center gap-8 text-sm text-[#5f5966] md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[#1f1b25]">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/carrinho" aria-label="Carrinho" className="rounded-full border border-[#ece6df] p-2 text-[#3b3445] transition hover:bg-[#f9f6f3]">
          <ShoppingBag size={18} />
        </Link>
      </div>
    </header>
  );
}
