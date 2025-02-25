"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/payments', payment_controller_1.paymentController.paymentCreationC);
router.post('/create-payment-intent', payment_controller_1.paymentController.paymentIntentCreationC);
router.get('/payments', payment_controller_1.paymentController.getPaymentC);
exports.paymentRoutes = router;
