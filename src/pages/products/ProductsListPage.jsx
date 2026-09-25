import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Heart,
  ShoppingCart,
  Check,
  X,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import {
  PRODUCTS,
  SIDEBAR_CATEGORIES,
  COLOR_OPTIONS,
  SIZE_OPTIONS,
  DRESS_STYLES,
  DEPARTMENT_INFO
} from '../../data/products';

const DEPARTMENTS = [
  { id: 'all', label: 'All Apparel' },
  { id: 'women', label: "Women's Fashion" },
  { id: 'men', label: "Men's Fashion" },
  { id: 'combos', label: 'Combos & Packs' },
  { id: 'joggers', label: 'Joggers & Pants' }
];

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Read URL query params
  const urlCat = searchParams.get('cat') || 'all';
  const urlSearch = searchParams.get('q') || '';

  // Department state (synced with URL)
  const [selectedDept, setSelectedDept] = useState(urlCat);
  useEffect(() => {
    setSelectedDept(urlCat);
  }, [urlCat]);

  // Filters & Sorting state
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDressStyle, setSelectedDressStyle] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 200]);
  const [addedProductId, setAddedProductId] = useState(null);

  // Accordion toggle states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isColorsOpen, setIsColorsOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Switch department and update URL query param
  const handleDepartmentChange = (deptId) => {
    setSelectedDept(deptId);
    const newParams = new URLSearchParams(searchParams);
    if (deptId === 'all') {
      newParams.delete('cat');
    } else {
      newParams.set('cat', deptId);
    }
    setSearchParams(newParams);
  };

  // Quick reset for all filters
  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedDressStyle(null);
    setPriceRange([10, 200]);
    if (searchParams.get('q')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('q');
      setSearchParams(newParams);
    }
  };

  // Check if any filter is active
  const hasActiveFilters =
    activeCategory !== 'All' ||
    selectedColor !== null ||
    selectedSize !== null ||
    selectedDressStyle !== null ||
    priceRange[0] > 10 ||
    priceRange[1] < 200 ||
    Boolean(urlSearch);

  // Compute category counts within the selected department
  const categoryCounts = useMemo(() => {
    const counts = { All: 0 };
    SIDEBAR_CATEGORIES.forEach((cat) => {
      counts[cat] = 0;
    });

    PRODUCTS.forEach((product) => {
      if (selectedDept === 'all' || product.category === selectedDept) {
        counts.All += 1;
        if (counts[product.subCategory] !== undefined) {
          counts[product.subCategory] += 1;
        }
      }
    });

    return counts;
  }, [selectedDept]);

  // Filtered and Sorted products
  const displayProducts = useMemo(() => {
    // 1. Filter
    const filtered = PRODUCTS.filter((product) => {
      // Department separation
      if (selectedDept !== 'all' && product.category !== selectedDept) {
        return false;
      }
      // Sub-category
      if (activeCategory !== 'All' && product.subCategory !== activeCategory) {
        return false;
      }
      // Search term from URL
      if (urlSearch) {
        const query = urlSearch.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.subCategory?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCat) return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // Color
      if (selectedColor) {
        const targetColorHex = COLOR_OPTIONS.find((c) => c.name === selectedColor)?.hex;
        if (!product.colors || !product.colors.includes(targetColorHex)) {
          return false;
        }
      }
      // Size
      if (selectedSize) {
        if (!product.sizes || !product.sizes.includes(selectedSize)) {
          return false;
        }
      }
      // Dress style
      if (selectedDressStyle) {
        if (product.dressStyle !== selectedDressStyle) {
          return false;
        }
      }

      return true;
    });

    // 2. Sort
    return filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'New':
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id - a.id;
        case 'PriceAsc':
          return a.price - b.price;
        case 'PriceDesc':
          return b.price - a.price;
        case 'Rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'Recommended':
        default:
          if (a.isLimelight && !b.isLimelight) return -1;
          if (!a.isLimelight && b.isLimelight) return 1;
          return (b.rating || 0) - (a.rating || 0);
      }
    });
  }, [
    selectedDept,
    activeCategory,
    urlSearch,
    priceRange,
    selectedColor,
    selectedSize,
    selectedDressStyle,
    selectedSort
  ]);

  // Department SEO & text metadata
  const currentDeptInfo = DEPARTMENT_INFO[selectedDept] || DEPARTMENT_INFO.all;

  // Handle Quick Add to Cart with temporary animation
  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', product.colors?.[0] || '#252525');
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((prev) => (prev === product.id ? null : prev));
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10">
      
      {/* 1. TOP HEADER & APPLE-STYLE DEPARTMENT SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#BEBCBD]/30">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#807D7E] mb-2">
            <Link to="/" className="hover:text-[#3C4242] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#3C4242] font-bold">Shop</span>
            {selectedDept !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#8A33FD] font-bold capitalize">{selectedDept}</span>
              </>
            )}
          </nav>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3C4242] tracking-tight">
            {currentDeptInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#807D7E] mt-1">
            {currentDeptInfo.subtitle}
          </p>
        </div>

        {/* Apple-style floating pill department switcher */}
        <div className="flex items-center p-1.5 bg-[#F6F6F6] rounded-full border border-neutral-200/80 shadow-xs max-w-full overflow-x-auto self-start md:self-auto scrollbar-none">
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept === dept.id;
            return (
              <button
                key={dept.id}
                onClick={() => handleDepartmentChange(dept.id)}
                className="relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold tracking-tight rounded-full transition-colors cursor-pointer select-none whitespace-nowrap"
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeDeptPill"
                    className="absolute inset-0 bg-[#8A33FD] rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isSelected ? 'text-white' : 'text-[#807D7E] hover:text-[#3C4242]'
                  }`}
                >
                  {dept.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: SIDEBAR FILTER + PRODUCT GRID */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        
        {/* LEFT SIDEBAR FILTER */}
        <aside className="w-full lg:w-72 shrink-0 bg-white rounded-3xl border border-[#BEBCBD]/30 p-6 flex flex-col gap-6 shadow-xs sticky top-28 self-start">
          
          {/* Filter Header & Clear All */}
          <div className="flex items-center justify-between pb-4 border-b border-[#BEBCBD]/30">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#3C4242]">Filter</h3>
              <SlidersHorizontal className="w-4 h-4 text-[#807D7E]" />
            </div>

            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#8A33FD] hover:text-[#6610F2] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </motion.button>
            )}
          </div>

          {/* Categories List with Live Match Counts */}
          <div className="flex flex-col gap-1.5 pb-6 border-b border-[#BEBCBD]/30">
            {SIDEBAR_CATEGORIES.map((cat, idx) => {
              const isCatActive = activeCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(isCatActive ? 'All' : cat)}
                  className={`flex items-center justify-between py-2 px-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                    isCatActive
                      ? 'bg-[#8A33FD]/10 text-[#8A33FD] font-bold'
                      : 'text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[11px] font-medium text-[#BEBCBD]">
                      {count}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isCatActive ? 'text-[#8A33FD] translate-x-0.5' : 'text-[#BEBCBD]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Price Range Accordion */}
          <div className="flex flex-col gap-3 pb-6 border-b border-[#BEBCBD]/30">
            <button
              onClick={() => setIsPriceOpen(!isPriceOpen)}
              className="flex items-center justify-between text-sm sm:text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Price Range</span>
              {isPriceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {isPriceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex flex-col gap-4 pt-1 overflow-hidden"
                >
                  {/* Slider Control */}
                  <div className="relative flex flex-col gap-2 pt-2">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full accent-[#8A33FD] cursor-pointer"
                    />
                    <div className="flex items-center justify-between text-[11px] text-[#807D7E]">
                      <span>Min: ${priceRange[0]}</span>
                      <span>Max: ${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Dual price inputs */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 py-1.5 px-3 border border-[#BEBCBD] rounded-xl text-center text-xs font-bold text-[#3C4242] bg-[#FAFAFA]">
                      ${priceRange[0]}
                    </div>
                    <span className="text-[#807D7E] text-xs font-bold">-</span>
                    <div className="flex-1 py-1.5 px-3 border border-[#BEBCBD] rounded-xl text-center text-xs font-bold text-[#3C4242] bg-[#FAFAFA]">
                      ${priceRange[1]}
                    </div>
                  </div>

                  {/* Quick price presets */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      { label: 'All', range: [10, 200] },
                      { label: '< $50', range: [10, 50] },
                      { label: '$50 - $100', range: [50, 100] },
                      { label: '$100+', range: [100, 200] }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => setPriceRange(preset.range)}
                        className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border transition-colors cursor-pointer ${
                          priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                            ? 'bg-[#8A33FD] border-[#8A33FD] text-white shadow-xs'
                            : 'border-[#BEBCBD]/50 text-[#807D7E] hover:border-[#8A33FD]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Colors Swatches Grid (12 Colors) */}
          <div className="flex flex-col gap-3 pb-6 border-b border-[#BEBCBD]/30">
            <button
              onClick={() => setIsColorsOpen(!isColorsOpen)}
              className="flex items-center justify-between text-sm sm:text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>Colors</span>
                {selectedColor && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A33FD]/10 text-[#8A33FD]">
                    {selectedColor}
                  </span>
                )}
              </div>
              {isColorsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {isColorsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="grid grid-cols-4 gap-y-3.5 gap-x-2 pt-2 overflow-hidden"
                >
                  {COLOR_OPTIONS.map((col, idx) => {
                    const isColSelected = selectedColor === col.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(isColSelected ? null : col.name)}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            col.hex === '#FFFFFF' ? 'border border-[#BEBCBD]' : ''
                          } ${
                            isColSelected
                              ? 'ring-2 ring-offset-2 ring-[#8A33FD] scale-110 shadow-sm'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: col.hex }}
                        >
                          {isColSelected && (
                            <Check
                              className={`w-3.5 h-3.5 ${
                                col.hex === '#FFFFFF' ? 'text-black' : 'text-white'
                              }`}
                            />
                          )}
                        </div>
                        <span
                          className={`text-[10px] text-center leading-tight transition-colors ${
                            isColSelected
                              ? 'font-bold text-[#8A33FD]'
                              : 'font-medium text-[#807D7E] group-hover:text-[#3C4242]'
                          }`}
                        >
                          {col.name}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Size Pills Grid */}
          <div className="flex flex-col gap-3 pb-6 border-b border-[#BEBCBD]/30">
            <button
              onClick={() => setIsSizeOpen(!isSizeOpen)}
              className="flex items-center justify-between text-sm sm:text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>Size</span>
                {selectedSize && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8A33FD]/10 text-[#8A33FD]">
                    {selectedSize}
                  </span>
                )}
              </div>
              {isSizeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {isSizeOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="grid grid-cols-3 gap-2 pt-1 overflow-hidden"
                >
                  {SIZE_OPTIONS.map((sz, idx) => {
                    const isSzSelected = selectedSize === sz;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(isSzSelected ? null : sz)}
                        className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isSzSelected
                            ? 'border-[#8A33FD] bg-[#8A33FD] text-white shadow-sm scale-102'
                            : 'border-[#BEBCBD]/60 text-[#3C4242] hover:border-[#8A33FD] hover:bg-[#F6F6F6]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dress Style List */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsDressStyleOpen(!isDressStyleOpen)}
              className="flex items-center justify-between text-sm sm:text-base font-bold text-[#3C4242] cursor-pointer"
            >
              <span>Dress Style</span>
              {isDressStyleOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence initial={false}>
              {isDressStyleOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex flex-col gap-1.5 pt-1 overflow-hidden"
                >
                  {DRESS_STYLES.map((style, idx) => {
                    const isStyleActive = selectedDressStyle === style;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDressStyle(isStyleActive ? null : style)}
                        className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer text-left ${
                          isStyleActive
                            ? 'bg-[#8A33FD]/10 text-[#8A33FD] font-bold'
                            : 'text-[#807D7E] hover:text-[#3C4242] hover:bg-[#F6F6F6]'
                        }`}
                      >
                        <span>{style}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 ${
                            isStyleActive ? 'text-[#8A33FD]' : 'text-[#BEBCBD]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </aside>

        {/* RIGHT MAIN CONTENT AREA: Controls Bar + Apple-grade Animated Grid */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Sorting & Filter Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-[#BEBCBD]/30 shadow-2xs">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#3C4242]">
                Showing <span className="text-[#8A33FD] font-extrabold">{displayProducts.length}</span> items
              </span>
              {urlSearch && (
                <span className="text-xs bg-[#F6F6F6] text-[#807D7E] px-2.5 py-1 rounded-lg">
                  Query: "{urlSearch}"
                </span>
              )}
            </div>

            {/* Apple Segmented Sort Controller */}
            <div className="flex items-center gap-3">
              {/* Quick toggle for New & Recommended matching Screenshot 2 */}
              <div className="flex items-center p-1 bg-[#F6F6F6] rounded-xl border border-neutral-200/70 shadow-2xs">
                <button
                  onClick={() => setSelectedSort('Recommended')}
                  className="relative px-3.5 py-1.5 text-xs sm:text-sm font-bold cursor-pointer transition-colors"
                >
                  {selectedSort === 'Recommended' && (
                    <motion.div
                      layoutId="activeSortPill"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      selectedSort === 'Recommended'
                        ? 'text-[#8A33FD]'
                        : 'text-[#807D7E] hover:text-[#3C4242]'
                    }`}
                  >
                    Recommended
                  </span>
                </button>

                <button
                  onClick={() => setSelectedSort('New')}
                  className="relative px-3.5 py-1.5 text-xs sm:text-sm font-bold cursor-pointer transition-colors"
                >
                  {selectedSort === 'New' && (
                    <motion.div
                      layoutId="activeSortPill"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      selectedSort === 'New'
                        ? 'text-[#8A33FD]'
                        : 'text-[#807D7E] hover:text-[#3C4242]'
                    }`}
                  >
                    New
                  </span>
                </button>
              </div>

              {/* Extended Sort Dropdown */}
              <div className="relative flex items-center">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-[#BEBCBD]/50 rounded-xl text-xs sm:text-sm font-bold text-[#3C4242] focus:outline-none focus:border-[#8A33FD] cursor-pointer shadow-2xs"
                >
                  <option value="Recommended">Sort: Recommended</option>
                  <option value="New">Sort: Newest Arrivals</option>
                  <option value="PriceAsc">Price: Low to High</option>
                  <option value="PriceDesc">Price: High to Low</option>
                  <option value="Rating">Customer Rating</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#807D7E] absolute right-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-2 pt-1"
              >
                <span className="text-xs font-bold text-[#807D7E] mr-1">Active Filters:</span>

                {activeCategory !== 'All' && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#8A33FD]/10 text-[#8A33FD] text-xs font-bold"
                  >
                    Category: {activeCategory}
                    <button
                      onClick={() => setActiveCategory('All')}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.span>
                )}

                {selectedColor && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#8A33FD]/10 text-[#8A33FD] text-xs font-bold"
                  >
                    Color: {selectedColor}
                    <button
                      onClick={() => setSelectedColor(null)}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.span>
                )}

                {selectedSize && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#8A33FD]/10 text-[#8A33FD] text-xs font-bold"
                  >
                    Size: {selectedSize}
                    <button
                      onClick={() => setSelectedSize(null)}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.span>
                )}

                {selectedDressStyle && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#8A33FD]/10 text-[#8A33FD] text-xs font-bold"
                  >
                    Style: {selectedDressStyle}
                    <button
                      onClick={() => setSelectedDressStyle(null)}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.span>
                )}

                {(priceRange[0] > 10 || priceRange[1] < 200) && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#8A33FD]/10 text-[#8A33FD] text-xs font-bold"
                  >
                    ${priceRange[0]} - ${priceRange[1]}
                    <button
                      onClick={() => setPriceRange([10, 200])}
                      className="hover:text-black cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-[#807D7E] hover:text-[#8A33FD] underline underline-offset-4 ml-1 cursor-pointer transition-colors"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid with Apple-grade Framer Motion animations */}
          {displayProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-[#BEBCBD]/30 p-8 shadow-xs"
            >
              <div className="w-16 h-16 rounded-full bg-[#8A33FD]/10 flex items-center justify-center text-[#8A33FD] mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#3C4242]">No products found</h3>
              <p className="text-sm text-[#807D7E] max-w-md mt-1 mb-6">
                We couldn't find items matching your selected criteria. Try adjusting your price or clearing filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#8A33FD] hover:bg-[#6610F2] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayProducts.map((p) => {
                  const inFav = isInWishlist(p.id);
                  const isJustAdded = addedProductId === p.id;

                  return (
                    <motion.div
                      layout
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 350, damping: 30 },
                        opacity: { duration: 0.25 },
                        scale: { duration: 0.25 }
                      }}
                      whileHover={{
                        y: -6,
                        transition: { type: 'spring', stiffness: 400, damping: 22 }
                      }}
                      className="group flex flex-col gap-3 bg-white rounded-3xl p-3 border border-transparent hover:border-neutral-200 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Image Container with Wishlist Badge & Quick Action */}
                      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F6F6] shadow-2xs">
                        <Link to={`/product/${p.id}`} className="block w-full h-full">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            loading="lazy"
                          />
                        </Link>

                        {/* Top Badges */}
                        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                          {p.isNew && (
                            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-[#8A33FD] shadow-xs">
                              New
                            </span>
                          )}
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="px-2 py-0.5 rounded-full bg-[#EC4899] text-white text-[10px] font-extrabold shadow-xs">
                              -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                            </span>
                          )}
                        </div>

                        {/* Heart Wishlist Icon Button with Spring feedback */}
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(p);
                          }}
                          aria-label="Wishlist"
                          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#3C4242] hover:scale-110 transition-all cursor-pointer z-10"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              inFav ? 'fill-red-500 text-red-500' : 'text-[#3C4242]'
                            }`}
                          />
                        </motion.button>

                        {/* Quick Add To Cart Button (Apple-style frosted slide-up) */}
                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => handleQuickAdd(e, p)}
                            className={`w-full py-2.5 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 hover:bg-emerald-700'
                                : 'bg-[#8A33FD]/95 hover:bg-[#6610F2]'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-4 h-4 text-white" />
                                <span>Added to Cart!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>

                      {/* Info Row: Title & Brand on Left, Price on Right */}
                      <div className="flex items-center justify-between pt-1 px-1">
                        <Link to={`/product/${p.id}`} className="flex flex-col max-w-[70%]">
                          <h4 className="text-sm sm:text-base font-bold text-[#3C4242] group-hover:text-[#8A33FD] transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <span className="text-xs text-[#807D7E] flex items-center gap-2">
                            <span>{p.brand}</span>
                            {p.rating && (
                              <span className="text-[10px] text-amber-500 font-bold">
                                ★ {p.rating}
                              </span>
                            )}
                          </span>
                        </Link>

                        <div className="flex flex-col items-end">
                          <span className="px-2.5 py-1 rounded-xl bg-[#F6F6F6] text-sm font-extrabold text-[#3C4242]">
                            ${p.price.toFixed(2)}
                          </span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span className="text-[10px] text-[#BEBCBD] line-through pr-1 font-semibold">
                              ${p.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

        </div>

      </div>

      {/* 3. DYNAMIC SEO CONTENT SECTION (ADAPTED TO CURRENT DEPARTMENT) */}
      <section className="pt-8 border-t border-[#BEBCBD]/30 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3C4242]">
            {currentDeptInfo.seoTitle}
          </h2>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#3C4242]">
          {currentDeptInfo.seoHeading}
        </h3>

        <div className="text-sm text-[#807D7E] leading-relaxed flex flex-col gap-3">
          {currentDeptInfo.seoText.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {showFullDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-col gap-3"
            >
              <p>
                Browse through our wide variety of apparel, including premium cotton tees, tailored joggers, warm winter jackets, and high-value combo multipacks. With convenient payment options, fast domestic dispatch, and 30-day effortless returns, shopping online at Euphoria has never been easier.
              </p>
            </motion.div>
          )}

          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-[#3C4242] font-bold text-xs uppercase tracking-wider underline underline-offset-4 self-start cursor-pointer hover:text-[#8A33FD] transition-colors"
          >
            {showFullDescription ? 'See Less' : 'See More'}
          </button>
        </div>
      </section>

      {/* 4. DYNAMIC BEST PRICE TABLE (ADAPTED TO CURRENT DEPARTMENT) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 rounded-full bg-[#8A33FD]"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#3C4242]">
            {currentDeptInfo.tableTitle}
          </h2>
        </div>

        {/* Clean Apple-style rounded responsive table */}
        <div className="rounded-2xl border border-[#BEBCBD]/30 overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F6F6F6] text-[#3C4242] font-extrabold uppercase text-xs tracking-wider border-b border-[#BEBCBD]/30">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6 text-right">Best Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BEBCBD]/20">
                {currentDeptInfo.table.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-[#F6F6F6]/60 transition-colors ${
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
