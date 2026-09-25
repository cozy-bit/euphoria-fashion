import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  Star,
  Heart
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

// Organized images
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
import productUrbanJacket from '../../assets/images/amirkhon/products/product-urban-jacket.webp';

import brandNike from '../../assets/images/amirkhon/home/brand-nike.webp';
import brandPuma from '../../assets/images/amirkhon/home/brand-puma.webp';
import brandUsPolo from '../../assets/images/amirkhon/home/brand-us-polo.webp';

import avatar1 from '../../assets/images/amirkhon/home/feedback-avatar-1.webp';
import avatar2 from '../../assets/images/amirkhon/home/feedback-avatar-2.webp';
import avatar3 from '../../assets/images/amirkhon/home/feedback-avatar-3.webp';

export default function HomePage() {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Limelight Products matching Screenshot 1
  const limelightProducts = [
    {
      id: 1,
      title: 'Black Sweatshirt',
      brand: "Jhanvi's Brand",
      price: 123.0,
      image: productBlackSweatshirt
    },
    {
      id: 2,
      title: 'Pattern Blouse',
      brand: "AS's Brand",
      price: 37.0,
      image: productBlueFlowerTop
    },
    {
      id: 3,
      title: 'White Crop Top',
      brand: "MM's Brand",
      price: 29.0,
      image: productWhiteTeeSunglasses
    },
    {
      id: 4,
      title: 'Lavender Hoodie',
      brand: "Nike's Brand",
      price: 119.0,
      image: productLavenderHoodie
    }
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      
      {/* 1. HERO SLIDER BANNER (Cyan Blue) */}
      <section className="relative bg-[#00AEEF] text-white overflow-hidden min-h-[460px] md:min-h-[560px] flex items-center">
        {/* Left Arrow */}
        <button
          aria-label="Previous Slide"
          className="absolute left-4 md:left-8 z-20 text-white/80 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        {/* Right Arrow */}
        <button
          aria-label="Next Slide"
          className="absolute right-4 md:right-8 z-20 text-white/80 hover:text-white p-2 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-6 flex flex-col items-start gap-4 z-10">
              <span className="text-lg md:text-xl font-medium tracking-wide text-white">
                T-Shirt / Tops
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                Summer<br />Value Pack
              </h1>

              <p className="text-lg sm:text-xl text-white/90 font-normal">
                cool / colorful / comfy
              </p>

              <div className="pt-4">
                <Link
                  to="/products"
                  className="inline-block px-10 py-3.5 bg-white text-[#3C4242] font-bold rounded-lg text-base hover:bg-gray-100 transition-all shadow-md active:scale-95"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Right Model Image */}
            <div className="lg:col-span-6 relative flex justify-center items-end">
              <img
                src={heroSummerPack}
                alt="Summer Value Pack Model"
                className="max-h-[420px] md:max-h-[520px] object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>

        {/* Bottom Pagination Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <span className="w-10 h-1.5 rounded-full bg-white"></span>
          <span className="w-6 h-1 rounded-full bg-white/40"></span>
        </div>
      </section>

      {/* 2. TWO PROMO BANNERS (Yellow & Plum) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Banner 1: Yellow/Amber */}
          <div className="relative rounded-2xl bg-[#F9A03F] overflow-hidden p-8 sm:p-10 flex items-center justify-between shadow-sm min-h-[300px]">
            <div className="flex flex-col items-start gap-2 z-10 max-w-[60%]">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#3C4242]/80">
                Low Price
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#3C4242] leading-tight">
                High Coziness
              </h3>
              <p className="text-sm font-bold text-[#3C4242]/90 pt-1">
                UPTO 50% OFF
              </p>
              <Link
                to="/products"
                className="text-sm font-extrabold text-[#3C4242] underline underline-offset-4 pt-4 hover:text-black transition-colors"
              >
                Explore Items
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-[45%] flex items-end justify-end">
              <img
                src={catWomenSummerFloral}
                alt="High Coziness"
                className="max-h-[92%] object-contain object-bottom"
              />
            </div>
          </div>

          {/* Banner 2: Deep Plum */}
          <div className="relative rounded-2xl bg-[#5C2D5C] text-white overflow-hidden p-8 sm:p-10 flex items-center justify-between shadow-sm min-h-[300px]">
            <div className="flex flex-col items-start gap-2 z-10 max-w-[60%]">
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Beyoung Represents
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Breezy Summer Style
              </h3>
              <p className="text-sm font-bold text-white/90 pt-1">
                UPTO 50% OFF
              </p>
              <Link
                to="/products"
                className="text-sm font-extrabold text-white underline underline-offset-4 pt-4 hover:text-gray-200 transition-colors"
              >
                Explore Items
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-[45%] flex items-end justify-end">
              <img
                src={catWomenYellowPolka}
                alt="Breezy Summer Style"
                className="max-h-[92%] object-contain object-bottom"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. NEW ARRIVAL SECTION (Carousel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            New Arrival
          </h2>
        </div>

        {/* Carousel Grid */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            aria-label="Previous Products"
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow flex items-center justify-center text-[#3C4242] hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 4 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: 'Knitted Joggers', image: catMenHoodies },
              { title: 'Full Sleeve', image: productChecksShirt },
              { title: 'Active T-Shirts', image: catMenBlackTee },
              { title: 'Urban Shirts', image: productWhiteTeeSunglasses }
            ].map((item, idx) => (
              <Link
                key={idx}
                to="/products"
                className="group flex flex-col gap-3"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            aria-label="Next Products"
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#E6E6E6] shadow flex items-center justify-center text-[#3C4242] hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 4. BIG SAVING ZONE (5 Cards Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
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
            <div className="relative rounded-2xl bg-[#64C2E0] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-white">
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <h3 className="text-2xl font-black leading-tight">Hawaiian Shirts</h3>
                <p className="text-xs font-medium text-white/90">Dress up in summer vibe</p>
                <p className="text-sm font-extrabold pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white" />
                <Link
                  to="/products"
                  className="px-5 py-2 rounded-md border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#64C2E0] transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingHawaiianShorts}
                alt="Hawaiian Shirts"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none"
              />
            </div>

            {/* Card 2: Printed T-Shirt (Dusty Rose) */}
            <div className="relative rounded-2xl bg-[#BF7A86] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-white">
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <span className="px-2.5 py-1 rounded bg-[#3C4242] text-[10px] font-bold tracking-wider uppercase text-white mb-1">
                  Limited Stock
                </span>
                <h3 className="text-2xl font-black leading-tight">Printed T-Shirt</h3>
                <p className="text-xs font-medium text-white/90">Super cool neon & typography</p>
                <p className="text-sm font-extrabold pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white" />
                <Link
                  to="/products"
                  className="px-5 py-2 rounded-md border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#BF7A86] transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingPrintedTee}
                alt="Printed T-Shirt"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none"
              />
            </div>

            {/* Card 3: Cargo Joggers (Cream/Off-White) */}
            <div className="relative rounded-2xl bg-[#DFDFDF] overflow-hidden p-6 sm:p-7 min-h-[340px] flex flex-col justify-between text-[#3C4242]">
              <div className="flex flex-col items-start gap-1 z-10 max-w-[65%]">
                <h3 className="text-2xl font-black leading-tight text-[#3C4242]">Cargo Joggers</h3>
                <p className="text-xs font-medium text-[#3C4242]/80">Move in style</p>
                <p className="text-sm font-extrabold text-[#3C4242] pt-2">UPTO 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-[#3C4242]" />
                <Link
                  to="/products"
                  className="px-5 py-2 rounded-md border border-[#3C4242] text-[#3C4242] font-bold text-xs uppercase tracking-wider hover:bg-[#3C4242] hover:text-white transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingCargoPants}
                alt="Cargo Joggers"
                className="absolute right-0 bottom-0 max-h-[85%] w-[55%] object-contain object-bottom pointer-events-none"
              />
            </div>

          </div>

          {/* Bottom Row: 2 Wide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 4: Urban Shirts (Mint) */}
            <div className="relative rounded-2xl bg-[#82C3B4] overflow-hidden p-8 sm:p-9 min-h-[300px] flex flex-col justify-between text-white">
              <div className="flex flex-col items-start gap-1 z-10 max-w-[60%]">
                <h3 className="text-3xl font-black leading-tight">Urban Shirts</h3>
                <p className="text-xs font-medium text-white/90">with street style</p>
                <p className="text-xs font-extrabold text-[#3C4242] tracking-wider uppercase mt-1">
                  LIVE IN COMFORT
                </p>
                <p className="text-sm font-extrabold pt-2">FLAT 50% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white" />
                <Link
                  to="/products"
                  className="px-6 py-2 rounded-md border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#82C3B4] transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={catMenDenimShirt}
                alt="Urban Shirts"
                className="absolute right-0 bottom-0 max-h-[92%] w-[48%] object-contain object-bottom pointer-events-none"
              />
            </div>

            {/* Card 5: Oversized T-Shirts (Powder Blue) */}
            <div className="relative rounded-2xl bg-[#88C5DC] overflow-hidden p-8 sm:p-9 min-h-[300px] flex flex-col justify-between text-white">
              <div className="flex flex-col items-start gap-1 z-10 max-w-[60%]">
                <h3 className="text-3xl font-black leading-tight">Oversized T-Shirts</h3>
                <p className="text-xs font-medium text-white/90">Street streetwear</p>
                <p className="text-sm font-extrabold pt-2">FLAT 60% OFF</p>
              </div>

              <div className="z-10 flex flex-col items-start gap-2 pt-6">
                <ArrowDown className="w-5 h-5 text-white" />
                <Link
                  to="/products"
                  className="px-6 py-2 rounded-md border border-white text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#88C5DC] transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              <img
                src={savingChecksShirt}
                alt="Oversized T-Shirts"
                className="absolute right-0 bottom-0 max-h-[92%] w-[48%] object-contain object-bottom pointer-events-none"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. BIG SPLIT BANNER (Dark foliage + Young Friends) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-lg">
          
          {/* Left Dark Botanical Box */}
          <div className="bg-[#1C261C] text-white p-10 sm:p-14 md:p-16 flex flex-col justify-center items-start gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              WE MADE YOUR EVERYDAY FASHION BETTER!
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              In our journey to build the fashion brand you love, we haven't just focused on design, but also on quality, comfort and durability.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-block px-9 py-3 bg-white text-[#3C4242] font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-md"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Group Photo */}
          <div className="relative bg-[#FAA916] min-h-[320px] flex items-center justify-center overflow-hidden">
            <img
              src={savingHawaiianShorts}
              alt="Everyday Fashion"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* 6. CATEGORIES FOR MEN (8 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Categories For Men
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { title: 'Shirts', image: catMenChecks },
            { title: 'Printed T-Shirts', image: catMenBlackTee },
            { title: 'Plain T-Shirts', image: catMenDenimShirt },
            { title: 'Polo T-Shirts', image: catMenBluePolo },
            { title: 'Hoodies & Sweatshirt', image: catMenHoodies },
            { title: 'Jeans', image: productChecksShirt },
            { title: 'Activewear', image: savingCargoPants },
            { title: 'Boxers', image: productUrbanJacket }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products"
              className="group flex flex-col gap-3"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-xs text-[#807D7E]">Explore Now!</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. CATEGORIES FOR WOMEN (4 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Categories For Women
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { title: 'Hoodies & Sweatshirt', image: catWomenRedCoat },
            { title: 'Coats & Parkas', image: catWomenRainbowDress },
            { title: 'Tees & T-Shirt', image: catWomenBlueCrop },
            { title: 'Boxers', image: catWomenYellowPolka }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products"
              className="group flex flex-col gap-3"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-xs text-[#807D7E]">Explore Now!</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. TOP BRANDS DEAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-[#343538] text-white py-12 px-6 sm:px-12 text-center flex flex-col items-center gap-6 shadow-md">
          <h2 className="text-3xl md:text-4xl font-black">
            Top Brands Deal
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Up To <span className="text-[#FDB022] font-black">60% OFF</span> on brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 w-full max-w-4xl">
            {/* Nike */}
            <div className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow">
              <img src={brandNike} alt="Nike" className="max-h-full max-w-full object-contain" />
            </div>

            {/* H&M */}
            <div className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow">
              <span className="text-2xl font-black tracking-wider text-[#E50914] italic">H&M</span>
            </div>

            {/* Levis */}
            <div className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow">
              <span className="px-3 py-1 bg-[#C41230] text-white font-black text-sm uppercase rounded tracking-wider">Levi's</span>
            </div>

            {/* US Polo */}
            <div className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow">
              <img src={brandUsPolo} alt="US Polo" className="max-h-full max-w-full object-contain" />
            </div>

            {/* Puma */}
            <div className="w-28 sm:w-36 h-16 sm:h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow">
              <img src={brandPuma} alt="Puma" className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. IN THE LIMELIGHT (4 Product Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            In The Limelight
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limelightProducts.map((p) => {
            const inFav = isInWishlist(p.id);
            return (
              <div key={p.id} className="group flex flex-col gap-3">
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6]">
                  <Link to={`/product/${p.id}`} className="block w-full h-full">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-[#3C4242] hover:text-[#8A33FD] transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${inFav ? 'fill-red-500 text-red-500' : 'text-[#3C4242]'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link to={`/product/${p.id}`} className="flex flex-col">
                    <h4 className="text-sm font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors line-clamp-1">
                      {p.title}
                    </h4>
                    <span className="text-xs text-[#807D7E]">{p.brand}</span>
                  </Link>
                  <span className="px-3 py-1 rounded-lg bg-[#F6F6F6] text-sm font-bold text-[#3C4242]">
                    ${p.price.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FEEDBACK SECTION (3 Testimonial Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3C4242]">
            Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              name: 'Floyd Miles',
              rating: 3.5,
              avatar: avatar1,
              comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
            },
            {
              id: 2,
              name: 'Ronald Richards',
              rating: 4.0,
              avatar: avatar2,
              comment: 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
            },
            {
              id: 3,
              name: 'Savannah Nguyen',
              rating: 4.5,
              avatar: avatar3,
              comment: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
            }
          ].map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#BEBCBD]/50 p-6 flex flex-col justify-between gap-4 bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#E6E6E6]"
                  />
                  <h4 className="text-base font-bold text-[#3C4242]">{item.name}</h4>
                </div>
                <div className="flex items-center text-[#EDD146]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#807D7E] leading-relaxed">
                {item.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Feedback Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-8">
          <span className="w-6 h-1.5 rounded-full bg-[#3C4242]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        </div>
      </section>

    </div>
  );
}
