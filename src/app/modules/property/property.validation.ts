import { z } from "zod";

export const createPropertyValidation = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    address: z.string(),
    city: z.string(),

    rent: z.number(),

    bedrooms: z.number(),

    bathrooms: z.number(),

    image: z.string().url(),

    categoryId: z.string(),
  }),
});