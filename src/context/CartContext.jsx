import React, { createContext, useContext, useState } from 'react';
import productBlueFlowerTop from '../assets/images/amirkhon/products/product-blue-flower-top.webp';
import productLavenderHoodie from '../assets/images/amirkhon/products/product-lavender-hoodie.webp';
import productBlackSweatshirt from '../assets/images/amirkhon/products/product-black-sweatshirt.webp';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Pre-seed matching Screenshot 1 & 2
  const [cartItems, setCartItems] = useState([
    {
      id: 201,
      cartId: 'item-1',
      title: 'Blue Flower Print Crop Top',
      brand: "Euphoria Women's",
      price: 29.00,
      selectedSize: 'M',
      selectedColor: 'Yellow',
      shippingType: 'FREE',
      image: productBlueFlowerTop,
      quantity: 1
    },
    {
      id: 202,
      cartId: 'item-2',
      title: 'Lavender Hoodie',
      brand: "Nike's Brand",
      price: 119.00,
      selectedSize: 'XXL',
      selectedColor: 'Lavender',
      shippingType: 'FREE',
      image: productLavenderHoodie,
      quantity: 2
    },
    {
      id: 203,
      cartId: 'item-3',
      title: 'Black Sweatshirt',
      brand: "Jhanvi's Brand",
      price: 123.00,
      selectedSize: 'XXL',
      selectedColor: 'Black',
      shippingType: '$5.00',
      image: productBlackSweatshirt,
      quantity: 2
    }
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(30.00); // $30 savings matching Screenshot 2
  const [shippingFee] = useState(5.00);

  const addToCart = (product, size = 'M', color = 'Default', quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartId: `cart-${Date.now()}-${Math.random()}`,
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
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const applyCoupon = (code) => {
    if (!code) return { success: false, message: 'Please enter a code' };
    const upper = code.trim().toUpperCase();
    if (upper === 'EUPHORIA20' || upper === 'SAVE30' || upper === 'DISCOUNT') {
      setAppliedCoupon(upper);
      setDiscountAmount(30.00);
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = Math.max(0, cartSubtotal + shippingFee - (appliedCoupon ? discountAmount : 0));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
  return useContext(CartContext);
}
