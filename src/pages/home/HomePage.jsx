import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';
import { PRODUCTS } from '../../data/products';

// Images from organized folders
import heroSummerPack from '../../assets/images/amirkhon/home/hero-summer-pack.png';
import savingHawaiianShorts from '../../assets/images/amirkhon/home/saving-hawaiian-shorts.jpg';
import savingCargoPants from '../../assets/images/amirkhon/home/saving-cargo-pants.jpg';
import savingChecksShirt from '../../assets/images/amirkhon/home/saving-checks-shirt.jpg';
import savingPrintedTee from '../../assets/images/amirkhon/home/saving-printed-black-tee.jpg';
import savingSmartWatch from '../../assets/images/amirkhon/home/saving-smart-watch.png';

// Category photos
import catMenBlackTee from '../../assets/images/amirkhon/home/cat-men-black-tee.jpg';
import catMenBluePolo from '../../assets/images/amirkhon/home/cat-men-blue-polo.jpg';
import catMenHoodies from '../../assets/images/amirkhon/home/cat-men-hoodies.jpg';
import catMenUrbanJacket from '../../assets/images/amirkhon/home/cat-men-urban-jacket.jpg';

import catWomenRedCoat from '../../assets/images/amirkhon/home/cat-women-red-coat.jpg';
import catWomenRainbowDress from '../../assets/images/amirkhon/home/cat-women-rainbow-dress.jpg';
import catWomenBlueCrop from '../../assets/images/amirkhon/home/cat-women-blue-crop.jpg';
import catWomenYellowPolka from '../../assets/images/amirkhon/home/cat-women-yellow-polka.jpg';

// Brands & Testimonials
import brandNike from '../../assets/images/amirkhon/home/brand-nike.png';
import brandPuma from '../../assets/images/amirkhon/home/brand-puma.png';
import brandUsPolo from '../../assets/images/amirkhon/home/brand-us-polo.png';

import avatar1 from '../../assets/images/amirkhon/home/feedback-avatar-1.png';
import avatar2 from '../../assets/images/amirkhon/home/feedback-avatar-2.png';
import avatar3 from '../../assets/images/amirkhon/home/feedback-avatar-3.png';

