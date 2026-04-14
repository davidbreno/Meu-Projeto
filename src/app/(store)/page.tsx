"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const portfolioItems = [
  { title: "Gota rubi no sorriso", tone: "from-[#8E204B] via-[#B83268] to-[#331323]", size: "md:col-span-2 md:row-span-2" },
  { title: "Dente iridescente", tone: "from-[#164872] via-[#8eb7d6] to-[#F8F7F4]", size: "md:col-span-1 md:row-span-1" },
  { title: "Macro vascular", tone: "from-[#451219] via-[#7d1e2c] to-[#13090D]", size: "md:col-span-1 md:row-span-1" },
  { title: "Chocolate + sorriso", tone: "from-[#2f1a12] via-[#6f3f2f] to-[#b57754]", size: "md:col-span-1 md:row-span-2" },
  { title: "Molde azul", tone: "from-[#0f3c68] via-[#24a8f5] to-[#c6ecff]", size: "md:col-span-1 md:row-span-1" },
  { title: "Lâminas artísticas", tone: "from-[#0f1622] via-[#345783] to-[#d7e7fc]", size: "md:col-span-2 md:row-span-1" },
  { title: "Close macro oral", tone: "from-[#2d1013] via-[#B83268] to-[#e8a1bd]", size: "md:col-span-1 md:row-span-1" }
];

const specialties = [
  "Gengivoplastia",
  "Clareamento",
  "Estética do sorriso",
  "Fotografia odontológica",
  "Cirurgia oral",
  "Implantodontia",
  "Reabilitação oral"
];

const testimonials = [
  "A experiência foi impecável: técnica, acolhimento e resultado acima das expectativas.",
  "O planejamento estético do Dr. David elevou totalmente minha autoestima.",
  "Senti que estava em um estúdio de arte com excelência clínica de alto padrão."
];


