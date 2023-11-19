class PaymentService {
    constructor(paymentGateway) {
      this.paymentGateway = paymentGateway;
    }
  
    async processPayment(userId, amount, cardDetails) {
      try {
        // Authenticate user and validate payment details
        const isValidUser = await this.validateUser(userId);
        const isValidPayment = this.validatePaymentDetails(cardDetails);
  
        if (!isValidUser || !isValidPayment) {
          throw new Error('Invalid user or payment details.');
        }
  
        // Process payment through the payment gateway
        const paymentResult = await this.paymentGateway.chargeCard(amount, cardDetails);
  
        if (paymentResult.success) {
          // Payment successful, log transaction or update user's payment history
          await this.logTransaction(userId, amount);
          return 'Payment processed successfully.';
        } else {
          throw new Error('Payment failed.');
        }
      } catch (error) {
        throw new Error(`Error processing payment: ${error.message}`);
      }
    }
  
    async validateUser(userId) {
      // Simulated user validation, could involve database checks or authentication services
      // Returning true for demonstration purposes
      return true;
    }
  
    validatePaymentDetails(cardDetails) {
      // Simulated validation of card details
      // Check card number, expiry date, CVV, etc.
      // Returning true for demonstration purposes
      return true;
    }
  
    async logTransaction(userId, amount) {
      // Simulated logging of transaction, could involve updating user's payment history in a database
      // Placeholder function, no actual implementation
      console.log(`Transaction logged: User ${userId} paid $${amount}`);
    }
  }
  
  // Example usage:
  // Create an instance of PaymentGateway (e.g., Stripe, PayPal, etc.)
  const paymentGateway = new PaymentGateway(); // Simulated payment gateway
  
  // Create an instance of PaymentService
  const paymentService = new PaymentService(paymentGateway);
  
  // Usage example
  const userId = 'user123';
  const amount = 100;
  const cardDetails = {
    cardNumber: '1234567890123456',
    expiryDate: '12/25',
    cvv: '123'
  };
  
  paymentService.processPayment(userId, amount, cardDetails)
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  