import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Lock, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, shippingFee, clearCart } = useCart();

  // Form states
  const [shippingAddressChoice, setShippingAddressChoice] = useState('same');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [saveInfo, setSaveInfo] = useState(true);

  // Form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    company: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Calculations matching Screenshot 2
  const subTotal = cartSubtotal > 0 ? cartSubtotal : 513.00;
  const savings = 30.00;
  const deliveryCharges = shippingFee;
  const finalTotal = Math.max(0, subTotal - savings + deliveryCharges);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-8">
      
      {/* 1. BREADCRUMBS & SECTION TITLE (Matches Screenshot 2) */}
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-sm text-[#807D7E]">
          <Link to="/" className="hover:text-[#3C4242] font-semibold">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/profile" className="hover:text-[#3C4242] font-semibold">My Account</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#3C4242] font-bold">Check Out</span>
        </nav>

        <div className="flex items-center gap-3">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h1 className="text-2xl md:text-3xl font-black text-[#3C4242]">
            Check Out
          </h1>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN LAYOUT */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Billing Details, Shipping Address, Shipping Method, Payment Method */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* SECTION A: Billing Details */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#3C4242]">
              Billing Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Country / Region */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Country / Region*</label>
                <input
                  type="text"
                  name="country"
                  required
                  placeholder="Country / Region"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Company Name</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company (optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Street Address */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Street Address*</label>
                <input
                  type="text"
                  name="street"
                  required
                  placeholder="House number and street name"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Apt, suite, unit */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Apt, suite, unit</label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* City, State, Postal Code Row (3 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">City*</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="Town / City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">State*</label>
                <select
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                >
                  <option value="">State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#3C4242]">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2 md:max-w-md">
              <label className="text-xs font-bold text-[#3C4242]">Phone*</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-xl bg-[#F6F6F6] border border-transparent focus:border-[#8A33FD] focus:bg-white text-sm text-[#3C4242] font-medium focus:outline-none transition-all"
              />
            </div>

            {/* Continue to delivery button */}
            <div className="pt-2">
              <button
                type="button"
                className="px-8 py-3 bg-[#8A33FD] text-white text-sm font-bold rounded-xl shadow hover:bg-[#6610F2] transition-colors cursor-pointer"
              >
                Continue to delivery
              </button>
            </div>

            {/* Save information checkbox */}
            <label className="flex items-center gap-2.5 text-xs text-[#807D7E] font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="w-4 h-4 rounded text-[#8A33FD] focus:ring-[#8A33FD]"
              />
              <span>Save my information for a faster checkout</span>
            </label>
          </div>

          <div className="h-px bg-[#BEBCBD]/30"></div>

          {/* SECTION B: Shipping Address */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#3C4242]">
              Shipping Address
            </h2>
            <p className="text-xs text-[#807D7E]">
              Select the address that matches your card or payment method.
            </p>

            <div className="bg-[#F6F6F6] rounded-2xl p-6 border border-[#BEBCBD]/30 flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#3C4242]">
                <input
                  type="radio"
                  name="shippingAddress"
                  checked={shippingAddressChoice === 'same'}
                  onChange={() => setShippingAddressChoice('same')}
                  className="w-4 h-4 text-[#8A33FD] focus:ring-[#8A33FD]"
                />
                <span>Same as billing address</span>
              </label>

              <div className="h-px bg-[#BEBCBD]/30"></div>

              <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#3C4242]">
                <input
                  type="radio"
                  name="shippingAddress"
                  checked={shippingAddressChoice === 'different'}
                  onChange={() => setShippingAddressChoice('different')}
                  className="w-4 h-4 text-[#8A33FD] focus:ring-[#8A33FD]"
                />
                <span>Use a different shipping address</span>
              </label>
            </div>
          </div>

          <div className="h-px bg-[#BEBCBD]/30"></div>

          {/* SECTION C: Shipping Method */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#3C4242]">
              Shipping Method
            </h2>

            <div className="bg-[#F6F6F6] rounded-2xl p-6 border border-[#BEBCBD]/30 flex flex-col gap-4">
              <span className="text-sm font-bold text-[#3C4242]">
                Arrives by Monday, June 7
              </span>

              <div className="h-px bg-[#BEBCBD]/30"></div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#3C4242]">Delivery Charges</span>
                  <span className="text-xs text-[#807D7E]">Additional fees may apply</span>
                </div>
                <span className="text-sm font-bold text-[#3C4242]">
                  ${deliveryCharges.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#BEBCBD]/30"></div>

          {/* SECTION D: Payment Method */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-[#3C4242]">
              Payment Method
            </h2>
            <p className="text-xs text-[#807D7E]">
              All transactions are secure and encrypted.
            </p>

            <div className="bg-[#F6F6F6] rounded-2xl p-6 border border-[#BEBCBD]/30 flex flex-col gap-5">
              
              {/* Option 1: Credit Card */}
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#3C4242]">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="w-4 h-4 text-[#8A33FD] focus:ring-[#8A33FD]"
                  />
                  <span>Credit Card</span>
                </label>
                <p className="text-xs text-[#807D7E] pl-7">
                  We accept all major credit cards.
                </p>

                {/* Card Brands Badges Row */}
                <div className="flex items-center gap-2 pl-7 flex-wrap">
                  <span className="px-2.5 py-1 bg-white rounded border border-[#BEBCBD]/40 text-[10px] font-bold text-[#3C4242]">G Pay</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-[#BEBCBD]/40 text-[10px] font-bold text-[#1A1F71]">VISA</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-[#BEBCBD]/40 text-[10px] font-bold text-[#003087]">PayPal</span>
                  <span className="px-2.5 py-1 bg-white rounded border border-[#BEBCBD]/40 text-[10px] font-bold text-[#EB001B]">Mastercard</span>
                </div>

                {/* 4 Card Input Fields (2x2 Grid) */}
                {paymentMethod === 'credit-card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 pl-7">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-xl bg-white border border-[#BEBCBD]/40 text-xs text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-xl bg-white border border-[#BEBCBD]/40 text-xs text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
                    />
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="Expiration date (MM/YY)"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-xl bg-white border border-[#BEBCBD]/40 text-xs text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
                    />
                    <input
                      type="password"
                      name="cardCvc"
                      placeholder="Security code"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-xl bg-white border border-[#BEBCBD]/40 text-xs text-[#3C4242] focus:outline-none focus:border-[#8A33FD]"
                    />
                  </div>
                )}
              </div>

              <div className="h-px bg-[#BEBCBD]/30"></div>

              {/* Option 2: Cash on delivery */}
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#3C4242]">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="w-4 h-4 text-[#8A33FD] focus:ring-[#8A33FD]"
                  />
                  <span>Cash on delivery</span>
                </label>
                <p className="text-xs text-[#807D7E] pl-7">Pay with cash upon delivery.</p>
              </div>

              <div className="h-px bg-[#BEBCBD]/30"></div>

              {/* Option 3: Paypal */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-[#3C4242]">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="w-4 h-4 text-[#8A33FD] focus:ring-[#8A33FD]"
                  />
                  <span>Paypal</span>
                </label>
              </div>

            </div>
          </div>

          {/* Pay Now Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="px-10 py-3.5 bg-[#8A33FD] text-white text-base font-bold rounded-xl shadow-lg hover:bg-[#6610F2] transition-colors cursor-pointer"
            >
              Pay Now
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Order Summary Card (Matches Screenshot 2) */}
        <aside className="lg:col-span-4 bg-white border border-[#BEBCBD]/30 rounded-2xl p-6 shadow-sm sticky top-24 flex flex-col gap-5">
          <h3 className="text-xl font-bold text-[#3C4242] pb-4 border-b border-[#BEBCBD]/30">
            Order Summary
          </h3>

          {/* Items List (3 items) */}
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F6F6F6] shrink-0 border border-[#BEBCBD]/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#3C4242] line-clamp-1">
                      {item.title} <span className="text-[#807D7E]">x {item.quantity}</span>
                    </span>
                    <span className="text-[11px] text-[#807D7E]">
                      Color : {item.selectedColor}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#3C4242] shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="h-px bg-[#BEBCBD]/30"></div>

          {/* Price Breakdown */}
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between text-[#3C4242]">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-bold">${subTotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-[#3C4242]">
              <span>Savings</span>
              <span className="font-bold text-red-500">-${savings.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-[#3C4242]">
              <span>Shipping</span>
              <span className="font-bold">+${deliveryCharges.toFixed(2)}</span>
            </div>

            <div className="h-px bg-[#BEBCBD]/30 my-1"></div>

            <div className="flex items-center justify-between text-base sm:text-lg font-black text-[#3C4242]">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

        </aside>

      </form>

    </div>
  );
}
