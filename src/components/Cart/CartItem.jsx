import React from 'react';
import { useCartContext } from '../../context/CartContext';
import ProductCoupon from './ProductCoupon';

const CartItem = ({ item }) => {
  const { selectedItems, toggleItemSelection, updateQuantity, removeItem } = useCartContext();

  const isSelected = selectedItems.includes(item.id);

  const handleAddToWishlist = () => {
    alert(`Added ${item.name} to wishlist`);
  };

  return (
    <div className="cart-item">
      <div className="item-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleItemSelection(item.id)}
        />
      </div>

      <div className="item-image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <i className="fas fa-box" style={{ fontSize: '40px', color: '#ccc' }}></i>
        )}
      </div>

      <div className="item-details">
        <h3>{item.name}</h3>
        <div className="item-price">₹ {item.price.toLocaleString()}.00</div>
        <div className="item-stock" style={{ color: item.inStock ? '#007600' : '#cc0c39' }}>
          {item.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <div className="item-variant">Variant {item.variant}</div>
        <div className="item-delivery">{item.deliveryInfo}</div>

        <div className="item-quantity">
          <label>Qty:</label>
          <select
            className="quantity-selector"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <ProductCoupon itemId={item.id} coupons={item.availableCoupons} />

        <div className="item-actions">
          <button onClick={() => removeItem(item.id)}>Delete</button>
          <button onClick={handleAddToWishlist}>Add to wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
