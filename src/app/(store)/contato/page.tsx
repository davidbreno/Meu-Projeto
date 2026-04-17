export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <h1 className="text-3xl font-semibold text-[#2f2a36]">Contato</h1>
      <form className="mt-6 space-y-4 rounded-2xl border border-[#eee7e0] bg-white p-6 shadow-sm">
        <input className="w-full rounded-xl border border-[#ece4dd] px-4 py-3" placeholder="Nome" />
        <input className="w-full rounded-xl border border-[#ece4dd] px-4 py-3" placeholder="E-mail" type="email" />
        <textarea className="min-h-32 w-full rounded-xl border border-[#ece4dd] px-4 py-3" placeholder="Mensagem" />
        <button className="rounded-full bg-[#2f2938] px-5 py-3 text-white">Enviar</button>
      </form>
    </main>
  );
}
