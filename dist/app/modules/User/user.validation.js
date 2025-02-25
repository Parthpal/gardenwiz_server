"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email({
            message: 'Invalid email',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        status: zod_1.z.nativeEnum(user_constant_1.USER_STATUS).default(user_constant_1.USER_STATUS.BASIC),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
};
