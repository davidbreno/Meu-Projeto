import { MetadataRoute } from "next";
import { products } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://costurinhadigital.vercel.app";
  const staticRoutes = ["", "/catalogo", "/carrinho", "/checkout", "/sobre", "/contato", "/area-cliente"];

  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/produto/${product.slug}`, lastModified: new Date() }))
  ];
}
