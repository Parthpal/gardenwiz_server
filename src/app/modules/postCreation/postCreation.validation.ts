import { z } from "zod";

const categoryValidationSchema = z.object({
    body: z.object({
        title: z.string().min(3, 'Title must be at least 3 characters long'),
        content: z.string().min(10, 'Content must be at least 10 characters long'),
        userID: z.string().length(24, 'Invalid user ID format'),
        categoryID: z.string().length(24, 'Invalid category ID format'),
        images: z.array(z.string()).optional(),
        premium: z.boolean(),
        upvotes: z.number().nonnegative(),
        downvotes: z.number().nonnegative(),
    }),
  });

  export const catValidation = {
    categoryValidationSchema,
  };