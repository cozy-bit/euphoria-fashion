import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function CheckoutPage() {
  const { cartItems, cartSubtotal, shippingFee, discountAmount, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: user?.address?.firstName || 'Jhanvi',
    lastName: user?.address?.lastName || 'Shah',
    country: user?.address?.country || 'India',
    street: user?.address?.street || '89 Main Market Street, Flat 4B',
    city: user?.address?.city || 'Ahmedabad',
    state: user?.address?.state || 'Gujarat',
    postalCode: user?.address?.postalCode || '380015',
    phone: user?.phone || '+91 98765 43210',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvv: '921'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Cart', to: '/cart' },
          { label: 'Check Out', to: '/checkout' }
        ]}
      />

      <div className="pb-6 border-b border-[#E6E6E6] mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
          Check Out
        </h1>
        <p className="text-xs text-[#807D7E] font-semibold mt-1">
          Billing & Shipping Information
        </p>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ======================================================== */}
          {/* BILLING & PAYMENT FORM                                   */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Billing Details */}
            <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-2xs space-y-5">
              <h2 className="text-base font-extrabold text-[#3C4242] flex items-center gap-2 pb-3 border-b border-[#E6E6E6]">
                <span className="w-6 h-6 rounded-full bg-[#8A33FD] text-white text-xs font-black flex items-center justify-center">1</span>
                Billing Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Country / Region"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* 2. Shipping Method */}
            <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-2xs space-y-4">
              <h2 className="text-base font-extrabold text-[#3C4242] flex items-center gap-2 pb-3 border-b border-[#E6E6E6]">
                <span className="w-6 h-6 rounded-full bg-[#8A33FD] text-white text-xs font-black flex items-center justify-center">2</span>
                Shipping Method
              </h2>

              <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#8A33FD] bg-[#F4ECFF]/40">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#8A33FD]" />
                  <div>
                    <h3 className="font-extrabold text-sm text-[#3C4242]">Standard Delivery</h3>
                    <p className="text-xs text-[#807D7E] font-medium">Delivered within 3-5 business days</p>
                  </div>
                </div>
                <span className="font-black text-sm text-[#8A33FD]">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-2xs space-y-5">
              <h2 className="text-base font-extrabold text-[#3C4242] flex items-center gap-2 pb-3 border-b border-[#E6E6E6]">
                <span className="w-6 h-6 rounded-full bg-[#8A33FD] text-white text-xs font-black flex items-center justify-center">3</span>
                Payment Method
              </h2>

              {/* Payment Select Options */}
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-[#8A33FD] bg-[#F4ECFF]/30' : 'border-[#E6E6E6] hover:border-[#BEBCBD]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-[#8A33FD] w-4 h-4"
                    />
                    <span className="font-extrabold text-sm text-[#3C4242]">Credit / Debit Card</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#8A33FD]" />
                </label>

                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#F6F6F6] rounded-xl space-y-4 animate-in fade-in-50">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleChange}
                        placeholder="MM/YY"
                      />
                      <Input
                        label="CVV / CVC"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="123"
                      />
                    </div>
                  </div>
                )}

                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#8A33FD] bg-[#F4ECFF]/30' : 'border-[#E6E6E6] hover:border-[#BEBCBD]'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#8A33FD] w-4 h-4"
                    />
                    <span className="font-extrabold text-sm text-[#3C4242]">Cash on Delivery</span>
                  </div>
                  <Truck className="w-5 h-5 text-[#807D7E]" />
                </label>
              </div>

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

              {/* Items List Previews */}
              <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover object-top rounded-lg bg-[#F6F6F6] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-[#3C4242] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#807D7E]">
                        Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                    <span className="text-xs font-black text-[#3C4242]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-[#E6E6E6] text-xs font-semibold text-[#807D7E]">
                <div className="flex justify-between items-center">
                  <span>Sub Total</span>
                  <span className="font-bold text-[#3C4242]">${cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-bold text-[#3C4242]">
                    {shippingFee === 0 ? <span className="text-green-600 font-extrabold">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-green-600 font-bold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-[#E6E6E6] flex justify-between items-baseline text-base font-black text-[#3C4242]">
                  <span>Total</span>
                  <span className="text-xl text-[#8A33FD] font-black">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Pay Now (${cartTotal.toFixed(2)})</span>
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#807D7E] font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Encrypted 256-Bit SSL Payment</span>
              </div>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
}
