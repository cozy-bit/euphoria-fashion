import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import EmptyCart from './EmptyCart';

export default function CartPage() {
  const {
    cartItems,
    cartSubtotal,
    shippingFee,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    appliedCoupon,
    clearCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  const calculatedSubTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const calculatedGrandTotal = calculatedSubTotal + (cartItems.length > 0 ? shippingFee : 0);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8">
      
      {/* 1. BREADCRUMBS & NOTICE (Matches Screenshot 1) */}
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 text-sm text-[#807D7E]">
          <Link to="/" className="hover:text-[#3C4242] font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#3C4242] font-bold">Add To Cart</span>
        </nav>

        <div className="pt-2 text-xs sm:text-sm text-[#807D7E] leading-relaxed">
          <p>Please fill in the fields below and click place order to complete your purchase!</p>
          <p>
            Already registered?{' '}
            <Link to="/signin" className="text-[#8A33FD] font-bold hover:underline">
              Please login here
            </Link>
          </p>
        </div>
      </div>

      {/* Action Header: Item count & Clear All Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#3C4242]">
            Shopping Bag
          </h2>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#8A33FD]/10 text-[#8A33FD]">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="flex items-center gap-2 py-2 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
          title="Clear all items from cart"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      {/* 2. CART TABLE */}
      <div className="w-full overflow-hidden bg-white shadow-xs rounded-xl border border-[#BEBCBD]/30">
        
        {/* Table Header (Dark #3C4242, Matches Screenshot 1) */}
        <div className="bg-[#3C4242] text-white grid grid-cols-12 py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <div className="col-span-12 md:col-span-4">PRODUCT DETAILS</div>
          <div className="hidden md:block col-span-2 text-center">PRICE</div>
          <div className="hidden md:block col-span-2 text-center">QUANTITY</div>
          <div className="hidden md:block col-span-1 text-center">SHIPPING</div>
          <div className="hidden md:block col-span-2 text-center">SUBTOTAL</div>
          <div className="hidden md:block col-span-1 text-right">ACTION</div>
        </div>

        {/* Cart Item Rows */}
        <div className="divide-y divide-[#BEBCBD]/30">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="p-6 grid grid-cols-12 items-center gap-4 hover:bg-[#F6F6F6]/40 transition-colors"
            >
              {/* Product Details (Image + Titles) */}
              <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#F6F6F6] shrink-0 border border-[#BEBCBD]/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#3C4242] line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-xs text-[#807D7E]">
                    Color : {item.selectedColor}
                  </span>
                  <span className="text-xs text-[#807D7E]">
                    Size : {item.selectedSize}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-4 md:col-span-2 text-left md:text-center text-sm sm:text-base font-bold text-[#3C4242]">
                ${(Number(item.price) || 0).toFixed(2)}
              </div>

              {/* Quantity Counter */}
              <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                <div className="inline-flex items-center gap-3 bg-[#F6F6F6] border border-[#BEBCBD]/40 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-[#3C4242]">
                  <button
                    onClick={() => updateQuantity(item.cartId, -1)}
                    className="w-5 h-5 flex items-center justify-center hover:text-[#8A33FD] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    –
                  </button>
                  <span className="w-4 text-center">{Number(item.quantity) || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.cartId, 1)}
                    className="w-5 h-5 flex items-center justify-center hover:text-[#8A33FD] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Shipping */}
              <div className="col-span-4 md:col-span-1 text-center text-xs sm:text-sm font-bold text-[#807D7E] uppercase">
                {item.shippingType || 'FREE'}
              </div>

              {/* Subtotal */}
              <div className="hidden md:block col-span-2 text-center text-sm sm:text-base font-bold text-[#3C4242]">
                ${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toFixed(2)}
              </div>

              {/* Action (Delete Icon in Purple #8A33FD) */}
              <div className="col-span-12 md:col-span-1 flex justify-end">
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="p-2 text-[#8A33FD] hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* 3. BOTTOM SECTION: Discount Codes (Left) & Grand Total / Checkout (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Left Column: Discount Codes & Continue Shopping */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#3C4242]">
              Discount Codes
            </h3>
            <p className="text-xs sm:text-sm text-[#807D7E]">
              Enter your coupon code if you have one
            </p>
          </div>

          {/* Coupon Input Form */}
          <form onSubmit={handleApplyCoupon} className="flex items-center max-w-md w-full">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 py-3 px-4 border border-r-0 border-[#BEBCBD] rounded-l-xl text-sm focus:outline-none focus:border-[#8A33FD] text-[#3C4242] font-medium"
            />
            <button
              type="submit"
              className="py-3 px-6 bg-[#8A33FD] text-white text-sm font-bold rounded-r-xl hover:bg-[#6610F2] transition-colors cursor-pointer"
            >
              Apply Coupon
            </button>
          </form>

          {couponMessage && (
            <p className={`text-xs font-semibold ${couponMessage.success ? 'text-green-600' : 'text-red-500'}`}>
              {couponMessage.message}
            </p>
          )}

          {/* Action buttons: Continue Shopping + Clear All */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/products"
              className="py-2.5 px-6 border border-[#3C4242] rounded-xl text-sm font-bold text-[#3C4242] hover:bg-[#F6F6F6] transition-colors"
            >
              Continue Shopping
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="py-2.5 px-6 border border-red-200 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Proceed To Checkout */}
        <div className="lg:col-span-5 bg-[#F6F6F6] rounded-2xl p-8 flex flex-col gap-5 border border-[#BEBCBD]/30 shadow-xs">
          <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#3C4242]">
            <span>Sub Total</span>
            <span className="font-bold">${calculatedSubTotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base font-medium text-[#3C4242]">
            <span>Shipping</span>
            <span className="font-bold">${shippingFee.toFixed(2)}</span>
          </div>

          <div className="h-px bg-[#BEBCBD]/40 my-1"></div>

          <div className="flex items-center justify-between text-lg sm:text-xl font-black text-[#3C4242]">
            <span>Grand Total</span>
            <span>${calculatedGrandTotal.toFixed(2)}</span>
          </div>

          <div className="pt-4">
            <Link
              to="/checkout"
              className="w-full block py-4 text-center bg-[#8A33FD] text-white text-base font-bold rounded-xl shadow-lg hover:bg-[#6610F2] transition-colors cursor-pointer active:scale-98"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
