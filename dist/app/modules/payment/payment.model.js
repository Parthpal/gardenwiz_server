"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDetailsModel = void 0;
const mongoose_1 = require("mongoose");
const paymentDetailsSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    price: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'succeeded', 'failed', 'canceled'],
        required: true,
    },
});
exports.PaymentDetailsModel = (0, mongoose_1.model)('PaymentDetails', paymentDetailsSchema);
