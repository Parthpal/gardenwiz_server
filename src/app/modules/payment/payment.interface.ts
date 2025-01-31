export interface PaymentDetails {
    email: string;          // User's email address
    price: number;          // Membership price or amount paid
    transactionId: string;  // ID of the payment transaction
    status: 'pending' | 'succeeded' | 'failed' | 'canceled'; // Payment status
  }
  