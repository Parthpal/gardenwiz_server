"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidation = void 0;
const zod_1 = require("zod");
const paymentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(), // Validates as a proper email
        price: zod_1.z.number().positive(), // Must be a positive number
        transactionId: zod_1.z.string(), // Must be a string
        status: zod_1.z.enum(['pending', 'succeeded', 'failed', 'canceled']), // Restricts to valid statuses
    })
});
exports.paymentValidation = {
    paymentValidationSchema,
};
