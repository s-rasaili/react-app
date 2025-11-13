import React, { useState } from 'react';

const PaymentSection = () => {
  const [selectedPayment, setSelectedPayment] = useState('prepaid');

  return (
    <div className="payment-section">
      <h3>Select Payment method</h3>
      <div className="payment-options">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="prepaid"
            checked={selectedPayment === 'prepaid'}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span>Prepaid Pay (Get 3% discount)</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="partial"
            checked={selectedPayment === 'partial'}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span>Partial Payment(10%)</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedPayment === 'cod'}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
      </div>
      <div className="trust-badge">
        <strong>Trusted by over 10K+ farmers</strong>
      </div>
    </div>
  );
};

export default PaymentSection;
