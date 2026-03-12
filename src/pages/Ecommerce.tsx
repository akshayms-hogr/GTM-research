import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGTM } from '../hooks/useGTM';
import './Ecommerce.css';

const PRODUCTS = [
  { id: 'prod_1', name: 'GTM Masterclass', category: 'Education', price: 99.00 },
  { id: 'prod_2', name: 'Analytics Pro Kit', category: 'Tools', price: 149.00 },
  { id: 'prod_3', name: 'Data Layer Debugger', category: 'Software', price: 29.00 },
  { id: 'prod_4', name: 'Tag Audit Service', category: 'Service', price: 499.00 },
];

export const Ecommerce: React.FC = () => {
  const { pushEvent } = useGTM();
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCart([...cart, product]);
    
    // GA4 view_item event research
    pushEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      }
    });
  };

  const handlePurchase = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    
    pushEvent({
      event: 'purchase',
      ecommerce: {
        transaction_id: `T_${Math.floor(Math.random() * 100000)}`,
        value: total,
        currency: 'USD',
        items: cart.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: 1
        }))
      }
    });

    setCart([]);
    alert('Purchase successful! Check the Data Layer Monitor for GA4 event data.');
  };

  return (
    <div className="ecommerce-container">
      <header className="shop-header">
        <div>
          <h2 className="section-title">E-commerce Simulator</h2>
          <p className="section-description">Research GA4 Enhanced E-commerce event structures.</p>
        </div>
        <div className="cart-status">
          <ShoppingCart size={20} />
          {cart.length} Items ({cart.reduce((acc, i) => acc + i.price, 0).toFixed(2)})
        </div>
      </header>

      <div className="products-grid">
        {PRODUCTS.map((product) => (
          <motion.div 
            key={product.id}
            className="product-card"
            whileHover={{ y: -5 }}
          >
            <div className="product-image">
              <ShoppingBag size={48} />
            </div>
            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                <Plus size={18} /> Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {cart.length > 0 && (
        <motion.div 
          className="checkout-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="product-name" style={{ color: '#2563eb' }}>Ready to Checkout?</h3>
          <p className="card-description">This will trigger a GA4 'purchase' event with all cart items.</p>
          <button className="btn-primary" onClick={handlePurchase}>
            Complete Purchase (${cart.reduce((acc, i) => acc + i.price, 0).toFixed(2)})
          </button>
        </motion.div>
      )}
    </div>
  );
};
