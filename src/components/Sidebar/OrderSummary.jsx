import React, { useMemo } from 'react';
import { useCartContext } from '../../context/CartContext';

const OrderSummary = () => {
  const { selectedItems, calculateSubtotal } = useCartContext();
  
  // Use useMemo to optimize calculation
  const subtotal = useMemo(() => calculateSubtotal(), [calculateSubtotal]);
  const discount = useMemo(() => subtotal * 0.03, [subtotal]);
  const orderTotal = useMemo(() => subtotal - discount, [subtotal, discount]);

  const handleProceedToPay = () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to proceed');
      return;
    }
    alert(`Processing payment of ₹${orderTotal.toFixed(2)}`);
  };

  return (
    <div className="order-summary">
      <div className="order-total">₹ {orderTotal.toFixed(2)}</div>
      <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
        Order Total
      </div>
      {subtotal > 0 && (
        <div className="discount-badge">Get 3% Discount on Prepaid Payment</div>
      )}
      <div className="subtotal">
        Subtotal ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''}): ₹ {subtotal.toFixed(2)}
      </div>
      <button className="proceed-btn" onClick={handleProceedToPay}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default OrderSummary;
