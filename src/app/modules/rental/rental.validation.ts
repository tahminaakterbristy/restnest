import { z } from "zod";

export const createRentalValidation = z.object({
  body: z.object({
    propertyId: z.string(),
    moveInDate: z.string(),
  }),
});