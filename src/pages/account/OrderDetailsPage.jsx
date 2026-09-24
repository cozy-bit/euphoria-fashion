import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, Package, Clock, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';

// Images for order detail from Kibriyo folder
import detailBlackTee from '../../assets/images/kibriyo/order-details/order-detail-black-printed-tee.jpg';
import detailLavenderHoodie from '../../assets/images/kibriyo/order-details/order-detail-lavender-hoodie.jpg';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const orderId = id || 'EUPH-849201';

  const steps = [
    { label: 'Order Placed', date: '22 Sep 2026, 10:30 AM', done: true },
    { label: 'In Processing', date: '23 Sep 2026, 02:15 PM', done: true },
    { label: 'Shipped (In Transit)', date: '24 Sep 2026, 09:00 AM', done: true, current: true },
    { label: 'Delivered', date: 'Expected 26 Sep 2026', done: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'My Orders', to: '/orders' },
          { label: `Order ${orderId}` }
        ]}
      />

      <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E6] mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
            Order Details: {orderId}
          </h1>
          <p className="text-xs text-[#807D7E] font-semibold mt-1">
            Tracking Code: <span className="font-mono text-[#8A33FD] font-bold">TRK-98428190-IN</span>
          </p>
        </div>

        <Link to="/orders" className="text-xs font-bold text-[#8A33FD] hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Tracking Stepper */}
      <div className="bg-[#F4ECFF]/40 border border-[#8A33FD]/30 rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
        <h2 className="text-sm font-extrabold text-[#3C4242] uppercase tracking-wider mb-6">
          Delivery Progress
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-start gap-2 relative">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done
                    ? 'bg-[#8A33FD] text-white shadow-xs'
                    : 'bg-[#E6E6E6] text-[#807D7E]'
                }`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="font-extrabold text-sm text-[#3C4242]">{step.label}</span>
              </div>
              <p className="text-[11px] text-[#807D7E] pl-11">{step.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Item List */}
      <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="font-black text-base text-[#3C4242] pb-3 border-b border-[#E6E6E6]">
          Items Ordered
        </h3>

        <div className="space-y-4">
          {[
            { title: 'Black Typography Printed T-Shirt', color: 'Black', size: 'L', price: 32.00, img: detailBlackTee },
            { title: 'Lavender Cozy Streetwear Hoodie', color: 'Lavender', size: 'XL', price: 49.00, img: detailLavenderHoodie }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pb-4 border-b border-[#F6F6F6] last:border-none">
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-20 rounded-xl object-cover object-top bg-[#F6F6F6]"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[#3C4242]">{item.title}</h4>
                  <p className="text-xs text-[#807D7E] mt-0.5">
                    Color: {item.color} | Size: {item.size}
                  </p>
                </div>
              </div>
              <span className="font-black text-sm text-[#3C4242]">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
