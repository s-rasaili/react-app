import React from 'react';
import { CartProvider } from './context/CartContext';
import ShoppingCart from './components/ShoppingCart';
import './assets/styles/Cart.css';
import './assets/styles/Sidebar.css';
import './assets/styles/Modal.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <ShoppingCart />
      </div>
    </CartProvider>
  );
}

export default App;
