import Link from "next/link";
import { DownloadButton } from "@/components/store/download-button";
import { products } from "@/data/catalog";

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <section className="rounded-3xl border border-[#ece5de] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-[#2f2a36]">Pagamento confirmado 🎉</h1>
        <p className="mt-3 text-[#6f6778]">Seus links foram enviados por e-mail e também estão disponíveis abaixo.</p>
        <div className="mt-8 space-y-4">
          {products.slice(0, 3).map((product) => (
            <article key={product.id} className="flex items-center justify-between rounded-2xl border border-[#efe7e1] p-4">
              <div>
                <p className="font-medium text-[#2f2a36]">{product.name}</p>
                <p className="text-sm text-[#6f6778]">Link expira em 6 meses • limite de downloads aplicado</p>
              </div>
              <DownloadButton productId={product.id} />
            </article>
          ))}
        </div>
        <Link href="/area-cliente" className="mt-8 inline-flex rounded-full bg-[#2f2938] px-5 py-3 text-white">Ir para área do cliente</Link>
      </section>
    </main>
  );
}
