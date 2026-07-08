import { z } from "zod";

export const createCategoryValidation = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});