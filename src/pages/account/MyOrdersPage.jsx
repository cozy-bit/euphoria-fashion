import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';

// Images for order cards from Kibriyo folder
import orderBlackTee from '../../assets/images/kibriyo/my-orders/order-black-printed-tee.jpg';
import orderWhiteDress from '../../assets/images/kibriyo/my-orders/order-white-cots-dress.jpg';
import orderPinkHoodie from '../../assets/images/kibriyo/my-orders/order-pink-hoodie.jpg';
import orderLavenderHoodie from '../../assets/images/kibriyo/my-orders/order-lavender-hoodie.jpg';

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('active');

  const orders = [
    {
      id: 'EUPH-849201',
      date: '22 September 2026',
      status: 'In Transit',
      statusType: 'active',
      expectedDate: '26 September 2026',
      total: 112.00,
      items: [
        { title: 'Black Typography Printed T-Shirt', color: 'Black', size: 'L', price: 32.00, img: orderBlackTee },
        { title: 'Lavender Cozy Streetwear Hoodie', color: 'Lavender', size: 'XL', price: 49.00, img: orderLavenderHoodie }
      ]
    },
    {
      id: 'EUPH-712390',
      date: '10 September 2026',
      status: 'Delivered',
      statusType: 'completed',
      expectedDate: '14 September 2026',
      total: 96.00,
      items: [
        { title: 'White Cots Dress with Slit', color: 'White', size: 'M', price: 48.00, img: orderWhiteDress },
        { title: 'Blush Pink Oversized Lounge Hoodie', color: 'Pink', size: 'M', price: 48.00, img: orderPinkHoodie }
      ]
    }
  ];

  const displayedOrders = orders.filter(o => activeTab === 'all' || o.statusType === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'My Account', to: '/profile' },
          { label: 'My Orders', to: '/orders' }
        ]}
      />

      <div className="pb-6 border-b border-[#E6E6E6] mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
          My Orders
        </h1>
        <p className="text-xs text-[#807D7E] font-semibold mt-1">
          Review recent purchases, tracking statuses, and order details
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: 'active', label: 'Active Orders', badge: '1' },
          { id: 'completed', label: 'Completed Orders', badge: '1' },
          { id: 'all', label: 'All Orders' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-8"
      />

      {/* Orders List */}
      <div className="space-y-6">
        {displayedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden shadow-2xs"
          >
            {/* Order Card Header */}
            <div className="bg-[#F6F6F6] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E6E6]">
              <div>
                <span className="text-xs font-bold text-[#807D7E]">Order Number:</span>
                <h3 className="font-black text-sm text-[#3C4242]">{order.id}</h3>
              </div>
              <div>
                <span className="text-xs font-bold text-[#807D7E]">Order Date:</span>
                <p className="font-extrabold text-xs text-[#3C4242]">{order.date}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-[#807D7E]">Status:</span>
                <span className={`inline-block ml-2 px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  order.statusType === 'active' ? 'bg-[#F4ECFF] text-[#8A33FD]' : 'bg-green-100 text-green-700'
                }`}>
                  ● {order.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button to={`/orders/${order.id}`} variant="primary" size="sm">
                  View Details
                </Button>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-5 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-20 rounded-xl object-cover object-top bg-[#F6F6F6]"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#3C4242]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#807D7E] mt-0.5">
                        Color: <span className="font-bold text-[#3C4242]">{item.color}</span> | Size: <span className="font-bold text-[#3C4242]">{item.size}</span>
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-[#3C4242]">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
