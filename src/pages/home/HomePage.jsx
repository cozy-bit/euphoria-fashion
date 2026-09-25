import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Star,
  Heart,
  ShoppingCart,
  Check,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

// Hero Images & Models
import heroSummerPack from '../../assets/images/amirkhon/home/hero-summer-pack.webp';
import catWomenSummerFloral from '../../assets/images/amirkhon/home/cat-women-summer-floral.webp';
import catWomenYellowPolka from '../../assets/images/amirkhon/home/cat-women-yellow-polka.webp';

// New Arrival & Categories
import catMenHoodies from '../../assets/images/amirkhon/home/cat-men-hoodies.webp';
import catMenBluePolo from '../../assets/images/amirkhon/home/cat-men-blue-polo.webp';
import catMenBlackTee from '../../assets/images/amirkhon/home/cat-men-black-tee.webp';
import catMenChecks from '../../assets/images/amirkhon/home/cat-men-checks.webp';
import catMenDenimShirt from '../../assets/images/amirkhon/home/cat-men-denim-shirt.webp';
import catMenUrbanJacket from '../../assets/images/amirkhon/home/cat-men-urban-jacket.webp';

import catWomenRedCoat from '../../assets/images/amirkhon/home/cat-women-red-coat.webp';
import catWomenRainbowDress from '../../assets/images/amirkhon/home/cat-women-rainbow-dress.webp';
import catWomenBlueCrop from '../../assets/images/amirkhon/home/cat-women-blue-crop.webp';

// Big Saving Zone
import savingHawaiianShorts from '../../assets/images/amirkhon/home/saving-hawaiian-shorts.webp';
import savingPrintedTee from '../../assets/images/amirkhon/home/saving-printed-black-tee.webp';
import savingCargoPants from '../../assets/images/amirkhon/home/saving-cargo-pants.webp';
import savingChecksShirt from '../../assets/images/amirkhon/home/saving-checks-shirt.webp';

// Products & Brands
import productBlackSweatshirt from '../../assets/images/amirkhon/products/product-black-sweatshirt.webp';
import productWhiteTeeSunglasses from '../../assets/images/amirkhon/products/product-white-tee-sunglasses.webp';
import productLavenderHoodie from '../../assets/images/amirkhon/products/product-lavender-hoodie.webp';
import productBlueFlowerTop from '../../assets/images/amirkhon/products/product-blue-flower-top.webp';
import productChecksShirt from '../../assets/images/amirkhon/products/product-checks-shirt.webp';

import brandNike from '../../assets/images/amirkhon/home/brand-nike.webp';
import brandPuma from '../../assets/images/amirkhon/home/brand-puma.webp';
import brandUsPolo from '../../assets/images/amirkhon/home/brand-us-polo.webp';

import avatar1 from '../../assets/images/amirkhon/home/feedback-avatar-1.webp';
import avatar2 from '../../assets/images/amirkhon/home/feedback-avatar-2.webp';
import avatar3 from '../../assets/images/amirkhon/home/feedback-avatar-3.webp';

// 1. HERO SLIDES DATA
const HERO_SLIDES = [
  {
    id: 1,
    subTitle: 'T-Shirt / Tops',
    title: 'Summer Value Pack',
    description: 'cool / colorful / comfy',
    bgColor: '#00AEEF',
    image: heroSummerPack,
    imageAlt: 'Summer Value Pack Model',
    link: '/products?cat=women',
    btnText: 'Shop Now'
  },
  {
    id: 2,
    subTitle: "Men's Streetwear",
    title: 'Urban Street Style',
    description: 'minimal / bold / durable',
    bgColor: '#5C2D5C',
    image: catMenUrbanJacket,
    imageAlt: 'Urban Street Style Model',
    link: '/products?cat=men',
    btnText: 'Explore Men'
  },
  {
    id: 3,
    subTitle: 'Multipacks & Combos',
    title: 'Breezy Summer Deals',
    description: 'breathable / lightweight / vibrant',
    bgColor: '#F9A03F',
    image: catWomenYellowPolka,
    imageAlt: 'Breezy Summer Deals Model',
    link: '/products?cat=combos',
    btnText: 'Discover Combos'
  }
];

