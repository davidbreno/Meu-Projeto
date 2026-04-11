import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } });
  const base = "https://manuaisraros.com";

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/catalogo`, lastModified: new Date() },
    ...products.map((p) => ({ url: `${base}/produto/${p.slug}`, lastModified: p.updatedAt }))
  ];
}
