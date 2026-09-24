import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingCart,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  PRODUCTS,
  BEST_PRICE_TABLE,
  SIDEBAR_CATEGORIES,
  COLOR_OPTIONS,
  SIZE_OPTIONS,
  DRESS_STYLES
} from '../../data/products';

export default function ProductsListPage() {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active filters & sorting
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Filter 12 products
  const displayProducts = PRODUCTS.slice(0, 12).filter((product) => {
    if (activeCategory !== 'All' && product.subCategory !== activeCategory) {
      // Allow flexible filter or keep all 12
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-12">
      
      {/* Top Main Section: Sidebar Filter + 3-Column Products Grid */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* LEFT SIDEBAR FILTER (Matches Screenshot 2) */}
        <aside className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-[#BEBCBD]/40 p-6 flex flex-col gap-6 shadow-sm">
          
          {/* Filter Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/40">
            <h3 className="text-xl font-bold text-[#3C4242]">Filter</h3>
            <SlidersHorizontal className="w-5 h-5 text-[#807D7E]" />
          </div>

          {/* Categories List with chevron-right */}
          <div className="flex flex-col gap-3 pb-6 border-b border-[#BEBCBD]/40">
            {SIDEBAR_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                className={`flex items-center justify-between py-1 text-sm font-semibold transition-colors cursor-pointer text-left ${
                  activeCategory === cat
                    ? 'text-[#8A33FD] font-bold'
                    : 'text-[#807D7E] hover:text-[#3C4242]'
                }`}
              >
                <span>{cat}</span>
                <ChevronRight className="w-4 h-4 text-[#807D7E]" />
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col gap-4 pb-6 border-b border-[#BEBCBD]/40">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="flex items-center justify-between text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Price</span>
              {isPriceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isPriceOpen && (
              <div className="flex flex-col gap-4 pt-1">
                {/* Visual dual slider bar */}
                <div className="relative flex items-center">
                  <div className="w-full h-1 bg-[#E6E6E6] rounded-full relative">
                    <div
                      className="absolute h-1 bg-[#8A33FD] rounded-full"
                      style={{
                        left: `${(priceRange[0] / 1000) * 100}%`,
                        right: `${100 - (priceRange[1] / 1000) * 100}%`
                      }}
                    />
                  </div>
                  {/* Left Thumb */}
                  <div
                    className="absolute w-4 h-4 bg-[#8A33FD] rounded-full shadow border-2 border-white -translate-x-1/2 cursor-pointer"
                    style={{ left: `${(priceRange[0] / 1000) * 100}%` }}
                  />
                  {/* Right Thumb */}
                  <div
                    className="absolute w-4 h-4 bg-[#8A33FD] rounded-full shadow border-2 border-white -translate-x-1/2 cursor-pointer"
                    style={{ left: `${(priceRange[1] / 1000) * 100}%` }}
                  />
                </div>

                {/* Range inputs as shown in design */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex-1 py-1.5 px-3 border border-[#BEBCBD] rounded-lg text-center text-xs font-bold text-[#3C4242]">
                    ${priceRange[0]}
                  </div>
                  <div className="flex-1 py-1.5 px-3 border border-[#BEBCBD] rounded-lg text-center text-xs font-bold text-[#3C4242]">
                    ${priceRange[1]}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Colors Swatches Grid (12 Colors) */}
          <div className="flex flex-col gap-4 pb-6 border-b border-[#BEBCBD]/40">
            <button
              onClick={() => setIsColorsOpen(!isColorsOpen)}
              className="flex items-center justify-between text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Colors</span>
              {isColorsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isColorsOpen && (
              <div className="grid grid-cols-4 gap-y-4 gap-x-2 pt-2">
                {COLOR_OPTIONS.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(selectedColor === col.name ? null : col.name)}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        col.hex === '#FFFFFF' ? 'border border-[#BEBCBD]' : ''
                      } ${selectedColor === col.name ? 'ring-2 ring-offset-2 ring-[#8A33FD]' : ''}`}
                      style={{ backgroundColor: col.hex }}
                    >
                      {selectedColor === col.name && (
                        <Check className={`w-3.5 h-3.5 ${col.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-[#807D7E] group-hover:text-[#3C4242] text-center leading-tight">
                      {col.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Size Pills Grid (8 Sizes) */}
          <div className="flex flex-col gap-4 pb-6 border-b border-[#BEBCBD]/40">
            <button
              onClick={() => setIsSizeOpen(!isSizeOpen)}
              className="flex items-center justify-between text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Size</span>
              {isSizeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isSizeOpen && (
              <div className="grid grid-cols-3 gap-2 pt-1">
                {SIZE_OPTIONS.map((sz, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                    className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-[#8A33FD] bg-[#8A33FD] text-white shadow-sm'
                        : 'border-[#BEBCBD] text-[#3C4242] hover:border-[#8A33FD]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dress Style List */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsDressStyleOpen(!isDressStyleOpen)}
              className="flex items-center justify-between text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Dress Style</span>
              {isDressStyleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isDressStyleOpen && (
              <div className="flex flex-col gap-2 pt-1">
                {DRESS_STYLES.map((style, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 text-sm text-[#807D7E]">
                    <span>{style}</span>
                    <ChevronRight className="w-4 h-4 text-[#807D7E]" />
                  </div>
                ))}
              </div>
            )}
          </div>

        </aside>

        {/* RIGHT MAIN CONTENT AREA: Title + Sort + 3-Column Products Grid */}
        <div className="flex-1 w-full flex flex-col gap-8">
          
          {/* Header Row: Title on Left, Sort Tabs on Right */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242]">
              Women's Clothing
            </h1>

            {/* Sort Options matching Screenshot 2 */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSelectedSort('New')}
                className={`text-base font-bold cursor-pointer transition-colors ${
                  selectedSort === 'New'
                    ? 'text-[#8A33FD]'
                    : 'text-[#3C4242] hover:text-[#8A33FD]'
                }`}
              >
                New
              </button>
              <button
                onClick={() => setSelectedSort('Recommended')}
                className={`text-base font-bold cursor-pointer transition-colors ${
                  selectedSort === 'Recommended'
                    ? 'text-[#8A33FD]'
                    : 'text-[#3C4242] hover:text-[#8A33FD]'
                }`}
              >
                Recommended
              </button>
            </div>
          </div>

          {/* 3-Column Grid of 12 Products matching Screenshot 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayProducts.map((p) => {
              const inFav = isInWishlist(p.id);

              return (
                <div key={p.id} className="group flex flex-col gap-3">
                  
                  {/* Image Container with Wishlist Badge */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6] shadow-sm">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Heart Wishlist Icon Button */}
                    <button
                      onClick={() => toggleWishlist(p)}
                      aria-label="Wishlist"
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#3C4242] hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                    >
                      <Heart
                        className={`w-4 h-4 ${inFav ? 'fill-red-500 text-red-500' : 'text-[#3C4242]'}`}
                      />
                    </button>

                    {/* Quick Add To Cart Button on hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => addToCart(p, 'M', p.colors?.[0] || '#252525')}
                        className="w-full py-2.5 rounded-xl bg-[#8A33FD] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#6610F2] transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Info Row: Title & Brand on Left, Price on Right */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col max-w-[70%]">
                      <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors line-clamp-1">
                        {p.title}
                      </h4>
                      <span className="text-xs text-[#807D7E]">{p.brand}</span>
                    </div>

                    <span className="px-3 py-1.5 rounded-lg bg-[#F6F6F6] text-sm font-extrabold text-[#3C4242]">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* BOTTOM SECTION 1: "Clothing for Women Online in India" (from Screenshot 2) */}
      <section className="pt-8 border-t border-[#BEBCBD]/30 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3C4242]">
            Clothing for Women Online in India
          </h2>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#3C4242]">
          Reexplore Women's Clothing Collection Online at Euphoria
        </h3>

        <div className="text-sm text-[#807D7E] leading-relaxed flex flex-col gap-3">
          <p>
            Women's Clothing – Euphoria brings you an array of styles and trends in women's wear, making everyday dressing easy and comfortable. Explore our women's collection online and pick your favorites. Euphoria offers wide range of western wear collection for women online at best price in India.
          </p>
          <p>
            In our journey to build the fashion brand you love, we haven't just focused on design, but also on quality, comfort and durability. Euphoria is your one stop destination for shopping women's clothing online at affordable price.
          </p>
          {showFullDescription && (
            <p>
              Check out our brand new oversized graphic tees, comfortable high-waist joggers, denim parkas, lightweight summer blouses and premium cotton kurti combos. With hassle-free 30-day returns and free shipping across India, your wardrobe refresh is just a click away.
            </p>
          )}

          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-[#3C4242] font-bold text-xs uppercase tracking-wider underline underline-offset-4 self-start cursor-pointer hover:text-[#8A33FD] transition-colors"
          >
            {showFullDescription ? 'See Less' : 'See More'}
          </button>
        </div>
      </section>

      {/* BOTTOM SECTION 2: "Buy Women's Clothing at Best Price" Table (from Screenshot 2) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3C4242]">
            Buy Women's Clothing at Best Price
          </h2>
        </div>

        {/* Clean responsive table */}
        <div className="rounded-2xl border border-[#BEBCBD]/30 overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F6F6F6] text-[#3C4242] font-extrabold uppercase text-xs tracking-wider border-b border-[#BEBCBD]/30">
                <tr>
                  <th className="py-4 px-6">Women's Clothing</th>
                  <th className="py-4 px-6 text-right">Best Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BEBCBD]/20">
                {BEST_PRICE_TABLE.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-[#F6F6F6]/50 transition-colors ${
                      idx % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'
                    }`}
                  >
                    <td className="py-3.5 px-6 font-medium text-[#3C4242]">
                      {row.item}
                    </td>
                    <td className="py-3.5 px-6 text-right font-bold text-[#3C4242]">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
