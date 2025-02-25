"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catValidation = exports.commentSchema = void 0;
const zod_1 = require("zod");
exports.commentSchema = zod_1.z.object({
    userID: zod_1.z.string().length(24, 'Invalid user ID format'), // Assuming userID is a UUID, use z.string() for ObjectId in MongoDB
    comment: zod_1.z.string().optional(), // At least 1 character required
    createdAt: zod_1.z.date().optional() // Optional date field
});
const categoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters long'),
        content: zod_1.z.string().min(10, 'Content must be at least 10 characters long'),
        userID: zod_1.z.string().length(24, 'Invalid user ID format'),
        categoryID: zod_1.z.string().length(24, 'Invalid category ID format'),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        comments: zod_1.z.array(exports.commentSchema).optional(),
        // premium: z.boolean(),
        upvotes: zod_1.z.number().nonnegative(),
        downvotes: zod_1.z.number().nonnegative(),
    }),
});
exports.catValidation = {
    categoryValidationSchema,
};
