import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';

const WishlistContext = createContext();

const STORAGE_KEY = 'euphoria_wishlist';

export function WishlistProvider({ children }) {
  const { addToCart } = useCart();

  // Start with empty wishlist by default, or load existing user items from localStorage
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      // Clean up any old mock wishlist items from previous versions
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse errors
    }
    return [];
  });

  // Persist wishlist changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    if (!product) return;
    setWishlistItems((prev) => {
      if (prev.some((item) => String(item.id) === String(product.id))) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => String(item.id) !== String(productId))
    );
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const moveToCart = (product) => {
    if (!product) return;
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || 'Default', 1);
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore error
    }
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
