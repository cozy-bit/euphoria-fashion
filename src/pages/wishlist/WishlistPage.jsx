import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import EmptyWishlist from './EmptyWishlist';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Wishlist', to: '/wishlist' }
        ]}
      />

      <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E6] mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
            Wishlist
          </h1>
          <p className="text-xs text-[#807D7E] font-semibold mt-1">
            You have {wishlistItems.length} saved clothing items
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Wishlist Items List */}
      <div className="space-y-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E6E6E6] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-20 h-24 rounded-xl bg-[#F6F6F6] overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8A33FD]">
                  {item.brand || 'Euphoria'}
                </span>
                <Link
                  to={`/product/${item.id}`}
                  className="block font-black text-sm text-[#3C4242] hover:text-[#8A33FD] transition-colors mt-0.5"
                >
                  {item.title}
                </Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-sm font-black text-[#3C4242]">
                    ${Number(item.price).toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-[#807D7E] line-through font-semibold">
                      ${Number(item.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Button
                onClick={() => moveToCart(item)}
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </Button>

              <button
                type="button"
                onClick={() => removeFromWishlist(item.id)}
                className="text-[#807D7E] hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
