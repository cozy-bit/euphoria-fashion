import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import EmptyCart from './EmptyCart';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingFee,
    discountAmount,
    appliedCoupon,
    applyCoupon,
    cartTotal,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    setCouponFeedback(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Add To Cart', to: '/cart' }
        ]}
      />

      <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E6] mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
            Shopping Cart
          </h1>
          <p className="text-xs text-[#807D7E] font-semibold mt-1">
            Please verify the quantity and details of your clothing items.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ======================================================== */}
        {/* CART TABLE LIST                                          */}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Table Header (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-12 text-xs font-extrabold uppercase text-[#807D7E] pb-3 border-b border-[#E6E6E6] px-2">
            <span className="col-span-6">Product Details</span>
            <span className="col-span-2 text-center">Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          {/* Cart Item Rows */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-white border border-[#E6E6E6] rounded-2xl p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 shadow-2xs hover:shadow-xs transition-shadow"
              >
                {/* Details Column */}
                <div className="col-span-6 flex items-center gap-4 w-full">
                  <div className="w-20 h-24 rounded-xl bg-[#F6F6F6] overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm text-[#3C4242] leading-tight truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#807D7E] font-medium mt-1">
                      Color: <span className="font-bold text-[#3C4242]">{item.selectedColor || 'Default'}</span>
                    </p>
                    <p className="text-xs text-[#807D7E] font-medium">
                      Size: <span className="font-bold text-[#3C4242]">{item.selectedSize || 'M'}</span>
                    </p>
                  </div>
                </div>

                {/* Price Column */}
                <div className="col-span-2 text-center w-full sm:w-auto flex sm:flex-col justify-between items-center">
                  <span className="sm:hidden text-xs text-[#807D7E] font-bold">Price:</span>
                  <span className="font-bold text-sm text-[#3C4242]">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-2 flex justify-center w-full sm:w-auto">
                  <div className="flex items-center border border-[#E6E6E6] rounded-lg bg-[#F6F6F6] p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="w-7 h-7 rounded flex items-center justify-center text-[#3C4242] hover:bg-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-[#3C4242]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="w-7 h-7 rounded flex items-center justify-center text-[#3C4242] hover:bg-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal & Delete Column */}
                <div className="col-span-2 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <div className="flex items-center gap-1 sm:hidden">
                    <span className="text-xs text-[#807D7E] font-bold">Total:</span>
                  </div>
                  <span className="font-black text-sm text-[#8A33FD]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-[#807D7E] hover:text-red-500 p-1.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Strip */}
          <div className="bg-[#F6F6F6] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <h4 className="text-sm font-extrabold text-[#3C4242] flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#8A33FD]" />
                Discount Codes
              </h4>
              <p className="text-xs text-[#807D7E] font-medium mt-0.5">
                Enter your coupon code if you have one (e.g. <span className="font-bold text-[#8A33FD]">EUPHORIA20</span>)
              </p>
            </div>

            <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="bg-white border border-[#BEBCBD] rounded-lg px-3.5 py-2.5 text-xs font-bold text-[#3C4242] outline-none focus:border-[#8A33FD] uppercase"
              />
              <Button type="submit" variant="primary" size="sm">
                Apply Coupon
              </Button>
            </form>
          </div>

          {couponFeedback && (
            <p className={`text-xs font-bold ${couponFeedback.success ? 'text-green-600' : 'text-red-500'}`}>
              {couponFeedback.message}
            </p>
          )}

          <div className="pt-2">
            <Link
              to="/products"
              className="text-xs font-extrabold text-[#8A33FD] hover:underline flex items-center gap-1.5"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>

        </div>

        {/* ======================================================== */}
        {/* ORDER SUMMARY SIDEBAR                                    */}
        {/* ======================================================== */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
            <h3 className="font-black text-lg text-[#3C4242] pb-4 border-b border-[#E6E6E6]">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-xs font-semibold text-[#807D7E]">
              <div className="flex justify-between items-center">
                <span>Sub Total</span>
                <span className="font-bold text-[#3C4242] text-sm">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-bold text-[#3C4242]">
                  {shippingFee === 0 ? <span className="text-green-600 font-extrabold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-green-600 font-bold">
                  <span>Coupon Discount (20%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#E6E6E6] flex justify-between items-baseline text-base font-black text-[#3C4242]">
                <span>Grand Total</span>
                <span className="text-xl text-[#8A33FD] font-black">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              to="/checkout"
              variant="primary"
              size="lg"
              className="w-full text-center flex items-center justify-center gap-2"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-[#807D7E] font-medium flex items-center justify-center gap-1">
                🔒 Guaranteed Safe & Secure Checkout
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
