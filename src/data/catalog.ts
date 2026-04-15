export type ProductCategory = "fusca" | "opala" | "maverick" | "gol-quadrado" | "itamar" | "pdfs" | "kits" | "adesivos";

export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  vehicle: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  type: "fisico" | "pdf";
  premium: boolean;
  stock: number;
  badges: Array<"NOVO" | "PREMIUM" | "COLECAO">;
  images: string[];
  videoUrl: string;
  paperFinish: string;
  shippingDeadline: string;
  compatibility: string[];
  relatedSlugs: string[];
};

export const categoryLabels: Record<ProductCategory, string> = {
  fusca: "Fusca",
  opala: "Opala",
  maverick: "Maverick",
  "gol-quadrado": "Gol Quadrado",
  itamar: "Itamar",
  pdfs: "PDFs",
  kits: "Kits",
  adesivos: "Adesivos"
};

export const products: ProductItem[] = [
  {
    id: "p1",
    slug: "manual-fusca-1973-restaurado",
    name: "Manual do Proprietário Fusca 1973 Restaurado",
    shortDescription: "Edição de coleção em papel envelhecido com acabamento premium.",
    description:
      "Manual restaurado página a página com tratamento de cor editorial, capa em laminação fosca toque aveludado e reprodução fiel da diagramação original VW.",
    price: 89.9,
    compareAtPrice: 119.9,
    category: "fusca",
    vehicle: "Fusca",
    model: "1300",
    yearStart: 1973,
    yearEnd: 1974,
    type: "fisico",
    premium: true,
    stock: 28,
    badges: ["NOVO", "PREMIUM"],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/ODHfPkB0-4U",
    paperFinish: "Papel pólen 120g com laminação fosca anti-risco e lombada costurada.",
    shippingDeadline: "Envio em até 24h úteis + frete rápido com rastreio.",
    compatibility: ["Fusca 1300 1973", "Fusca 1300L 1974", "Fusca Itamar clássico"],
    relatedSlugs: ["manual-opala-1983-premium", "kit-fusca-porta-manual-premium", "pack-adesivos-vintage-garage"]
  },
  {
    id: "p2",
    slug: "manual-opala-1983-premium",
    name: "Manual do Proprietário Opala 1983 Premium",
    shortDescription: "Reprodução rara para acervo e restauração fiel.",
    description: "Material com impressão de alto contraste, tons retrô e revisão técnica completa para colecionadores exigentes.",
    price: 92.9,
    category: "opala",
    vehicle: "Opala",
    model: "Comodoro",
    yearStart: 1983,
    yearEnd: 1984,
    type: "fisico",
    premium: true,
    stock: 13,
    badges: ["PREMIUM", "COLECAO"],
    images: [
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617654112368-307921291f42?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/UQJwM6N4Qw0",
    paperFinish: "Capa rígida fosca com verniz localizado e miolo em papel off-white 115g.",
    shippingDeadline: "Produção artesanal e envio em até 2 dias úteis.",
    compatibility: ["Opala Comodoro 1983", "Opala Diplomata 1984"],
    relatedSlugs: ["manual-fusca-1973-restaurado", "kit-opala-colecionador"]
  },
  {
    id: "p3",
    slug: "kit-fusca-porta-manual-premium",
    name: "Kit Premium Fusca + Porta Manual de Couro",
    shortDescription: "Kit completo com manual, porta-documentos e selos vintage.",
    description: "Ideal para encontros de antigos: manual restaurado, porta manual em couro ecológico caramelo e adesivos comemorativos.",
    price: 179.9,
    compareAtPrice: 219.9,
    category: "kits",
    vehicle: "Fusca",
    model: "1500",
    yearStart: 1970,
    yearEnd: 1978,
    type: "fisico",
    premium: true,
    stock: 9,
    badges: ["PREMIUM"],
    images: [
      "https://images.unsplash.com/photo-1549399812-b9286f10ff9f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/eQGf0iYbJxA",
    paperFinish: "Manual com caixa protetora + porta manual texturizado com relevo.",
    shippingDeadline: "Envio em 48h úteis com embalagem de colecionador.",
    compatibility: ["Fusca 1300", "Fusca 1500", "Fusca 1600"],
    relatedSlugs: ["manual-fusca-1973-restaurado", "pack-adesivos-vintage-garage"]
  },
  {
    id: "p4",
    slug: "pack-adesivos-vintage-garage",
    name: "Pack Adesivos Vintage Garage (12 unidades)",
    shortDescription: "Coleção premium com marcas clássicas automotivas.",
    description: "Adesivos com acabamento fosco e corte especial, inspirados em postos e oficinas dos anos 70 e 80.",
    price: 49.9,
    category: "adesivos",
    vehicle: "Multimarcas",
    model: "Coleção",
    yearStart: 1968,
    yearEnd: 1992,
    type: "fisico",
    premium: false,
    stock: 42,
    badges: ["NOVO"],
    images: [
      "https://images.unsplash.com/photo-1566024287286-457247ff2fd7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1562141961-4f0c8d29f824?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/OJVE6YRL6f8",
    paperFinish: "Vinil premium resistente a UV e água, toque acetinado.",
    shippingDeadline: "Postagem em 24h úteis.",
    compatibility: ["Lataria", "Vidro", "Mala", "Garagem"],
    relatedSlugs: ["kit-fusca-porta-manual-premium", "manual-gol-quadrado-1990-pdf"]
  },
  {
    id: "p5",
    slug: "manual-gol-quadrado-1990-pdf",
    name: "Manual Gol Quadrado 1990 (PDF HD)",
    shortDescription: "Download imediato com restauração digital completa.",
    description: "Versão digital em altíssima definição para pesquisa e impressão, com índice navegável e páginas corrigidas.",
    price: 39.9,
    category: "pdfs",
    vehicle: "Gol",
    model: "Quadrado CL",
    yearStart: 1989,
    yearEnd: 1992,
    type: "pdf",
    premium: true,
    stock: 999,
    badges: ["PREMIUM"],
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/aQ9M5JfX3j8",
    paperFinish: "PDF com textura vintage digital, pronto para impressão A4.",
    shippingDeadline: "Entrega imediata após confirmação de pagamento.",
    compatibility: ["Gol CL 1.6 1989", "Gol GL 1.8 1990", "Voyage da mesma plataforma"],
    relatedSlugs: ["pack-adesivos-vintage-garage", "manual-fusca-1973-restaurado"]
  },
  {
    id: "p6",
    slug: "kit-opala-colecionador",
    name: "Kit Opala Colecionador + Quadro Vintage",
    shortDescription: "Manual, quadro artístico e selo de autenticidade.",
    description: "Kit de alto valor percebido para decorar garagem de clássicos com curadoria editorial e acabamento museu.",
    price: 249.9,
    category: "kits",
    vehicle: "Opala",
    model: "SS",
    yearStart: 1978,
    yearEnd: 1986,
    type: "fisico",
    premium: true,
    stock: 6,
    badges: ["COLECAO", "PREMIUM"],
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/tt5Y7q8B9q8",
    paperFinish: "Quadro com impressão fine art e passe-partout envelhecido.",
    shippingDeadline: "Envio segurado em até 3 dias úteis.",
    compatibility: ["Opala SS", "Opala Especial", "Caravan"],
    relatedSlugs: ["manual-opala-1983-premium", "pack-adesivos-vintage-garage"]
  }
];

export const featuredSlugs = [
  "manual-fusca-1973-restaurado",
  "manual-opala-1983-premium",
  "kit-fusca-porta-manual-premium",
  "pack-adesivos-vintage-garage"
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
