"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catValidation = void 0;
const zod_1 = require("zod");
const categoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Category is required',
        }),
    }),
});
exports.catValidation = {
    categoryValidationSchema,
};
