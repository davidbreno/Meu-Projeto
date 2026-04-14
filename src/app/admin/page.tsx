export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function saveProduct(formData: FormData) {
  "use server";
  const price = Number(formData.get("price") || 0);
  await prisma.product.create({
    data: {
      slug: String(formData.get("slug")),
      title: String(formData.get("title")),
      description: String(formData.get("description")),
      vehicle: String(formData.get("vehicle")),
      brand: String(formData.get("brand")),
      model: String(formData.get("model")),
      year: Number(formData.get("year")),
      category: "Manual do proprietário",
      type: "MANUAL",
      quality: "Restaurado",
      price,
      coverUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
      pdfUrl: "https://example.com/manual.pdf"
    }
  });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/catalogo");
}

async function deleteProduct(formData: FormData) {
  "use server";
  await prisma.product.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin");
  revalidatePath("/catalogo");
}

async function toggleFeatured(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const current = String(formData.get("current")) === "true";
  await prisma.product.update({ where: { id }, data: { isFeatured: !current } });
  revalidatePath("/admin");
  revalidatePath("/");
}

async function saveSettings(formData: FormData) {
  "use server";
  const data = {
    storeName: String(formData.get("storeName")),
    whatsapp: String(formData.get("whatsapp")),
    heroBannerUrl: String(formData.get("heroBannerUrl")),
    homeTexts: {
      headline: String(formData.get("headline")),
      subheadline: String(formData.get("subheadline")),
      socialProof: String(formData.get("socialProof"))
    }
  };
  const settings = await prisma.siteSettings.findFirst();
  if (settings) await prisma.siteSettings.update({ where: { id: settings.id }, data });
  else await prisma.siteSettings.create({ data });
  revalidatePath("/admin");
  revalidatePath("/");
}

export default async function AdminPage() {
  const [orders, products, settings] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.siteSettings.findFirst()
  ]);

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-8">
      <h1 className="text-5xl">Admin Premium</h1>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="catalog-card">Pedidos: <strong>{orders.length}</strong></div>
        <div className="catalog-card">Produtos ativos: <strong>{products.length}</strong></div>
        <div className="catalog-card">Dashboard cinematográfico para operação da loja.</div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <form action={saveProduct} className="catalog-card space-y-2">
          <h2 className="text-3xl">Cadastrar produto</h2>
          <input required name="slug" placeholder="slug" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <input required name="title" placeholder="título" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <textarea required name="description" placeholder="descrição premium" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <div className="grid grid-cols-2 gap-2">
            <input required name="vehicle" placeholder="veículo" className="rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
            <input required name="brand" placeholder="marca" className="rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
            <input required name="model" placeholder="modelo" className="rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
            <input required name="year" type="number" placeholder="ano" className="rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          </div>
          <input required name="price" type="number" step="0.01" placeholder="preço" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <button className="rounded-full bg-agedGold px-5 py-2 font-semibold text-matteBlack">Salvar produto</button>
        </form>

        <form action={saveSettings} className="catalog-card space-y-2">
          <h2 className="text-3xl">Configurações da vitrine</h2>
          <input required name="storeName" defaultValue={settings?.storeName} placeholder="nome da loja" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <input name="whatsapp" defaultValue={settings?.whatsapp ?? ""} placeholder="whatsapp" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <input name="heroBannerUrl" defaultValue={settings?.heroBannerUrl ?? ""} placeholder="banner da hero" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <input name="headline" placeholder="headline" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <input name="subheadline" placeholder="subheadline" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <textarea name="socialProof" placeholder="prova social" className="w-full rounded border border-agedGold/30 bg-black/35 px-3 py-2" />
          <button className="rounded-full bg-agedGold px-5 py-2 font-semibold text-matteBlack">Salvar configurações</button>
        </form>
      </section>

      <section className="catalog-card space-y-3">
        <h2 className="text-3xl">Gerenciar produtos</h2>
        {products.map((product) => (
          <div key={product.id} className="grid gap-2 rounded-xl border border-agedGold/20 bg-black/30 p-3 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <p className="text-xl">{product.title}</p>
              <p className="text-sm text-vintageBeige/80">{product.slug} • R$ {Number(product.price).toFixed(2)}</p>
            </div>
            <form action={toggleFeatured}><input type="hidden" name="id" value={product.id} /><input type="hidden" name="current" value={String(product.isFeatured)} /><button className="rounded-full border border-agedGold/45 px-4 py-2 text-agedGold">{product.isFeatured ? "Remover destaque" : "Destacar"}</button></form>
            <form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><button className="rounded-full border border-red-300/50 px-4 py-2 text-red-200">Excluir</button></form>
          </div>
        ))}
      </section>

      <section className="catalog-card space-y-2">
        <h2 className="text-3xl">Pedidos recentes</h2>
        {orders.map((order) => <p key={order.id} className="text-sm">{order.customerName} • {order.customerEmail} • {order.status} • R$ {Number(order.total).toFixed(2)}</p>)}
      </section>
    </main>
  );
}
