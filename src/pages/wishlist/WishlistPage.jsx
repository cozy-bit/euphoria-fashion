import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useWishlist } from '../../context/WishlistContext';
import EmptyWishlist from './EmptyWishlist';

export default function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
    moveToCart,
  } = useWishlist();

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <main className="w-full bg-white">

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-7">
        <div className="flex items-center gap-2 text-sm text-[#807D7E]">
          <Link
            to="/"
            className="hover:text-[#8A33FD] transition-colors"
          >
            Home
          </Link>

          <span>/</span>

          <span className="text-[#3C4242]">
            Wishlist
          </span>
        </div>
      </div>

      {/* Wishlist */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-8 md:py-10 min-h-[620px]">

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-8 rounded-full bg-[#8A33FD]" />

          <h1 className="text-2xl sm:text-3xl font-bold text-[#3C4242]">
            Wishlist
          </h1>
        </div>

        {/* EMPTY */}
        {wishlistItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="
              min-h-[420px]
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
          >
            <div className="
              w-20
              h-20
              rounded-full
              bg-[#F7F7F7]
              flex
              items-center
              justify-center
              mb-6
            ">
              <Heart
                className="w-9 h-9 text-[#8A33FD]"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#3C4242] mb-3">
              Your wishlist is empty
            </h2>

            <p className="text-[#807D7E] max-w-md leading-relaxed mb-7">
              You haven't added any products to your wishlist yet.
              Find something you love and save it here.
            </p>

            <Link
              to="/products"
              className="
                px-8
                py-3
                rounded-lg
                bg-[#8A33FD]
                text-white
                font-semibold
                hover:bg-[#7024D9]
                transition-all
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}

        {/* PRODUCTS */}
        {wishlistItems.length > 0 && (
          <div className="w-full">

            <AnimatePresence mode="popLayout">

              {wishlistItems.map((product) => (

                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    overflow: 'hidden',
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    relative
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-5
                    py-6
                    border-b
                    border-[#E5E5E5]
                  "
                >

                  {/* Remove */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="
                      absolute
                      top-6
                      right-0
                      sm:static
                      sm:shrink-0
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      text-[#3C4242]
                      hover:text-red-500
                      hover:scale-110
                      transition-all
                      cursor-pointer
                    "
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="
                      w-[120px]
                      h-[120px]
                      shrink-0
                      rounded-lg
                      overflow-hidden
                      bg-[#F6F6F6]
                      group
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-8 sm:pr-0">

                    <Link
                      to={`/product/${product.id}`}
                      className="
                        block
                        text-lg
                        sm:text-xl
                        font-bold
                        text-[#3C4242]
                        hover:text-[#8A33FD]
                        transition-colors
                        line-clamp-2
                      "
                    >
                      {product.title}
                    </Link>

                    <p className="mt-2 text-[#807D7E]">
                      <span className="font-bold text-[#3C4242]">
                        Brand :
                      </span>{' '}
                      {product.brand}
                    </p>

                    <p className="mt-1 text-[#807D7E]">
                      <span className="font-bold text-[#3C4242]">
                        Category :
                      </span>{' '}
                      {product.subCategory}
                    </p>

                    <p className="mt-2 text-lg font-bold text-[#3C4242]">
                      ${Number(product.price || 0).toFixed(2)}
                    </p>

                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={() => moveToCart(product)}
                    className="
                      w-full
                      sm:w-auto
                      sm:min-w-[150px]
                      px-6
                      py-3
                      rounded-lg
                      bg-[#8A33FD]
                      text-white
                      font-semibold
                      flex
                      items-center
                      justify-center
                      gap-2
                      hover:bg-[#7024D9]
                      hover:scale-[1.02]
                      active:scale-[0.98]
                      transition-all
                      cursor-pointer
                    "
                  >
                    <ShoppingCart className="w-4 h-4" />

                    Add to cart
                  </button>

                </motion.div>

              ))}

            </AnimatePresence>

          </div>
        )}

      </section>
    </main>
  );
}