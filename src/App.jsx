import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Amirkhon's Pages
import HomePage from './pages/home/HomePage';
import ProductsListPage from './pages/products/ProductsListPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';

// Kibriyo's Pages
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import CheckEmailPage from './pages/auth/CheckEmailPage';
import VerificationPage from './pages/auth/VerificationPage';
import CreateNewPasswordPage from './pages/auth/CreateNewPasswordPage';
import ProductDetailPage from './pages/product-detail/ProductDetailPage';
import WishlistPage from './pages/wishlist/WishlistPage';
import MyOrdersPage from './pages/account/MyOrdersPage';
import OrderDetailsPage from './pages/account/OrderDetailsPage';

// Tolibov's Pages
import ConfirmedOrder from './pages/checkout/ConfirmedOrder';
import ContactDetailsPage from './pages/account/ContactDetailsPage';
import AddAddressPage from './pages/account/AddAddressPage';
import ErrorPage from './pages/error/ErrorPage';
import EmptyCart from './pages/cart/EmptyCart';
import EmptyWishlist from './pages/wishlist/EmptyWishlist';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <Routes>
              {/* Standalone Auth Routes (no main header/footer) */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/check-email" element={<CheckEmailPage />} />
              <Route path="/verification" element={<VerificationPage />} />
              <Route path="/create-new-password" element={<CreateNewPasswordPage />} />

              {/* Main Store Layout Routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/empty-cart" element={<EmptyCart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<ConfirmedOrder />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/empty-wishlist" element={<EmptyWishlist />} />
                <Route path="/orders" element={<MyOrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailsPage />} />
                <Route path="/profile" element={<ContactDetailsPage />} />
                <Route path="/profile/address/new" element={<AddAddressPage />} />
                
                {/* 404 Error page within or outside layout */}
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
