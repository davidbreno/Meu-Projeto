import { MetadataRoute } from "next";
import { categoryLabels, products } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://garagemvintage.com.br";
  const staticRoutes = ["", "/catalogo", "/carrinho", "/checkout", "/sobre", "/contato"];

  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...Object.keys(categoryLabels).map((slug) => ({ url: `${base}/categoria/${slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/produto/${product.slug}`, lastModified: new Date() }))
  ];
}
