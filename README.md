# Manuais Raros de Carros Antigos

## Instalação
```bash
npm install
cp .env.example .env
```

## Banco de dados / Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Rodar local
```bash
npm run dev
```

## Asaas Sandbox (PIX)
1. Configure `ASAAS_API_KEY` e `ASAAS_BASE_URL`.
2. Aponte webhook para `/api/webhooks/asaas`.
3. Use `ASAAS_WEBHOOK_SECRET` no header `asaas-access-token`.

## Testar webhook
```bash
curl -X POST http://localhost:3000/api/webhooks/asaas \
  -H 'Content-Type: application/json' \
  -H 'asaas-access-token: webhook_secret' \
  -d '{"payment":{"status":"RECEIVED","externalReference":"ORDER_ID"}}'
```

## Testes
```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

## Deploy na Vercel
- Conecte repositório na Vercel.
- Configure variáveis de ambiente do `.env.example`.
- Use banco PostgreSQL gerenciado.
