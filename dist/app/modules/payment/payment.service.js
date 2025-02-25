"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentServices = void 0;
const payment_model_1 = require("./payment.model");
const stripe_1 = __importDefault(require("stripe"));
//const stripe = require("stripe")('sk_test_51OFj8sLwl5tXPPRvyzjJzwHBOr1qZqgVfqMMfqgl6triaCIpXNUqaNBprDjwclvyneGcLd3Mh6SX8Uf6KMwvdGqy00Uja77TJR');
const stripe = new stripe_1.default('sk_test_51OFj8sLwl5tXPPRvyzjJzwHBOr1qZqgVfqMMfqgl6triaCIpXNUqaNBprDjwclvyneGcLd3Mh6SX8Uf6KMwvdGqy00Uja77TJR');
const createPaymentS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentDetails = payment_model_1.PaymentDetailsModel.create(payload);
    return paymentDetails;
});
const createPaymentIntentS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { price } = payload;
        console.log(price, "amount intent");
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(price * 100), // Convert to cents
            currency: "usd",
            payment_method_types: ["card"], // Optional in the latest API
        });
        console.log(paymentIntent);
        return paymentIntent;
    }
    catch (error) {
        console.error("Error creating payment intent:", error.message);
        throw error; // Re-throw the error to handle it in the caller function
    }
});
const getPaymentS = () => {
    const result = payment_model_1.PaymentDetailsModel.find();
    return result;
};
exports.paymentServices = {
    createPaymentS,
    createPaymentIntentS,
    getPaymentS
};
