import Link from "next/link";

const links = [
  ["Início", "/"],
  ["Categorias", "/catalogo"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
  ["Carrinho", "/carrinho"]
];

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d0b28d]/70 bg-[#f2e5d2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link href="/" className="text-center">
          <p className="text-xs tracking-[0.35em] text-[#8d5f3a]">GARAGEM</p>
          <p className="font-serif text-2xl font-bold uppercase tracking-[0.08em] text-[#4d2f1d]">Vintage</p>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-[#5a3923] md:gap-7">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[#a56a3f]">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
