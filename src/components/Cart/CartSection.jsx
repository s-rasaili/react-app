import React from 'react';
import { useCartContext } from '../../context/CartContext';
import CartHeader from './CartHeader';
import CartItem from './CartItem';

const CartSection = () => {
  const { cartItems, selectedItems, selectAll, deselectAll, calculateSubtotal } = useCartContext();

  return (
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
  );
};

export default CartSection;
