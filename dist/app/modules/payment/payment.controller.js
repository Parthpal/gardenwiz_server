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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const paymentIntentCreationC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield payment_service_1.paymentServices.createPaymentIntentS(req.body);
        // send response with created user
        console.log(paymentIntent);
        res.status(200).json({
            success: true,
            // message:'client secret code created successfully',
            clientSecret: paymentIntent.client_secret
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            // message:'payment Data Posted failed',
            error: error.message
        });
    }
});
const paymentCreationC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield payment_service_1.paymentServices.createPaymentS(req.body);
        // send response with created user
        // console.log(post);
        res.status(200).json({
            success: true,
            message: 'payment Data Posted successfully',
            data: post
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'payment Data Posted failed',
            error: error.message
        });
    }
});
const getPaymentC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield payment_service_1.paymentServices.getPaymentS();
        res.status(200).json({
            success: true,
            message: 'payment data found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'payment data not found',
            error: 'An unknown error occurred'
        });
    }
});
exports.paymentController = {
    paymentCreationC,
    paymentIntentCreationC,
    getPaymentC
};
