import { z } from "zod";

const categoryValidationSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: 'Category is required',
      }),
    }),
  });

  export const catValidation = {
    categoryValidationSchema,
  };