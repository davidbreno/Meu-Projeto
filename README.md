# Costurinha Digital (Next.js)

E-commerce de moldes digitais em PDF, com layout minimalista e foco em download automático após pagamento.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- API Routes para checkout e geração de links de download
- Estrutura pronta para Vercel

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

- `NEXT_PUBLIC_APP_URL`: URL base da aplicação
- `STRIPE_PAYMENT_LINK_URL`: link de pagamento Stripe (opcional; fallback local habilitado)

## Fluxo de compra

1. Cliente adiciona moldes no carrinho.
2. Em checkout, o backend retorna URL de pagamento Stripe.
3. Após pagamento, cliente acessa página de sucesso.
4. Botão **Download** gera link protegido com expiração em 6 meses e limite de downloads.

## Scripts

- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`
