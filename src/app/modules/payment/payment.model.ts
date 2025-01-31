import mongoose, { Schema, Document, model } from 'mongoose';
import { PaymentDetails } from './payment.interface';

// Extend Document to use the PaymentDetails interface
export interface IPaymentDetails extends Document, PaymentDetails {}

const paymentDetailsSchema = new Schema<IPaymentDetails>({
  email: { type: String, required: true },
  price: { type: Number, required: true },
  transactionId: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'canceled'],
    required: true,
  },
});

export const PaymentDetailsModel = model<IPaymentDetails>(
  'PaymentDetails',
  paymentDetailsSchema
);