export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#0D1B2A] text-white">
      <header
       
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-white/10 bg-[#0D1B2A]/70 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <div>
            <p className="tracking-[0.4em] text-xs text-[#F8F7F4]/80">BD MONOGRAMA</p>
            <p className="font-serif text-lg tracking-[0.08em]">DR. DAVID BRENO</p>
          </div>
          <Link href="#contato" className="rounded-full border border-white/40 px-4 py-2 text-sm transition hover:border-[#B83268] hover:text-[#F8BCD1]">
            Agendar avaliação
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-36 md:px-10 md:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,50,104,.28),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-7">
            <span className="inline-flex rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#F8F7F4]">Odontologia estética autoral</span>
            <h1 className="font-serif text-5xl leading-[1.02] text-[#FFFFFF] md:text-7xl">Odontologia estética com arte, precisão e identidade.</h1>
            <p className="max-w-xl text-lg text-[#F8F7F4]/85">Transformações que unem excelência clínica, sensibilidade estética e fotografia autoral.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="#contato" className="rounded-full bg-[#B83268] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-[#8E204B]">Agendar avaliação</Link>
              <Link href="#portfolio" className="rounded-full border border-white/30 px-7 py-3 text-sm uppercase tracking-[0.2em] transition hover:border-[#B83268]">Ver portfolio</Link>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4">
            <div className="group relative col-span-6 overflow-hidden rounded-[2rem] border border-white/20 bg-[#132238] p-4 shadow-2xl md:col-span-4 md:row-span-2">
              <Image src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=1000&q=80" alt="Dr. David Breno" width={900} height={1200} className="h-[26rem] w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105" />
            </div>
            {["Macro artístico", "Lâmina estética", "Contraste clínico"].map((title, i) => (
              <div key={title} className="col-span-3 overflow-hidden rounded-3xl border border-white/20 bg-[#132238] p-3 md:col-span-2">
                <div className={`h-full min-h-36 rounded-2xl bg-gradient-to-br ${portfolioItems[i].tone} p-4`}>
                  <p className="font-serif text-lg">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl md:text-5xl">Portfolio mosaico premium</h2>
          <p className="max-w-md text-sm text-[#F8F7F4]/70">Cada composição foi pensada como case artístico, conectando ciência, textura e narrativa visual.</p>
        </div>
        <div className="grid auto-rows-[170px] gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {portfolioItems.map((item) => (
            <article key={item.title} className={`group relative overflow-hidden rounded-3xl border border-white/20 ${item.size}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.tone} transition duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" />
              <p className="absolute bottom-4 left-4 translate-y-6 font-serif text-xl opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#101f31] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[#B83268]">Sobre o profissional</p>
            <h3 className="font-serif text-5xl">Precisão clínica com direção de arte.</h3>
            <p className="text-lg text-[#F8F7F4]/85">“Dr. David Breno une precisão clínica, olhar artístico e sensibilidade humana para transformar sorrisos em experiências visuais, funcionais e emocionais.”</p>
            <div className="inline-flex flex-wrap gap-2 rounded-2xl border border-white/20 bg-white/5 p-3 text-xs uppercase tracking-[0.18em] text-[#F8F7F4]/80">
              <span>Cirurgião-dentista</span>•<span>Fotografia odontológica</span>•<span>Estética do sorriso</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#0D1B2A] p-4">
            <Image src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=80" alt="Retrato profissional" width={900} height={1100} className="h-full min-h-[24rem] w-full rounded-[1.5rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <h3 className="mb-8 font-serif text-4xl">Especialidades</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {specialties.map((item, idx) => (
            <article key={item} className="rounded-2xl border border-white/15 bg-[#132238] p-6 shadow-[0_20px_45px_rgba(0,0,0,.35)]">
              <p className="text-xs tracking-[0.2em] text-[#B83268]">CASE {(idx + 1).toString().padStart(2, "0")}</p>
              <h4 className="mt-3 font-serif text-3xl">{item}</h4>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0a1624] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-8 font-serif text-4xl">Galeria artística</h3>
          <div className="grid gap-4 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl border border-white/10">
                <div className="h-64 bg-gradient-to-br from-[#132238] via-[#23364f] to-[#B83268] transition duration-700 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h3 className="font-serif text-4xl">Resultados | Antes e depois</h3>
          <p className="max-w-md text-sm text-[#F8F7F4]/70">Espaço reservado para apresentação de casos clínicos com narrativa visual refinada.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {["Caso 01", "Caso 02", "Caso 03"].map((item) => (
            <div key={item} className="rounded-3xl border border-dashed border-white/25 bg-[#132238]/60 p-8 text-center">
              <p className="font-serif text-3xl">{item}</p>
              <p className="mt-2 text-sm text-[#F8F7F4]/65">Placeholder premium para evolução clínica</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10">
        <h3 className="mb-8 font-serif text-4xl">Depoimentos</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((quote) => (
            <article key={quote} className="rounded-2xl border border-white/15 bg-[#132238] p-6">
              <p className="text-lg leading-relaxed text-[#F8F7F4]/90">“{quote}”</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="bg-[#8E204B] px-5 py-20 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#F9D9E7]">Experiência boutique</p>
            <h3 className="font-serif text-4xl text-white">Seu sorriso merece arte, planejamento e excelência clínica.</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#8E204B]" href="#">Agendar avaliação</a>
            <a className="rounded-full border border-white/70 px-5 py-3 text-sm font-semibold" href="#">WhatsApp</a>
            <a className="rounded-full border border-white/70 px-5 py-3 text-sm font-semibold" href="#">Instagram</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0D1B2A] px-5 py-10 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-[#F8F7F4]/75 md:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.35em] text-[#B83268]">BD</p>
            <p className="font-serif text-2xl text-white">DR. DAVID BRENO</p>
            <p>CIRURGIÃO DENTISTA</p>
          </div>
          <div>
            <p>CRO: 00000 (placeholder)</p>
            <p>Instagram: @drdavidbreno</p>
            <p>WhatsApp: (00) 00000-0000</p>
          </div>
          <div className="md:text-right">
            <p>Cidade: São Paulo, SP</p>
            <p>© {new Date().getFullYear()} Dr. David Breno</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