// 2. NEW ARRIVALS CAROUSEL DATA (8 items)
const NEW_ARRIVALS = [
  { id: 1, title: 'Knitted Joggers', brand: "Men's Bottoms", price: 89.0, image: catMenHoodies, link: '/products?cat=joggers' },
  { id: 2, title: 'Full Sleeve Flannel', brand: "Urban Casual", price: 45.0, image: productChecksShirt, link: '/products?cat=men' },
  { id: 3, title: 'Active Black Tee', brand: "Streetwear", price: 35.0, image: catMenBlackTee, link: '/products?cat=men' },
  { id: 4, title: 'Summer White Top', brand: "Helen's Brand", price: 29.0, image: productWhiteTeeSunglasses, link: '/products?cat=women' },
  { id: 5, title: 'Classic Blue Polo', brand: "Polo Club", price: 38.0, image: catMenBluePolo, link: '/products?cat=men' },
  { id: 6, title: 'Everyday Denim Shirt', brand: "Levis Style", price: 52.0, image: catMenDenimShirt, link: '/products?cat=men' },
  { id: 7, title: 'Winter Woolen Coat', brand: "Zara's Line", price: 135.0, image: catWomenRedCoat, link: '/products?cat=women' },
  { id: 8, title: 'Rainbow Summer Dress', brand: "Euphoria Women", price: 67.0, image: catWomenRainbowDress, link: '/products?cat=women' }
];

// 3. TESTIMONIALS SLIDER DATA (6 items, 2 pages)
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Floyd Miles',
    rating: 5,
    avatar: avatar1,
    comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. The fabric quality is absolutely premium!'
  },
  {
    id: 2,
    name: 'Ronald Richards',
    rating: 4.5,
    avatar: avatar2,
    comment: 'Super fast delivery and the sizing was spot on. The Lavender hoodie is my new favorite for daily wear. Will definitely order again.'
  },
  {
    id: 3,
    name: 'Savannah Nguyen',
    rating: 5,
    avatar: avatar3,
    comment: 'Euphoria multipacks saved me so much time and money. Incredible comfort and durability that survives every machine wash.'
  },
  {
    id: 4,
    name: 'Courtney Henry',
    rating: 5,
    avatar: avatar2,
    comment: 'The bomber jacket quality rivaled luxury streetwear brands at a fraction of the cost. True Apple-level aesthetics!'
  },
  {
    id: 5,
    name: 'Jerome Bell',
    rating: 4.5,
    avatar: avatar3,
    comment: 'Their return process is completely frictionless, but I ended up keeping all items because they fit so nicely.'
  },
  {
    id: 6,
    name: 'Eleanor Pena',
    rating: 5,
    avatar: avatar1,
    comment: 'Vibrant colors that do not fade over time. The floral crop tops receive compliments everywhere I go!'
  }
];

