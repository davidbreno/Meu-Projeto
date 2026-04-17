type DownloadEntry = {
  productId: string;
  expiresAt: number;
  remaining: number;
};

const store = new Map<string, DownloadEntry>();

export function createDownloadToken(productId: string) {
  const token = crypto.randomUUID();
  const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

  store.set(token, {
    productId,
    expiresAt: Date.now() + SIX_MONTHS_MS,
    remaining: 5
  });

  return token;
}

export function consumeDownloadToken(token: string) {
  const entry = store.get(token);
  if (!entry) return null;
  if (entry.expiresAt < Date.now()) return { error: "expired" as const };
  if (entry.remaining <= 0) return { error: "limit" as const };

  entry.remaining -= 1;
  store.set(token, entry);

  return { productId: entry.productId, remaining: entry.remaining };
}
