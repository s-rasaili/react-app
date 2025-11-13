import React from 'react';

const CartHeader = ({ itemCount }) => {
  const handleProceedToPay = () => {
    alert('Proceeding to payment...');
  };

  return (
    <div className="cart-header">
      <h2>Shopping Cart ({itemCount} items in list)</h2>
      <button className="proceed-btn" onClick={handleProceedToPay}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default CartHeader;
