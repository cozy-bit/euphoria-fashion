import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Package,
  Heart,
  User,
  LogOut
} from 'lucide-react';

import { PRODUCTS } from '../../data/products';

const orders = [
  {
    id: '123456789',
    date: '2 June 2023 2:40 PM',
    delivery: '8 June 2023',
    status: 'In progress',
    payment: 'Cash on delivery',
    product: PRODUCTS[0],
    quantity: 1,
    total: 23
  },
  {
    id: '123456790',
    date: '2 June 2023 2:40 PM',
    delivery: '8 June 2023',
    status: 'Shipped',
    payment: 'Cash on delivery',
    product: PRODUCTS[1],
    quantity: 1,
    total: 143
  },
  {
    id: '123456791',
    date: '1 June 2023 1:20 PM',
    delivery: '7 June 2023',
    status: 'In progress',
    payment: 'Cash on delivery',
    product: PRODUCTS[3],
    quantity: 1,
    total: 93
  },
  {
    id: '123456792',
    date: '28 May 2023 11:30 AM',
    delivery: '3 June 2023',
    status: 'Cancelled',
    payment: 'Cash on delivery',
    product: PRODUCTS[7],
    quantity: 1,
    total: 78
  },
  {
    id: '123456793',
    date: '20 May 2023 4:10 PM',
    delivery: '27 May 2023',
    status: 'Delivered',
    payment: 'Cash on delivery',
    product: PRODUCTS[2],
    quantity: 1,
    total: 134
  }
];

const tabs = ['Active', 'Cancelled', 'Completed'];

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('Active');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'Active') {
      return order.status === 'In progress' || order.status === 'Shipped';
    }

    if (activeTab === 'Cancelled') {
      return order.status === 'Cancelled';
    }

    return order.status === 'Delivered';
  });

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-6">
        <div className="flex items-center gap-2 text-sm text-[#807D7E]">
          <Link
            to="/"
            className="hover:text-[#8A33FD] transition-colors"
          >
            Home
          </Link>

          <ChevronRight className="w-4 h-4" />

          <span>My Account</span>

          <ChevronRight className="w-4 h-4" />

          <span className="text-[#3C4242]">My Orders</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-[230px] shrink-0"
          >
            <div className="mb-7">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]" />

                <h2 className="text-2xl font-bold text-[#3C4242]">
                  Hello Jhanvi
                </h2>
              </div>

              <p className="mt-2 text-sm text-[#807D7E]">
                Welcome to your Account
              </p>
            </div>

            <div className="flex flex-col gap-1">

              <Link
                to="/orders"
                className="flex items-center gap-4 px-5 py-3 rounded-lg bg-[#F6F6F6] text-[#3C4242] border-l-2 border-[#3C4242]"
              >
                <Package className="w-5 h-5 text-[#807D7E]" />
                <span className="text-sm font-semibold">
                  My orders
                </span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-4 px-5 py-3 rounded-lg text-[#807D7E] hover:bg-[#F6F6F6] transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Wishlist
                </span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-4 px-5 py-3 rounded-lg text-[#807D7E] hover:bg-[#F6F6F6] transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  My info
                </span>
              </Link>

              <button
                className="flex items-center gap-4 px-5 py-3 rounded-lg text-[#807D7E] hover:bg-[#F6F6F6] transition-colors text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Sign out
                </span>
              </button>

            </div>
          </motion.aside>

          {/* Orders Content */}
          <main className="flex-1 min-w-0">

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-[#3C4242] mb-7"
            >
              My Orders
            </motion.h1>

            {/* Tabs */}
            <div className="relative border-b border-[#E5E5E5] mb-9">
              <div className="grid grid-cols-3">

                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-4 text-sm sm:text-base font-semibold transition-colors cursor-pointer ${
                      activeTab === tab
                        ? 'text-[#3C4242]'
                        : 'text-[#807D7E] hover:text-[#3C4242]'
                    }`}
                  >
                    {tab}

                    {activeTab === tab && (
                      <motion.span
                        layoutId="orderTab"
                        className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#3C4242]"
                      />
                    )}
                  </button>
                ))}

              </div>
            </div>

            {/* Orders */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-7"
              >

                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="border-b border-[#EEEEEE] pb-6"
                    >

                      {/* Order Header */}
                      <div className="bg-[#F6F6F6] rounded-lg px-5 sm:px-8 py-6">

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-5">

                          <div>
                            <h3 className="text-base font-bold text-[#3C4242]">
                              Order no: #{order.id}
                            </h3>

                            <p className="mt-2 text-xs text-[#807D7E]">
                              Order Date : {order.date}
                            </p>

                            <p className="mt-1 text-xs text-[#807D7E]">
                              Estimated Delivery Date : {order.delivery}
                            </p>
                          </div>

                          <div className="sm:text-right">
                            <p className="text-xs text-[#807D7E]">
                              Order Status :{' '}
                              <span className="font-medium text-[#807D7E]">
                                {order.status}
                              </span>
                            </p>

                            <p className="mt-1 text-xs text-[#807D7E]">
                              Payment Method : {order.payment}
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Product */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-5">

                        <div className="w-full sm:w-auto flex items-center gap-4 flex-1">

                          <div className="w-[68px] h-[78px] rounded overflow-hidden bg-[#F6F6F6] shrink-0">
                            <img
                              src={order.product.image}
                              alt={order.product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-[#3C4242]">
                              {order.product.title}
                            </h4>

                            <p className="text-xs text-[#807D7E] mt-1">
                              Colour :{' '}
                              <span className="text-[#3C4242]">
                                {order.product.colors?.[0] || 'Default'}
                              </span>
                            </p>

                            <p className="text-xs text-[#807D7E] mt-1">
                              Qty : {order.quantity}
                            </p>

                            <p className="text-xs text-[#807D7E] mt-1">
                              Total : ${order.total.toFixed(2)}
                            </p>
                          </div>

                        </div>

                        <Link
                          to={`/orders/${order.id}`}
                          className="w-full sm:w-auto shrink-0"
                        >
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#8A33FD] text-white text-sm font-semibold hover:bg-[#7524E8] transition-colors cursor-pointer"
                          >
                            View Detail
                          </motion.button>
                        </Link>

                      </div>

                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <Package className="w-12 h-12 mx-auto text-[#CFCFCF]" />

                    <h3 className="mt-5 text-lg font-bold text-[#3C4242]">
                      No {activeTab.toLowerCase()} orders
                    </h3>

                    <p className="mt-2 text-sm text-[#807D7E]">
                      You don't have any orders in this category yet.
                    </p>
                  </motion.div>
                )}

              </motion.div>
            </AnimatePresence>

          </main>
        </div>
      </div>
    </div>
  );
}