import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Pre-seed with initial items so the cart has lively items from start
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[1], // Blue Flower Print Crop Top ($29)
      cartId: 'item-1',
      selectedSize: 'M',
      selectedColor: 'Blue',
      quantity: 1
    },
    {
      ...PRODUCTS[2], // Lavender Hoodie ($49)
      cartId: 'item-2',
      selectedSize: 'L',
      selectedColor: 'Lavender',
      quantity: 2
    },
    {
      ...PRODUCTS[4], // Black Printed T-shirt ($32)
      cartId: 'item-3',
      selectedSize: 'XL',
      selectedColor: 'Black',
      quantity: 1
    }
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const addToCart = (product, quantity = 1, size = 'M', color = 'Default') => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          ...product,
          cartId: `cart-${Date.now()}-${Math.random()}`,
          selectedSize: size,
          selectedColor: color,
          quantity
        }
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const applyCoupon = (code) => {
    if (code.toUpperCase() === 'EUPHORIA20') {
      setAppliedCoupon('EUPHORIA20');
      return { success: true, message: '20% Discount Applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try EUPHORIA20' };
  };

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingFee = cartItems.length > 0 ? (cartSubtotal > 100 ? 0 : 5.00) : 0;

  useEffect(() => {
    if (appliedCoupon === 'EUPHORIA20') {
      setDiscountAmount(cartSubtotal * 0.2);
    } else {
      setDiscountAmount(0);
    }
  }, [cartSubtotal, appliedCoupon]);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
