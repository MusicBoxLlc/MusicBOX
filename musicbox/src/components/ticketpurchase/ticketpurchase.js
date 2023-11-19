import React, { useState } from 'react';

const TicketPurchase = () => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(50); // Assuming ticket price is $50
  const [paymentMethod, setPaymentMethod] = useState('credit card');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    setTicketQuantity(quantity);
    setTotalPrice(quantity * 50); // Update total price based on ticket quantity
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePurchase = async () => {
    // Simulated payment process using a hypothetical API endpoint
    const paymentData = {
      quantity: ticketQuantity,
      totalAmount: totalPrice,
      paymentMethod: paymentMethod,
    };

    try {
      const response = await fetch('https://yourbackend.com/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Payment failed. Please try again.');
      }

      setIsPaymentSuccessful(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="ticket-purchase-container">
      <h2>Ticket Purchase</h2>
      <div>
        <label>Select Quantity:</label>
        <input
          type="number"
          min="1"
          value={ticketQuantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div>
        <label>Total Price:</label>
        <p>${totalPrice}</p>
      </div>
      <div>
        <label>Select Payment Method:</label>
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="credit card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>
      <button onClick={handlePurchase}>Purchase</button>
      {error && <p>Error: {error}</p>}
      {isPaymentSuccessful && <p>Payment successful! Ticket(s) purchased.</p>}
    </div>
  );
};

export default TicketPurchase;
