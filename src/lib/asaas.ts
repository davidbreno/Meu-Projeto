const headers = {
  access_token: process.env.ASAAS_API_KEY || "",
  "Content-Type": "application/json"
};
const base = process.env.ASAAS_BASE_URL || "https://api-sandbox.asaas.com/v3";

export async function createPixPayment(payload: { customer: string; value: number; description: string; externalReference: string; }) {
  const res = await fetch(`${base}/payments`, { method: "POST", headers, body: JSON.stringify({ ...payload, billingType: "PIX" }) });
  return res.json();
}

export async function getPaymentStatus(paymentId: string) {
  const res = await fetch(`${base}/payments/${paymentId}`, { headers });
  return res.json();
}

export function validateWebhook(signature?: string) {
  return signature === process.env.ASAAS_WEBHOOK_SECRET;
}
