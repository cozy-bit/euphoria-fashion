import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Heart,
  User,
  LogOut,
  X
} from 'lucide-react';

import { PRODUCTS } from '../../data/products';

const orderData = {
  '123456789': {
    id: '123456789',
    date: '2 June 2023 2:40 PM',
    total: 143,
    status: 'In progress',
    products: [
      {
        product: PRODUCTS[1],
        quantity: 1,
        price: 29,
        color: 'White'
      },
      {
        product: PRODUCTS[3],
        quantity: 1,
        price: 29,
        color: 'Blue'
      }
    ]
  },

  '123456790': {
    id: '123456790',
    date: '2 June 2023 2:40 PM',
    total: 143,
    status: 'Shipped',
    products: [
      {
        product: PRODUCTS[1],
        quantity: 1,
        price: 78,
        color: 'White'
      },
      {
        product: PRODUCTS[3],
        quantity: 1,
        price: 65,
        color: 'Blue'
      }
    ]
  }
};

const defaultOrder = {
  id: '123456789',
  date: '2 June 2023 2:40 PM',
  total: 143,
  status: 'In progress',
  products: [
    {
      product: PRODUCTS[1],
      quantity: 1,
      price: 29,
      color: 'White'
    },
    {
      product: PRODUCTS[3],
      quantity: 1,
      price: 29,
      color: 'Blue'
    }
  ]
};

export default function OrderDetailsPage() {
  const { id } = useParams();

  const order = orderData[id] || defaultOrder;

  const isShipped = order.status === 'Shipped';

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

          <Link
            to="/orders"
            className="hover:text-[#8A33FD] transition-colors"
          >
            My Account
          </Link>

          <ChevronRight className="w-4 h-4" />

          <span className="text-[#3C4242]">
            Order Detail
          </span>

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

          {/* Main Order */}
          <main className="flex-1 min-w-0">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-7"
            >

              <Link
                to="/orders"
                className="text-[#3C4242] hover:text-[#8A33FD] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#3C4242]">
                Order Details
              </h1>

            </motion.div>

            {/* Order Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#F6F6F6] rounded-lg px-6 sm:px-9 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >

              <div>

                <h3 className="text-base font-bold text-[#3C4242]">
                  Order no: #{order.id}
                </h3>

                <p className="text-sm text-[#807D7E] mt-2">
                  Placed On {order.date}
                </p>

              </div>

              <p className="text-sm font-semibold text-[#807D7E]">
                Total :{' '}
                <span className="text-[#3C4242]">
                  ${order.total.toFixed(2)}
                </span>
              </p>

            </motion.div>

            {/* Delivery Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 px-2 sm:px-8"
            >

              <div className="relative">

                {/* Line */}
                <div className="absolute left-[8%] right-[8%] top-2.5 h-[3px] bg-[#C7C7C7]" />

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isShipped ? '62%' : '32%'
                  }}
                  transition={{ duration: 1 }}
                  className="absolute left-[8%] top-2.5 h-[3px] bg-[#3C4242]"
                />

                {/* Steps */}
                <div className="relative grid grid-cols-4">

                  {/* Step 1 */}
                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-[#3C4242] border-2 border-white shadow" />

                    <span className="mt-4 text-[11px] sm:text-xs font-semibold text-[#3C4242] text-center">
                      Order Placed
                    </span>

                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">

                    <div className={`w-5 h-5 rounded-full border-2 border-white shadow ${
                      isShipped
                        ? 'bg-[#3C4242]'
                        : 'bg-[#3C4242]'
                    }`} />

                    <span className="mt-4 text-[11px] sm:text-xs font-semibold text-[#3C4242] text-center">
                      Inprogress
                    </span>

                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">

                    <div className={`w-5 h-5 rounded-full border-2 border-white shadow ${
                      isShipped
                        ? 'bg-[#3C4242]'
                        : 'bg-[#C7C7C7]'
                    }`} />

                    <span className={`mt-4 text-[11px] sm:text-xs text-center ${
                      isShipped
                        ? 'font-semibold text-[#3C4242]'
                        : 'text-[#807D7E]'
                    }`}>
                      Shipped
                    </span>

                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-[#C7C7C7] border-2 border-white shadow" />

                    <span className="mt-4 text-[11px] sm:text-xs text-[#B0B0B0] text-center">
                      Delivered
                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

            {/* Verification message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-[#F6F6F6] rounded-lg px-6 sm:px-8 py-5 flex flex-col sm:flex-row gap-3 sm:gap-8"
            >

              <span className="text-xs sm:text-sm text-[#807D7E] shrink-0">
                8 June 2023 3:40 PM
              </span>

              <span className="text-xs sm:text-sm font-semibold text-[#3C4242]">
                Your order has been successfully verified.
              </span>

            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-14 bg-[#F6F6F6] rounded-lg px-6 sm:px-9 py-5"
            >

              {order.products.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.55 + index * 0.1
                  }}
                  className={`flex flex-col sm:flex-row sm:items-center gap-5 py-5 ${
                    index !== order.products.length - 1
                      ? 'border-b border-[#D8D8D8]'
                      : ''
                  }`}
                >

                  {/* Product image */}
                  <div className="w-[76px] h-[76px] rounded overflow-hidden bg-white shrink-0">

                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Product info */}
                  <div className="flex-1">

                    <h3 className="text-base font-bold text-[#3C4242]">
                      {item.product.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#807D7E]">
                      Color :{' '}
                      <span className="text-[#3C4242]">
                        {item.color}
                      </span>
                    </p>

                  </div>

                  {/* Quantity */}
                  <div className="text-sm font-bold text-[#3C4242] sm:w-[80px]">
                    Qty :{' '}
                    <span className="font-normal">
                      {item.quantity}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-base font-bold text-[#807D7E] sm:w-[80px]">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Remove visual */}
                  <button
                    className="hidden sm:flex items-center justify-center w-8 h-8 text-[#3C4242] hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <X className="w-5 h-5" />
                  </button>

                </motion.div>

              ))}

            </motion.div>

          </main>

        </div>

      </div>
    </div>
  );
}