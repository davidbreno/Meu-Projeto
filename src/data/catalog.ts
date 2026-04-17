export type ProductItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  includes: string[];
  rating: number;
  reviewCount: number;
};

export const products: ProductItem[] = [
  {
    id: "pdf-01",
    slug: "camisa-infantil",
    name: "Camisa infantil",
    shortDescription: "Molde em PDF com versão manga curta e longa.",
    description:
      "Molde digital completo para camisa infantil com passo a passo ilustrado, tabela de medidas e instruções de impressão em casa (A4).",
    price: 24.9,
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=1200&q=80",
    sizes: ["2", "4", "6", "8", "10"],
    includes: ["Molde em A4", "Molde em A0", "Guia de impressão", "Passo a passo PDF"],
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "pdf-02",
    slug: "vestido-dora",
    name: "Vestido Dora",
    shortDescription: "Vestido rodado com variação de manga bufante.",
    description: "Modelagem feminina delicada para festa e dia a dia, com acabamento impecável e marcações de costura facilitadas.",
    price: 36,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80",
    sizes: ["PP", "P", "M", "G", "GG"],
    includes: ["Molde em A4", "Molde em A0", "Guia de encaixe", "Tutorial em vídeo"],
    rating: 4.9,
    reviewCount: 207
  },
  {
    id: "pdf-03",
    slug: "jardineira-luca",
    name: "Jardineira Luca",
    shortDescription: "Jardineira unissex infantil com bolso frontal.",
    description: "Arquivo pensado para produção em pequena escala com encaixe inteligente e instruções para tecido plano.",
    price: 34,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    sizes: ["1", "2", "4", "6"],
    includes: ["Molde em A4", "Molde em A0", "Ficha técnica", "Checklist de montagem"],
    rating: 4.7,
    reviewCount: 98
  },
  {
    id: "pdf-04",
    slug: "salopete-cora",
    name: "Salopete Cora",
    shortDescription: "Salopete infantil charmosa com recorte evasê.",
    description: "Modelagem digital para costureiras iniciantes e avançadas. Estrutura limpa e excelente vestibilidade.",
    price: 29.9,
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=80",
    sizes: ["2", "4", "6", "8"],
    includes: ["Molde em A4", "Molde em A0", "Passo a passo ilustrado", "Tabela de consumo"],
    rating: 4.6,
    reviewCount: 77
  },
  {
    id: "pdf-05",
    slug: "blusa-lia",
    name: "Blusa Lia",
    shortDescription: "Blusa feminina com decote quadrado elegante.",
    description: "Molde feminino moderno com instruções para ajuste de busto e cintura, ideal para tecido leve.",
    price: 22,
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80",
    sizes: ["PP", "P", "M", "G", "GG"],
    includes: ["Molde em A4", "Molde em A0", "Guia de ajustes", "Vídeo de montagem"],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: "pdf-06",
    slug: "shorts-bloomer",
    name: "Shorts Bloomer",
    shortDescription: "Short infantil confortável com elástico suave.",
    description: "Projeto rápido com acabamento limpo e instruções para produção em série artesanal.",
    price: 20,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    sizes: ["P", "M", "G"],
    includes: ["Molde em A4", "Guia de costura rápida", "Ficha de medidas"],
    rating: 4.5,
    reviewCount: 63
  },
  {
    id: "pdf-07",
    slug: "conjunto-olivia",
    name: "Conjunto Olivia",
    shortDescription: "Conjunto feminino com saia e blusa coordenadas.",
    description: "Conjunto elegante para coleção cápsula. Inclui orientações de gradação e acabamento premium.",
    price: 58,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    sizes: ["P", "M", "G", "GG"],
    includes: ["2 moldes completos", "Arquivo A4 e A0", "Guia de tecidos", "Aula bônus"],
    rating: 4.9,
    reviewCount: 54
  },
  {
    id: "pdf-08",
    slug: "macacao-duda",
    name: "Macacão Duda",
    shortDescription: "Macacão infantil prático com frente cruzada.",
    description: "Modelagem charmosa para peças autorais com instruções de acabamento interno e variação de alça.",
    price: 42,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    sizes: ["1", "2", "4", "6", "8"],
    includes: ["Molde em A4", "Molde em A0", "Passo a passo", "Lista de materiais"],
    rating: 4.7,
    reviewCount: 88
  }
];

export const faqItems = [
  {
    question: "Como recebo meus moldes?",
    answer: "Após a confirmação do pagamento, o download é liberado na hora na tela de sucesso e também enviado por e-mail."
  },
  {
    question: "Posso imprimir em casa?",
    answer: "Sim. Todos os produtos incluem versão A4 para impressão doméstica e guia de montagem."
  },
  {
    question: "Por quanto tempo o link fica ativo?",
    answer: "O link de download expira em 6 meses, com limite de tentativas para proteção do conteúdo digital."
  },
  {
    question: "Vocês vendem produto físico?",
    answer: "Não. Esta loja comercializa apenas arquivos digitais em PDF."
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
}
