import { IPaymentDetails, PaymentDetailsModel } from "./payment.model";
import Stripe from 'stripe';

//const stripe = require("stripe")('sk_test_51OFj8sLwl5tXPPRvyzjJzwHBOr1qZqgVfqMMfqgl6triaCIpXNUqaNBprDjwclvyneGcLd3Mh6SX8Uf6KMwvdGqy00Uja77TJR');
const stripe = new Stripe('sk_test_51OFj8sLwl5tXPPRvyzjJzwHBOr1qZqgVfqMMfqgl6triaCIpXNUqaNBprDjwclvyneGcLd3Mh6SX8Uf6KMwvdGqy00Uja77TJR');

const createPaymentS=async(payload:IPaymentDetails)=>{
    const paymentDetails=PaymentDetailsModel.create(payload)
    return paymentDetails
}

const createPaymentIntentS=async(payload:any)=>{
  try {
    const { price } = payload;
    console.log(price, "amount intent");
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount:  Math.round(price*100), // Convert to cents
      currency: "usd",
      payment_method_types: ["card"], // Optional in the latest API
    });
    console.log(paymentIntent);
    return paymentIntent;
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    throw error; // Re-throw the error to handle it in the caller function
  }
}

const getPaymentS=()=>{
  const result=PaymentDetailsModel.find();
  return result;
}
export const paymentServices = {
createPaymentS,
createPaymentIntentS,
getPaymentS
  };