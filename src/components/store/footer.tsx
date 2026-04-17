import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="border-t border-[#efe9e3] bg-white px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-[#2d2835]">costurinha digital</p>
          <p className="mt-2 text-sm text-[#6f6778]">Moldes em PDF com download automático e suporte por e-mail.</p>
        </div>
        <div className="text-sm text-[#6f6778]">
          <p className="mb-2 font-medium text-[#2d2835]">Links</p>
          <div className="space-y-2">
            <Link href="/catalogo" className="block hover:text-[#2d2835]">Todos os moldes</Link>
            <Link href="/sobre" className="block hover:text-[#2d2835]">Sobre</Link>
            <Link href="/contato" className="block hover:text-[#2d2835]">Contato</Link>
            <Link href="/area-cliente" className="block hover:text-[#2d2835]">Área do cliente</Link>
          </div>
        </div>
        <div className="text-sm text-[#6f6778]">
          <p className="mb-2 font-medium text-[#2d2835]">Redes sociais</p>
          <div className="space-y-2">
            <a href="https://instagram.com" className="block hover:text-[#2d2835]">Instagram</a>
            <a href="https://pinterest.com" className="block hover:text-[#2d2835]">Pinterest</a>
            <a href="mailto:contato@costurinhadigital.com" className="block hover:text-[#2d2835]">contato@costurinhadigital.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
