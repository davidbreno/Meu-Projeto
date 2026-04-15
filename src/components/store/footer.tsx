export function StoreFooter() {
  return (
    <footer className="mt-16 border-t border-[#c9a57a]/60 bg-[#4a2f1f] px-4 py-10 text-[#f3dfc2] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">Garagem Vintage</p>
          <p className="mt-2 text-sm">Manuais restaurados, kits premium e itens de coleção para clássicos brasileiros.</p>
        </div>
        <div className="text-sm">
          <p>WhatsApp: (11) 98888-0000</p>
          <p>Instagram: @garagemvintage.oficial</p>
          <p>Email: contato@garagemvintage.com.br</p>
        </div>
        <div className="text-sm md:text-right">
          <p>Política de Privacidade</p>
          <p>Termos e Condições</p>
          <p>© {new Date().getFullYear()} Garagem Vintage</p>
        </div>
      </div>
    </footer>
  );
}
