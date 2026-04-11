import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  cpf: z.string().optional()
});
