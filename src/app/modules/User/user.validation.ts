import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const createUserValidationSchema = z.object({
    body: z.object({
      name: z.string({
        required_error: 'Name is required',
      }),
      role: z.nativeEnum(USER_ROLE),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({
          message: 'Invalid email',
        }),
      password: z.string({
        required_error: 'Password is required',
      }),
      status: z.nativeEnum(USER_STATUS).default(USER_STATUS.BASIC),
    }),
  });

  export const UserValidation = {
    createUserValidationSchema,
  };