import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'euphoria_cart';

export function CartProvider({ children }) {
  // Start with empty cart by default, or load existing user items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out any legacy dummy/mock items (201, 202, 203)
          const realItems = parsed.filter(item => item.id !== 201 && item.id !== 202 && item.id !== 203);
          return realItems;
        }
      }
    } catch {
      // Ignore parse error
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0.00);
  const baseShippingFee = 5.00;

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      // Also clean up any legacy 'cart' key
      localStorage.removeItem('cart');
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (product, arg2 = 'M', arg3 = 'Default', arg4 = 1) => {
    if (!product) return;

    let size = 'M';
    let color = 'Default';
    let quantity = 1;

    // Support both signatures:
    // (product, size, color, quantity) AND (product, quantity, size, color)
    if (typeof arg2 === 'number') {
      quantity = Math.max(1, Math.round(arg2) || 1);
      size = typeof arg3 === 'string' && arg3.trim() && arg3 !== 'Default' ? arg3 : 'M';
      color = typeof arg4 === 'string' && arg4.trim() ? arg4 : (product.colors?.[0] || 'Default');
    } else {
      size = typeof arg2 === 'string' && arg2.trim() ? arg2 : 'M';
      color = typeof arg3 === 'string' && arg3.trim() ? arg3 : (product.colors?.[0] || 'Default');
      quantity = typeof arg4 === 'number' ? Math.max(1, Math.round(arg4) || 1) : 1;
    }

    const priceNum = typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;

    setCartItems(prev => {
      const existing = prev.find(
        item => String(item.id) === String(product.id) && item.selectedSize === size
      );
      if (existing) {
        return prev.map(item =>
          String(item.id) === String(product.id) && item.selectedSize === size
            ? { ...item, quantity: (Number(item.quantity) || 1) + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          price: priceNum,
          cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          selectedSize: size,
          selectedColor: color,
          shippingType: 'FREE',
          quantity
        }
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const currentQty = Number(item.quantity) || 1;
            const newQty = currentQty + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const applyCoupon = (code) => {
    if (!code) return { success: false, message: 'Please enter a coupon code' };
    const upper = code.trim().toUpperCase();
    if (upper === 'EUPHORIA20' || upper === 'SAVE30' || upper === 'DISCOUNT') {
      setAppliedCoupon(upper);
      setDiscountAmount(30.00);
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (Number(item.quantity) || 1),
    0
  );

  const shippingFee = cartItems.length > 0 ? baseShippingFee : 0;
  const grandTotal = cartItems.length > 0
    ? Math.max(0, cartSubtotal + shippingFee - (appliedCoupon ? discountAmount : 0))
    : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        discountAmount,
        appliedCoupon,
        applyCoupon,
        grandTotal
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