export default function HomePage() {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // 1. Hero Slider State
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroDirection, setHeroDirection] = useState(1);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Auto-advance Hero every 5.5 seconds, resetting cleanly on slide change
  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setTimeout(() => {
      setHeroDirection(1);
      setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearTimeout(timer);
  }, [heroIndex, isHeroPaused]);

  const handleHeroPrev = () => {
    setHeroDirection(-1);
    setHeroIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleHeroNext = () => {
    setHeroDirection(1);
    setHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleHeroDotClick = (targetIndex) => {
    if (targetIndex === heroIndex) return;
    setHeroDirection(targetIndex > heroIndex ? 1 : -1);
    setHeroIndex(targetIndex);
  };

  // 2. New Arrivals Carousel State (slides by 1 or 2 items)
  const [newArrivalIndex, setNewArrivalIndex] = useState(0);
  const maxNewArrivalIndex = NEW_ARRIVALS.length - 4;

  const handleNewArrivalPrev = () => {
    setNewArrivalIndex((prev) => (prev > 0 ? prev - 1 : maxNewArrivalIndex));
  };

  const handleNewArrivalNext = () => {
    setNewArrivalIndex((prev) => (prev < maxNewArrivalIndex ? prev + 1 : 0));
  };

  // 3. Feedback Carousel State (2 pages of 3 cards each)
  const [feedbackPage, setFeedbackPage] = useState(0);
  const feedbackPagesCount = Math.ceil(TESTIMONIALS.length / 3);

  // Temporary added-to-cart state
  const [addedId, setAddedId] = useState(null);

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 'Default', 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  // Limelight products
  const limelightProducts = [
    { id: 1, title: 'Black Sweatshirt', brand: "Jhanvi's Brand", price: 123.0, image: productBlackSweatshirt },
    { id: 2, title: 'Pattern Blouse', brand: "AS's Brand", price: 37.0, image: productBlueFlowerTop },
    { id: 3, title: 'White Crop Top', brand: "MM's Brand", price: 29.0, image: productWhiteTeeSunglasses },
    { id: 4, title: 'Lavender Hoodie', brand: "Nike's Brand", price: 119.0, image: productLavenderHoodie }
  ];

  const currentHero = HERO_SLIDES[heroIndex];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SLIDER BANNER WITH 100% HEIGHT */}
      <section
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative overflow-hidden w-full h-[calc(100vh-80px)] min-h-[580px] max-h-[920px] flex items-center transition-colors duration-700 select-none"
        style={{ backgroundColor: currentHero.bgColor }}
      >
        {/* Left Slide Arrow - Vertically centered and fixed */}
        <button
          type="button"
          onClick={handleHeroPrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/15 hover:bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Slide Arrow - Vertically centered and fixed */}
        <button
          type="button"
          onClick={handleHeroNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/15 hover:bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Content with AnimatePresence */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full h-full flex items-center py-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentHero.id}
              initial={{ opacity: 0, x: heroDirection > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: heroDirection > 0 ? -50 : 50 }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            >
              {/* Left Texts */}
              <div className="lg:col-span-6 flex flex-col items-start gap-4 z-10">
                <span className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-white/90">
                  {currentHero.subTitle}
                </span>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                  {currentHero.title.split(' ')[0]}<br />
                  {currentHero.title.split(' ').slice(1).join(' ')}
                </h1>

                <p className="text-base sm:text-xl text-white/90 font-medium">
                  {currentHero.description}
                </p>

                <div className="pt-4">
                  <Link
                    to={currentHero.link}
                    className="inline-block px-9 py-3.5 bg-white text-[#3C4242] font-extrabold rounded-xl text-sm sm:text-base hover:bg-neutral-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                  >
                    {currentHero.btnText}
                  </Link>
                </div>
              </div>

              {/* Right Model Image - STATIC (no floating bounce) */}
              <div className="lg:col-span-6 relative flex justify-center items-end h-full">
                <img
                  src={currentHero.image}
                  alt={currentHero.imageAlt}
                  className="max-h-[380px] sm:max-h-[460px] md:max-h-[calc(100vh-160px)] max-h-[580px] object-contain object-bottom drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Indicators - Stable, no layout shift or jump */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = heroIndex === idx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleHeroDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="p-1 cursor-pointer flex items-center justify-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-10 bg-white shadow-md'
                      : 'w-3 bg-white/40 hover:bg-white/75'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. TWO PROMO BANNERS (Yellow & Plum) */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Banner 1: Amber Glow */}
          <motion.div
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="group relative rounded-3xl bg-[#F9A03F] overflow-hidden p-8 sm:p-10 flex items-center justify-between shadow-sm hover:shadow-xl transition-all min-h-[300px]"
          >
            <div className="flex flex-col items-start gap-2 z-10 max-w-[60%]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3C4242]/80">
                Low Price
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#3C4242] leading-tight">
                High Coziness
              </h3>
              <p className="text-sm font-extrabold text-[#3C4242]/90 pt-1">
                UPTO 50% OFF
              </p>
              <Link
                to="/products?cat=women"
                className="text-sm font-extrabold text-[#3C4242] underline underline-offset-4 pt-4 hover:text-black transition-colors"
              >
                Explore Items
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-[45%] flex items-end justify-end">
              <img
                src={catWomenSummerFloral}
                alt="High Coziness"
                className="max-h-[92%] object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Banner 2: Deep Plum */}
          <motion.div
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="group relative rounded-3xl bg-[#5C2D5C] text-white overflow-hidden p-8 sm:p-10 flex items-center justify-between shadow-sm hover:shadow-xl transition-all min-h-[300px]"
          >
            <div className="flex flex-col items-start gap-2 z-10 max-w-[60%]">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                Beyoung Represents
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Breezy Summer Style
              </h3>
              <p className="text-sm font-extrabold text-white/90 pt-1">
                UPTO 50% OFF
              </p>
              <Link
                to="/products?cat=women"
                className="text-sm font-extrabold text-white underline underline-offset-4 pt-4 hover:text-gray-200 transition-colors"
              >
                Explore Items
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-[45%] flex items-end justify-end">
              <img
                src={catWomenYellowPolka}
                alt="Breezy Summer Style"
                className="max-h-[92%] object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* 3. NEW ARRIVAL SECTION (REAL INTERACTIVE CAROUSEL) */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
              New Arrival
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewArrivalPrev}
              aria-label="Previous Products"
              className="w-10 h-10 rounded-full bg-white border border-[#E6E6E6] shadow-xs flex items-center justify-center text-[#3C4242] hover:bg-[#8A33FD] hover:text-white hover:border-[#8A33FD] transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNewArrivalNext}
              aria-label="Next Products"
              className="w-10 h-10 rounded-full bg-white border border-[#E6E6E6] shadow-xs flex items-center justify-center text-[#3C4242] hover:bg-[#8A33FD] hover:text-white hover:border-[#8A33FD] transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden py-2 -my-2">
          <motion.div
            animate={{ x: `-${newArrivalIndex * 25}%` }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className="flex gap-6 w-[200%] sm:w-[200%] lg:w-[200%]"
          >
            {NEW_ARRIVALS.map((item) => {
              const inFav = isInWishlist(item.id);
              const isAdded = addedId === item.id;

              return (
                <div
                  key={item.id}
                  className="w-1/8 shrink-0 group flex flex-col gap-3 bg-white rounded-3xl p-3 border border-transparent hover:border-neutral-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                    <Link to={item.link} className="block w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      aria-label="Toggle Wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#3C4242] hover:scale-110 active:scale-90 transition-all cursor-pointer z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          inFav ? 'fill-red-500 text-red-500' : 'text-[#3C4242]'
                        }`}
                      />
                    </button>

                    {/* Quick Add To Cart */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <button
                        onClick={(e) => handleQuickAdd(e, item)}
                        className={`w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all cursor-pointer ${
                          isAdded ? 'bg-emerald-600' : 'bg-[#8A33FD] hover:bg-[#6610F2]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 px-1">
                    <Link to={item.link} className="flex flex-col">
                      <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-xs text-[#807D7E]">{item.brand}</span>
                    </Link>
                    <span className="px-2.5 py-1 rounded-xl bg-[#F6F6F6] text-sm font-extrabold text-[#3C4242]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. BIG SAVING ZONE (5 Cards Grid with Spring Physics) */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Big Saving Zone
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Hawaiian Shirts (Cyan) */}
            <motion.div
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative rounded-3xl bg-[#64C2E0] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-white shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <h3 className="text-2xl font-black leading-tight">Hawaiian Shirts</h3>
                <p className="text-xs font-medium text-white/90">Dress up in summer vibe</p>
                <p className="text-sm font-extrabold pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white animate-bounce" />
                <Link
                  to="/products?cat=combos"
                  className="px-5 py-2.5 rounded-xl border border-white text-white font-extrabold text-xs uppercase tracking-wider hover:bg-white hover:text-[#64C2E0] transition-all shadow-md active:scale-95"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingHawaiianShorts}
                alt="Hawaiian Shirts"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Card 2: Printed T-Shirt (Dusty Rose) */}
            <motion.div
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative rounded-3xl bg-[#BF7A86] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-white shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <span className="px-2.5 py-1 rounded-full bg-[#3C4242] text-[10px] font-bold tracking-wider uppercase text-white mb-1 shadow-xs">
                  Limited Stock
                </span>
                <h3 className="text-2xl font-black leading-tight">Printed T-Shirt</h3>
                <p className="text-xs font-medium text-white/90">Super cool typography</p>
                <p className="text-sm font-extrabold pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white animate-bounce" />
                <Link
                  to="/products?cat=women"
                  className="px-5 py-2.5 rounded-xl border border-white text-white font-extrabold text-xs uppercase tracking-wider hover:bg-white hover:text-[#BF7A86] transition-all shadow-md active:scale-95"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingPrintedTee}
                alt="Printed T-Shirt"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Card 3: Cargo Joggers (Cream/Off-White) */}
            <motion.div
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative rounded-3xl bg-[#DFDFDF] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-[#3C4242] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <h3 className="text-2xl font-black leading-tight text-[#3C4242]">Cargo Joggers</h3>
                <p className="text-xs font-medium text-[#3C4242]/80">Move in street style</p>
                <p className="text-sm font-extrabold text-[#3C4242] pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-[#3C4242] animate-bounce" />
                <Link
                  to="/products?cat=joggers"
                  className="px-5 py-2.5 rounded-xl border border-[#3C4242] text-[#3C4242] font-extrabold text-xs uppercase tracking-wider hover:bg-[#3C4242] hover:text-white transition-all shadow-md active:scale-95"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingCargoPants}
                alt="Cargo Joggers"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

          </div>

          {/* Bottom Row: 2 Wide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 4: Urban Shirts */}
            <motion.div
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative rounded-3xl bg-[#DDD3D3] overflow-hidden p-6 sm:p-8 min-h-[300px] flex flex-col justify-between text-[#3C4242] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start gap-1 z-10 max-w-[60%]">
                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-[#3C4242]">Urban Shirts</h3>
                <p className="text-xs font-medium text-[#3C4242]/80">Live in comfort</p>
                <p className="text-sm font-extrabold text-[#3C4242] pt-2">FLAT 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-[#3C4242] animate-bounce" />
                <Link
                  to="/products?cat=men"
                  className="px-5 py-2.5 rounded-xl border border-[#3C4242] text-[#3C4242] font-extrabold text-xs uppercase tracking-wider hover:bg-[#3C4242] hover:text-white transition-all shadow-md active:scale-95"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingChecksShirt}
                alt="Urban Shirts"
                className="absolute right-0 bottom-0 max-h-[90%] w-[50%] object-contain object-bottom pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Card 5: Oversized T-Shirt */}
            <motion.div
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative rounded-3xl bg-[#D3E2E6] overflow-hidden p-6 sm:p-8 min-h-[300px] flex flex-col justify-between text-[#3C4242] shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-start gap-1 z-10 max-w-[60%]">
                <h3 className="text-2xl sm:text-3xl font-black leading-tight text-[#3C4242]">Oversized T-Shirts</h3>
                <p className="text-xs font-medium text-[#3C4242]/80">Street Style Icons</p>
                <p className="text-sm font-extrabold text-[#3C4242] pt-2">FLAT 60% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-[#3C4242] animate-bounce" />
                <Link
                  to="/products?cat=men"
                  className="px-5 py-2.5 rounded-xl border border-[#3C4242] text-[#3C4242] font-extrabold text-xs uppercase tracking-wider hover:bg-[#3C4242] hover:text-white transition-all shadow-md active:scale-95"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={productWhiteTeeSunglasses}
                alt="Oversized T-Shirts"
                className="absolute right-0 bottom-0 max-h-[90%] w-[50%] object-contain object-bottom pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* 5. CATEGORIES FOR MEN */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Categories For Men
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { title: 'Shirts', image: catMenChecks, link: '/products?cat=men' },
            { title: 'Printed T-Shirts', image: catMenBlackTee, link: '/products?cat=men' },
            { title: 'Plain T-Shirt', image: catMenBluePolo, link: '/products?cat=men' },
            { title: 'Polo T-Shirt', image: catMenDenimShirt, link: '/products?cat=men' }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            >
              <Link
                to={cat.link}
                className="group flex flex-col gap-3 bg-white rounded-3xl p-3 border border-transparent hover:border-neutral-200 hover:shadow-xl transition-all"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
                      {cat.title}
                    </h4>
                    <span className="text-xs text-[#807D7E]">Explore Now!</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 6. CATEGORIES FOR WOMEN */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Categories For Women
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { title: 'Hoodies & Coats', image: catWomenRedCoat, link: '/products?cat=women' },
            { title: 'Summer Dresses', image: catWomenRainbowDress, link: '/products?cat=women' },
            { title: 'Tops & Blouses', image: catWomenBlueCrop, link: '/products?cat=women' },
            { title: 'Day Outfits', image: catWomenYellowPolka, link: '/products?cat=women' }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            >
              <Link
                to={cat.link}
                className="group flex flex-col gap-3 bg-white rounded-3xl p-3 border border-transparent hover:border-neutral-200 hover:shadow-xl transition-all"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
                      {cat.title}
                    </h4>
                    <span className="text-xs text-[#807D7E]">Explore Now!</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 7. TOP BRANDS DEAL */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="rounded-3xl bg-[#343538] text-white py-14 px-6 sm:px-12 text-center flex flex-col items-center gap-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FDB022]" />
            <h2 className="text-3xl md:text-4xl font-black">Top Brands Deal</h2>
          </div>
          <p className="text-sm sm:text-base text-gray-300">
            Up To <span className="text-[#FDB022] font-black">60% OFF</span> on world-class labels
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 w-full max-w-4xl">
            {/* Nike */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md cursor-pointer transition-shadow"
            >
              <img src={brandNike} alt="Nike" className="max-h-full max-w-full object-contain" />
            </motion.div>

            {/* H&M */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md cursor-pointer transition-shadow"
            >
              <span className="text-2xl font-black tracking-wider text-[#E50914] italic">H&M</span>
            </motion.div>

            {/* Levis */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md cursor-pointer transition-shadow"
            >
              <span className="px-3 py-1 bg-[#C41230] text-white font-black text-sm uppercase rounded tracking-wider">Levi's</span>
            </motion.div>

            {/* US Polo */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md cursor-pointer transition-shadow"
            >
              <img src={brandUsPolo} alt="US Polo" className="max-h-full max-w-full object-contain" />
            </motion.div>

            {/* Puma */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-3 shadow-md cursor-pointer transition-shadow"
            >
              <img src={brandPuma} alt="Puma" className="max-h-full max-w-full object-contain" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 8. IN THE LIMELIGHT */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            In The Limelight
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limelightProducts.map((p) => {
            const inFav = isInWishlist(p.id);
            const isAdded = addedId === p.id;

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="group flex flex-col gap-3 bg-white rounded-3xl p-3 border border-transparent hover:border-neutral-200 hover:shadow-xl transition-all"
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <Link to={`/product/${p.id}`} className="block w-full h-full">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  {/* Heart Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(p);
                    }}
                    aria-label="Toggle Wishlist"
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#3C4242] hover:scale-110 active:scale-90 transition-all cursor-pointer z-10"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        inFav ? 'fill-red-500 text-red-500' : 'text-[#3C4242]'
                      }`}
                    />
                  </button>

                  {/* Quick Add To Cart */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <button
                      onClick={(e) => handleQuickAdd(e, p)}
                      className={`w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all cursor-pointer ${
                        isAdded ? 'bg-emerald-600' : 'bg-[#8A33FD] hover:bg-[#6610F2]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 px-1">
                  <Link to={`/product/${p.id}`} className="flex flex-col">
                    <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors line-clamp-1">
                      {p.title}
                    </h4>
                    <span className="text-xs text-[#807D7E]">{p.brand}</span>
                  </Link>
                  <span className="px-2.5 py-1 rounded-xl bg-[#F6F6F6] text-sm font-extrabold text-[#3C4242]">
                    ${p.price.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* 9. FEEDBACK SECTION (INTERACTIVE TESTIMONIALS SLIDER) */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
              Customer Feedback
            </h2>
          </div>

          {/* Testimonial Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeedbackPage((prev) => (prev > 0 ? prev - 1 : feedbackPagesCount - 1))}
              aria-label="Previous Testimonials"
              className="w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow-xs flex items-center justify-center text-[#3C4242] hover:bg-[#8A33FD] hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedbackPage((prev) => (prev < feedbackPagesCount - 1 ? prev + 1 : 0))}
              aria-label="Next Testimonials"
              className="w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow-xs flex items-center justify-center text-[#3C4242] hover:bg-[#8A33FD] hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid with Page Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={feedbackPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.slice(feedbackPage * 3, feedbackPage * 3 + 3).map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="rounded-3xl border border-[#BEBCBD]/40 p-7 flex flex-col justify-between gap-5 bg-white shadow-xs hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#E6E6E6]"
                    />
                    <div>
                      <h4 className="text-base font-bold text-[#3C4242]">{item.name}</h4>
                      <span className="text-[11px] text-emerald-600 font-semibold">Verified Buyer</span>
                    </div>
                  </div>
                  <div className="flex items-center text-[#EDD146]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#807D7E] leading-relaxed italic">
                  "{item.comment}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Feedback Interactive Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-8">
          {Array.from({ length: feedbackPagesCount }).map((_, idx) => {
            const isActive = feedbackPage === idx;
            return (
              <button
                key={idx}
                onClick={() => setFeedbackPage(idx)}
                aria-label={`Feedback page ${idx + 1}`}
                className="relative py-2 px-1 cursor-pointer"
              >
                {isActive ? (
                  <motion.div
                    layoutId="feedbackIndicator"
                    className="w-8 h-2 bg-[#8A33FD] rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                ) : (
                  <div className="w-2.5 h-2 bg-gray-300 hover:bg-gray-400 rounded-full transition-colors" />
                )}
              </button>
            );
          })}
        </div>
      </motion.section>

    </div>
  );
}
