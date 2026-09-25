import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!product) return null;

  const inWish = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || 'Default', 1);
  };

  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-[#E6E6E6] hover:shadow-xl transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Product Image Frame */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full aspect-[3/4] bg-[#F6F6F6] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-[#EC4899] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#8A33FD] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10 ${
            inWish
              ? 'bg-[#FDF2F8] text-[#EC4899]'
              : 'bg-white/90 text-[#3C4242] hover:bg-white hover:text-[#EC4899]'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-[#EC4899]' : ''}`} />
        </button>

        {/* Quick Add To Cart Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-10 hidden sm:block">
          <button
            type="button"
            onClick={handleAddToCartClick}
            className="w-full bg-white/95 hover:bg-[#8A33FD] hover:text-white text-[#3C4242] font-bold text-xs py-2.5 rounded-lg shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <div className="flex items-center justify-between text-xs text-[#807D7E] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              {product.brand || 'Euphoria'}
            </span>
            {product.rating && (
              <span className="flex items-center gap-1 font-bold text-[#3C4242]">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                {product.rating}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block font-bold text-[#3C4242] text-sm leading-snug line-clamp-2 hover:text-[#8A33FD] transition-colors"
          >
            {product.title}
          </Link>
        </div>

        {/* Price and Mobile Add */}
        <div className="flex items-center justify-between pt-1 border-t border-[#F6F6F6]">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-[#3C4242] text-base">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#807D7E] line-through font-medium">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          <Link
            to={`/product/${product.id}`}
            className="w-8 h-8 rounded-full bg-[#F6F6F6] text-[#3C4242] group-hover:bg-[#8A33FD] group-hover:text-white flex items-center justify-center transition-colors duration-200"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
