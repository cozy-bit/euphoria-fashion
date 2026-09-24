import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { addToCart } = useCart();

  // Pre-seed wishlist with a couple of items
  const [wishlistItems, setWishlistItems] = useState([
    PRODUCTS[1], // Blue Flower Print Crop Top
    PRODUCTS[7], // Yellow Polka-Dot Dress
    PRODUCTS[3], // White Summer T-Shirt
    PRODUCTS[0]  // Raven Hoodie
  ]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const moveToCart = (product) => {
    addToCart(product, 1, 'M', 'Default');
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,
        clearWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
