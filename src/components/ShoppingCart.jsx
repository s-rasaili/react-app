import React from 'react';
import { useCartContext } from '../context/CartContext';
import CartItem from './Cart/CartItem';
import CartHeader from './Cart/CartHeader';
import OrderSummary from './Sidebar/OrderSummary';
import DeliveryAddress from './Sidebar/DeliveryAddress';
import PaymentSection from './Sidebar/PaymentSection';
import BillingDetails from './Sidebar/BillingDetails';

const ShoppingCart = () => {
  const { cartItems, selectedItems, selectAll, deselectAll, calculateSubtotal } = useCartContext();

  return (
    <div className="container">
      <div className="page-layout">
        {/* Left Side - Cart Section */}
        <div className="cart-section">
          <CartHeader itemCount={cartItems.length} />

          <div className="cart-tabs">
            <button className="active">
              Shopping Cart ({cartItems.length} items in list)
            </button>
          </div>

          <div className="select-actions">
            <button onClick={selectAll}>Select all items</button>
            <button onClick={deselectAll}>De Select all items</button>
          </div>

          <div className="subtotal">
            Subtotal ({selectedItems.length} item): ₹ {calculateSubtotal().toFixed(2)}
          </div>

          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Right Side - Sidebar */}
        <div className="sidebar">
          <OrderSummary />
          <DeliveryAddress />
          <PaymentSection />
          <BillingDetails />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
