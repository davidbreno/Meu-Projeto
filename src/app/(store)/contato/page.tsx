export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <section className="vintage-card">
        <h1 className="font-serif text-5xl">Contato</h1>
        <p className="mt-3 text-[#65442e]">Nosso atendimento é especializado em colecionadores e restauração de acervo.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <a className="rounded-xl border border-[#bf9569] bg-[#f7e9d4] p-4" href="https://wa.me/5511988880000">WhatsApp<br /><strong>(11) 98888-0000</strong></a>
          <a className="rounded-xl border border-[#bf9569] bg-[#f7e9d4] p-4" href="https://instagram.com">Instagram<br /><strong>@garagemvintage.oficial</strong></a>
          <a className="rounded-xl border border-[#bf9569] bg-[#f7e9d4] p-4" href="mailto:contato@garagemvintage.com.br">Email<br /><strong>contato@garagemvintage.com.br</strong></a>
        </div>
        <form className="mt-7 grid gap-3">
          <input placeholder="Seu nome" className="rounded-lg border border-[#c49b72] bg-[#fff5e6] px-3 py-2" />
          <input placeholder="Seu email" className="rounded-lg border border-[#c49b72] bg-[#fff5e6] px-3 py-2" />
          <textarea placeholder="Como podemos ajudar?" className="min-h-32 rounded-lg border border-[#c49b72] bg-[#fff5e6] px-3 py-2" />
          <button className="cta-button w-fit">Enviar mensagem</button>
        </form>
      </section>
    </main>
  );
}
