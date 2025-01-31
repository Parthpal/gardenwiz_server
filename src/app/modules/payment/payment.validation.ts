import { z } from "zod";

const paymentValidationSchema = z.object({
    body:z.object({
            email: z.string().email(),         // Validates as a proper email
            price: z.number().positive(),      // Must be a positive number
            transactionId: z.string(),         // Must be a string
            status: z.enum(['pending', 'succeeded', 'failed', 'canceled']), // Restricts to valid statuses
          })
});

export const paymentValidation = {
    paymentValidationSchema,
  };