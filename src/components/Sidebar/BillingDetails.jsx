import React, { useState, useMemo } from 'react';
import { useCartContext } from '../../context/CartContext';

const BillingDetails = () => {
  const { selectedItems, calculateRawSubtotal, calculateTotalCouponDiscount } = useCartContext();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const rawSubtotal = useMemo(() => calculateRawSubtotal(), [calculateRawSubtotal]);
  const itemCouponDiscount = useMemo(() => calculateTotalCouponDiscount(), [calculateTotalCouponDiscount]);
  const shippingPrice = selectedItems.length > 0 ? 50 : 0;
  const prepaidDiscount = rawSubtotal * 0.03;
  const orderTotal = rawSubtotal + shippingPrice - prepaidDiscount - itemCouponDiscount - appliedDiscount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert('Please enter a coupon code');
      return;
    }

    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }

    // Mock coupon validation
    const validCoupons = {
      'SAVE50': 50,
      'SAVE100': 100,
      'SAVE200': 200,
      'FARMER10': rawSubtotal * 0.1, // 10% off
    };

    const discountValue = validCoupons[couponCode.toUpperCase()];

    if (discountValue) {
      setAppliedDiscount(discountValue);
      alert(`Coupon "${couponCode}" applied successfully! You saved ₹${discountValue.toFixed(2)}`);
    } else {
      setAppliedDiscount(0);
      alert('Invalid coupon code. Try: SAVE50, SAVE100, SAVE200, or FARMER10');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(0);
    setCouponCode('');
  };

  return (
    <div className="billing-details">
      <h3>Billing Details</h3>
      
      {selectedItems.length === 0 ? (
        <div style={{ padding: '20px 0', textAlign: 'center', color: '#666' }}>
          Please select items to see billing details
        </div>
      ) : (
        <>
          <div className="billing-row">
            <span>Total Price</span>
            <span>₹ {rawSubtotal.toFixed(2)}</span>
          </div>
          
          <div className="billing-row">
            <span>Shipping Price</span>
            <span>+ ₹ {shippingPrice.toFixed(2)}</span>
          </div>
          
          {itemCouponDiscount > 0 && (
            <div className="billing-row">
              <span>Item Coupon Discount</span>
              <span style={{ color: '#007600' }}>- ₹ {itemCouponDiscount.toFixed(2)}</span>
            </div>
          )}
          
          {prepaidDiscount > 0 && (
            <div className="billing-row">
              <span>Prepaid Discount (3%)</span>
              <span style={{ color: '#007600' }}>- ₹ {prepaidDiscount.toFixed(2)}</span>
            </div>
          )}
          
          {appliedDiscount > 0 && (
            <div className="billing-row">
              <span>
                Coupon Code Discount
                <button 
                  onClick={handleRemoveCoupon}
                  style={{ 
                    marginLeft: '10px', 
                    background: 'none', 
                    border: 'none', 
                    color: 'red', 
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ✕ Remove
                </button>
              </span>
              <span style={{ color: '#007600' }}>- ₹ {appliedDiscount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="billing-row total">
            <span>Order Total</span>
            <span style={{ color: '#b12704' }}>₹ {orderTotal.toFixed(2)}</span>
          </div>
          
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code (Try: SAVE50 or FARMER10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
            />
            <button onClick={handleApplyCoupon}>Apply</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BillingDetails;
