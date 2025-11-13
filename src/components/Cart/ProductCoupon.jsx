import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';

const ProductCoupon = ({ itemId, coupons }) => {
  const { appliedCoupons, applyCoupon, removeCoupon } = useCartContext();
  const [selectedCoupon, setSelectedCoupon] = useState('');

  const appliedCoupon = appliedCoupons[itemId];

  const handleApplyCoupon = () => {
    if (!selectedCoupon) {
      alert('Please select a coupon');
      return;
    }

    const coupon = coupons.find(c => c.code === selectedCoupon);
    if (coupon) {
      applyCoupon(itemId, coupon.code, coupon.discount);
      alert(`Coupon ${coupon.code} applied! You saved ₹${coupon.discount}`);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon(itemId);
    setSelectedCoupon('');
    alert('Coupon removed');
  };

  return (
    <div className="product-coupon">
      {!appliedCoupon ? (
        <div className="coupon-row">
          <label>Apply Coupon:</label>
          <select
            className="coupon-dropdown"
            value={selectedCoupon}
            onChange={(e) => setSelectedCoupon(e.target.value)}
          >
            <option value="">Select a coupon</option>
            {coupons.map(coupon => (
              <option key={coupon.code} value={coupon.code}>
                {coupon.code} - {coupon.description} (Save ₹{coupon.discount})
              </option>
            ))}
          </select>
          <button className="coupon-apply-btn" onClick={handleApplyCoupon}>
            Apply
          </button>
        </div>
      ) : (
        <div className="coupon-applied">
          <span style={{ color: '#007600', fontSize: '14px' }}>
            ✓ Coupon {appliedCoupon.code} applied: ₹{appliedCoupon.discount} saved
          </span>
          <button 
            onClick={handleRemoveCoupon}
            style={{ 
              marginLeft: '10px', 
              background: 'none', 
              border: 'none', 
              color: 'red', 
              cursor: 'pointer',
              fontSize: '12px',
              textDecoration: 'underline'
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCoupon;
