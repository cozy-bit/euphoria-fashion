import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, RotateCcw, Search, Check } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ProductCard from '../../components/ui/ProductCard';
import Button from '../../components/ui/Button';
import { PRODUCTS } from '../../data/products';

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [maxPrice, setMaxPrice] = useState(150);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchFilter, setSearchFilter] = useState(initialQuery);

  // Sync category when URL searchParams changes
  React.useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q) setSearchFilter(q);
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Clothing' },
    { id: 'men', label: "Men's Wear" },
    { id: 'women', label: "Women's Wear" }
  ];

  const subCategories = [
    { id: 'all', label: 'All Types' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'tops', label: 'Tops' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const colors = [
    { name: 'Black', hex: '#111827' },
    { name: 'Blue', hex: '#2563EB' },
    { name: 'Purple', hex: '#8A33FD' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Yellow', hex: '#FACC15' },
    { name: 'White', hex: '#F9FAFB' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Subcategory filter
      if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
      // Size filter
      if (selectedSize !== 'all' && !p.sizes?.includes(selectedSize)) return false;
      // Max price
      if (p.price > maxPrice) return false;
      // Search
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended default
    });
  }, [selectedCategory, selectedSubCategory, selectedSize, selectedColor, maxPrice, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(150);
    setSearchFilter('');
    setSortBy('recommended');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Clothing', to: '/products' },
          { label: selectedCategory === 'men' ? "Men's Collection" : selectedCategory === 'women' ? "Women's Collection" : 'All Catalog' }
        ]}
      />

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4 pb-20">
        
        {/* ======================================================== */}
        {/* FILTER SIDEBAR                                           */}
        {/* ======================================================== */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 shadow-xs space-y-6 sticky top-24">
            
            {/* Header / Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E6]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#8A33FD]" />
                <h3 className="font-extrabold text-base text-[#3C4242]">Filter</h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-[#807D7E] hover:text-[#8A33FD] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Department (Men / Women) */}
            <div>
              <label className="block text-xs font-bold text-[#3C4242] uppercase tracking-wider mb-3">
                Department
              </label>
              <div className="flex flex-col gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-[#8A33FD] text-white font-bold'
                        : 'text-[#807D7E] hover:bg-[#F6F6F6] hover:text-[#3C4242]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-categories */}
            <div>
              <label className="block text-xs font-bold text-[#3C4242] uppercase tracking-wider mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {subCategories.map(sub => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubCategory(sub.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedSubCategory === sub.id
                        ? 'border-[#8A33FD] bg-[#8A33FD] text-white font-bold'
                        : 'border-[#E6E6E6] text-[#807D7E] hover:border-[#3C4242] hover:text-[#3C4242]'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#3C4242] uppercase tracking-wider">
                  Max Price
                </label>
                <span className="text-xs font-extrabold text-[#8A33FD]">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8A33FD] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#807D7E] font-semibold mt-1">
                <span>$20</span>
                <span>$200</span>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-xs font-bold text-[#3C4242] uppercase tracking-wider mb-3">
                Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(selectedSize === size ? 'all' : size)}
                    className={`text-xs py-2 rounded-lg border font-bold transition-all ${
                      selectedSize === size
                        ? 'border-[#8A33FD] bg-[#8A33FD] text-white shadow-xs'
                        : 'border-[#E6E6E6] text-[#3C4242] hover:border-[#3C4242]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-bold text-[#3C4242] uppercase tracking-wider mb-3">
                Colors
              </label>
              <div className="flex items-center gap-2.5 flex-wrap">
                {colors.map(col => (
                  <button
                    key={col.name}
                    type="button"
                    title={col.name}
                    onClick={() => setSelectedColor(selectedColor === col.name ? 'all' : col.name)}
                    style={{ backgroundColor: col.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                      selectedColor === col.name ? 'border-[#8A33FD] scale-110 ring-2 ring-[#8A33FD]/30' : 'border-[#E6E6E6]'
                    }`}
                  >
                    {selectedColor === col.name && (
                      <Check className={`w-3 h-3 ${col.name === 'White' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* ======================================================== */}
        {/* PRODUCTS GRID CONTENT                                    */}
        {/* ======================================================== */}
        <section className="lg:col-span-3 space-y-6">
          
          {/* Top Control Bar: Title & Sort */}
          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-[#3C4242]">
                {selectedCategory === 'men' ? "Men's Clothing" : selectedCategory === 'women' ? "Women's Clothing" : "All Products"}
              </h1>
              <p className="text-xs text-[#807D7E] font-semibold mt-0.5">
                Showing {filteredProducts.length} results
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label htmlFor="sort-select" className="text-xs font-bold text-[#807D7E] shrink-0">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F6F6F6] text-xs font-bold text-[#3C4242] border border-[#E6E6E6] rounded-lg px-3 py-2 outline-none focus:border-[#8A33FD] cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Items Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[#F6F6F6] rounded-2xl p-12 text-center space-y-4">
              <p className="text-base font-extrabold text-[#3C4242]">
                No matching apparel found
              </p>
              <p className="text-xs text-[#807D7E] font-medium max-w-sm mx-auto">
                Try loosening your filters or resetting to view the full Euphoria catalog.
              </p>
              <div>
                <Button onClick={resetFilters} variant="primary" size="sm">
                  Reset All Filters
                </Button>
              </div>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}