export default function HomePage() {
  const limelightProducts = PRODUCTS.filter(p => p.isLimelight).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-[#2A174E] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8A33FD]/30 border border-[#8A33FD]/50 text-xs font-extrabold uppercase tracking-wider text-[#C084FC]">
                <Sparkles className="w-3.5 h-3.5" />
                T-Shirt / Tops
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Summer Value Pack
              </h1>

              <p className="text-base sm:text-lg text-[#BEBCBD] max-w-xl font-medium leading-relaxed">
                Cool, colorful, comfy. Explore our brand new collection with premium breathable fabrics and oversized streetwear fits.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button to="/products" size="lg" variant="primary">
                  Shop Now
                </Button>
                <Button to="/products?cat=women" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-[#3C4242]">
                  Explore Women
                </Button>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#8A33FD] shrink-0" />
                  <span className="text-xs font-semibold text-white/80">Free Shipping $100+</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-5 h-5 text-[#8A33FD] shrink-0" />
                  <span className="text-xs font-semibold text-white/80">Free 30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#8A33FD] shrink-0" />
                  <span className="text-xs font-semibold text-white/80">100% Cotton Bio</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-gradient-to-tr from-[#170A2C] to-[#3C1B6E] flex items-center justify-center p-6">
                <img
                  src={heroSummerPack}
                  alt="Summer Value Pack"
                  className="w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BIG SAVING ZONE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3C4242] tracking-tight">
            Big Saving Zone
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Hawaiian Shirts */}
          <div className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-neutral-100">
            <img
              src={savingHawaiianShorts}
              alt="Hawaiian Shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-extrabold text-[#F59E0B] uppercase tracking-wider mb-1">Limited Time</span>
              <h3 className="text-xl font-black mb-1">Hawaiian Prints & Shorts</h3>
              <p className="text-xs text-white/80 font-medium mb-4">FEATURING CASUAL PRINTS</p>
              <div>
                <Button to="/products?cat=men" size="sm" variant="primary">
                  UP TO 50% OFF
                </Button>
              </div>
            </div>
          </div>

          {/* Card 2: Cargo Pants */}
          <div className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-neutral-100">
            <img
              src={savingCargoPants}
              alt="Cargo Track Pants"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-extrabold text-[#EC4899] uppercase tracking-wider mb-1">Street Style</span>
              <h3 className="text-xl font-black mb-1">Cargo Joggers</h3>
              <p className="text-xs text-white/80 font-medium mb-4">MOVE WITH COMFORT</p>
              <div>
                <Button to="/products?cat=men" size="sm" variant="primary">
                  STARTING AT $39
                </Button>
              </div>
            </div>
          </div>

          {/* Card 3: Plaid Checks */}
          <div className="relative rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-neutral-100">
            <img
              src={savingChecksShirt}
              alt="Checks Shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-extrabold text-[#10B981] uppercase tracking-wider mb-1">Best Seller</span>
              <h3 className="text-xl font-black mb-1">Oversized Checks Shirts</h3>
              <p className="text-xs text-white/80 font-medium mb-4">STREETWEAR FLANNELS</p>
              <div>
                <Button to="/products?cat=men" size="sm" variant="primary">
                  EXPLORE NOW
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CATEGORIES FOR MEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3C4242] tracking-tight">
              Categories For Men
            </h2>
          </div>
          <Link to="/products?cat=men" className="text-sm font-bold text-[#8A33FD] hover:underline flex items-center gap-1">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'T-Shirts & Tops', img: catMenBlackTee, count: '14+ Products' },
            { title: 'Polo Shirts', img: catMenBluePolo, count: '8+ Products' },
            { title: 'Hoodies & Sweats', img: catMenHoodies, count: '12+ Products' },
            { title: 'Jackets & Outerwear', img: catMenUrbanJacket, count: '6+ Products' }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products?cat=men"
              className="group flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6] shadow-sm group-hover:shadow-lg transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#3C4242] text-sm group-hover:text-[#8A33FD] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-[#807D7E] font-medium">{cat.count}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:text-[#8A33FD] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. CATEGORIES FOR WOMEN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3C4242] tracking-tight">
              Categories For Women
            </h2>
          </div>
          <Link to="/products?cat=women" className="text-sm font-bold text-[#8A33FD] hover:underline flex items-center gap-1">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: 'Coats & Trench', img: catWomenRedCoat, count: '10+ Styles' },
            { title: 'Summer Dresses', img: catWomenRainbowDress, count: '15+ Styles' },
            { title: 'Crop Tops & Tees', img: catWomenBlueCrop, count: '22+ Styles' },
            { title: 'Polka & Florals', img: catWomenYellowPolka, count: '18+ Styles' }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products?cat=women"
              className="group flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6] shadow-sm group-hover:shadow-lg transition-all duration-300">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#3C4242] text-sm group-hover:text-[#8A33FD] transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-[#807D7E] font-medium">{cat.count}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#807D7E] group-hover:text-[#8A33FD] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. IN THE LIMELIGHT (TRENDING BESTSELLERS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3C4242] tracking-tight">
              In The Limelight
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-[#8A33FD] hover:underline flex items-center gap-1">
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {limelightProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. TOP BRANDS */}
      <section className="bg-[#3C4242] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Top Brands Deal
          </h2>
          <p className="text-sm text-[#F6F6F6]/80 font-medium mb-10 max-w-md mx-auto">
            Up to <span className="text-[#F59E0B] font-bold">60% off</span> on your favorite athletic and tailored brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            <div className="w-36 h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow-md hover:scale-105 transition-transform">
              <img src={brandNike} alt="Nike" className="max-h-10 object-contain" />
            </div>
            <div className="w-36 h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow-md hover:scale-105 transition-transform">
              <img src={brandPuma} alt="Puma" className="max-h-12 object-contain" />
            </div>
            <div className="w-36 h-20 bg-white rounded-xl flex items-center justify-center p-3 shadow-md hover:scale-105 transition-transform">
              <img src={brandUsPolo} alt="US Polo" className="max-h-10 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER FEEDBACK / TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3C4242] tracking-tight">
            Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              avatar: avatar1,
              name: 'Floyd Miles',
              rating: 5,
              text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
            },
            {
              avatar: avatar2,
              name: 'Ronald Richards',
              rating: 5,
              text: 'Ultra fast delivery and the Raven Hoodie fits exceptionally well! The 100% cotton fabric feels heavy and luxurious. Will definitely order the other colorways.'
            },
            {
              avatar: avatar3,
              name: 'Savannah Nguyen',
              rating: 5,
              text: 'I loved the floral print crop top! Accurate sizing, vibrant colors just like in the studio photos. Best online shopping experience this season.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#8A33FD]/20 shadow-xs"
                  />
                  <div>
                    <h3 className="font-extrabold text-sm text-[#3C4242]">{item.name}</h3>
                    <div className="flex items-center gap-0.5 text-[#F59E0B]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#807D7E] leading-relaxed font-medium">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
