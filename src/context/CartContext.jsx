import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'UPL Electron – Broad-Spectrum Seed Treatment and Drenching Solution',
        price: 2329,
        quantity: 1,
        variant: '400gm',
        inStock: true,
        deliveryInfo: 'Free delivery Sat, 19 Jul',
        image: null,
        availableCoupons: [
          { code: 'SAVE10', description: '10% off', discount: 232 },
          { code: 'FIRSTBUY', description: '₹50 off', discount: 50 },
          { code: 'SEEDS20', description: '20% off on seeds', discount: 465 }
        ]
      },
      {
        id: 2,
        name: 'Premium Organic Seeds Pack',
        price: 1500,
        quantity: 1,
        variant: '250gm',
        inStock: true,
        deliveryInfo: 'Free delivery Sat, 19 Jul',
        image: null,
        availableCoupons: [
          { code: 'SAVE10', description: '10% off', discount: 150 },
          { code: 'BULK15', description: '15% off on bulk', discount: 225 }
        ]
      }
    ];
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [appliedCoupons, setAppliedCoupons] = useState({});

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (itemId, quantity) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    setSelectedItems(selected => selected.filter(id => id !== itemId));
    // Remove coupon if item is deleted
    const newCoupons = { ...appliedCoupons };
    delete newCoupons[itemId];
    setAppliedCoupons(newCoupons);
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(selected =>
      selected.includes(itemId)
        ? selected.filter(id => id !== itemId)
        : [...selected, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(cartItems.map(item => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const applyCoupon = (itemId, couponCode, discount) => {
    setAppliedCoupons(prev => ({
      ...prev,
      [itemId]: { code: couponCode, discount }
    }));
  };

  const removeCoupon = (itemId) => {
    const newCoupons = { ...appliedCoupons };
    delete newCoupons[itemId];
    setAppliedCoupons(newCoupons);
  };

  // Calculate subtotal for ONLY selected items
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Only calculate if item is selected
      if (selectedItems.includes(item.id)) {
        const itemTotal = item.price * item.quantity;
        const discount = appliedCoupons[item.id]?.discount || 0;
        return total + (itemTotal - discount);
      }
      return total;
    }, 0);
  };

  // Calculate total coupon discount for selected items
  const calculateTotalCouponDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        const discount = appliedCoupons[item.id]?.discount || 0;
        return total + discount;
      }
      return total;
    }, 0);
  };

  // Calculate subtotal without any discounts (for billing)
  const calculateRawSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + (item.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const value = {
    cartItems,
    selectedItems,
    appliedCoupons,
    updateQuantity,
    removeItem,
    toggleItemSelection,
    selectAll,
    deselectAll,
    applyCoupon,
    removeCoupon,
    calculateSubtotal,
    calculateTotalCouponDiscount,
    calculateRawSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
