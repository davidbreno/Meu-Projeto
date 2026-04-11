import { describe, it, expect } from "vitest";
import { validateWebhook } from "../src/lib/asaas";

describe("asaas", () => {
  it("valida webhook", () => {
    process.env.ASAAS_WEBHOOK_SECRET = "abc";
    expect(validateWebhook("abc")).toBe(true);
    expect(validateWebhook("x")).toBe(false);
  });
});
