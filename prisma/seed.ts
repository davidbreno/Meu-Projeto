import { PrismaClient, ProductType } from "@prisma/client";
const prisma = new PrismaClient();

const products = [
  ["fusca-itamar-1996","Fusca Itamar 1996",1996,true],
  ["fusca-1986","Fusca 1986",1986,false],
  ["opala-diplomata","Opala Diplomata",1990,false],
  ["caravan-comodoro","Caravan Comodoro",1988,false],
  ["chevette-sl","Chevette SL",1985,false],
  ["gol-gti-quadrado","Gol GTI quadrado",1994,false],
  ["kombi-clipper","Kombi Clipper",1997,false],
  ["santana-gls","Santana GLS",1992,false]
] as const;

async function main() {
  for (const [slug,title,year,featured] of products) {
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        slug,title,year,isFeatured: featured,
        description: `Manual restaurado de ${title}`,
        vehicle: title,brand: title.split(" ")[0],model: title,category: "Manual do proprietário",
        type: ProductType.MANUAL,quality: "Alta",price: 39.9,coverUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",pdfUrl: "https://example.com/manual.pdf"
      }
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: "default-settings" },
    update: {},
    create: { id: "default-settings", storeName: "Manuais Raros", whatsapp: "+55 11 90000-0000", homeTexts: { hero: "Manuais raros" }, colors: { primary: "#B89B5E" }, fakeSocialProof: [{ name: "Carlos", text: "Excelente qualidade" }] }
  });
}

main().finally(()=>prisma.$disconnect());
