import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RefreshCw, CreditCard, Check, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/ui/ProductCard';
import Tabs from '../../components/ui/Tabs';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PRODUCTS } from '../../data/products';

// Images for Product Detail from Kibriyo folder
import heroRaven from '../../assets/images/kibriyo/product-detail/product-hero-raven-hoodie.jpg';
import thumb1 from '../../assets/images/kibriyo/product-detail/gallery-thumb-1-brown-jacket.jpg';
import thumb2 from '../../assets/images/kibriyo/product-detail/gallery-thumb-2-raven-detail.jpg';
import thumb3 from '../../assets/images/kibriyo/product-detail/gallery-thumb-3-pink-hoodie.jpg';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id)) || PRODUCTS[0];

  const galleryImages = [
    product.image || heroRaven,
    thumb1,
    thumb2,
    thumb3
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#1A1A1A');
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWish = isInWishlist(product.id);
  const similarProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    alert(`Added ${product.title} (${selectedSize}) to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop', to: '/' },
          { label: product.category === 'men' ? 'Men' : 'Women', to: `/products?cat=${product.category}` },
          { label: product.title }
        ]}
      />

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        
        {/* Gallery Column (Thumbnails left + Large Hero right) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`w-18 h-20 rounded-xl overflow-hidden border-2 transition-all bg-[#F6F6F6] shrink-0 ${
                  activeImage === img ? 'border-[#8A33FD] shadow-md scale-102' : 'border-transparent hover:border-[#BEBCBD]'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Large Active Preview */}
          <div className="flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#F6F6F6] shadow-md border border-[#E6E6E6]">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
          </div>
        </div>

        {/* Product Details & Actions Column */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#8A33FD]">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242] mt-1 leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Comments */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#3C4242]">{product.rating}</span>
              <span className="text-xs text-[#807D7E] font-medium">
                ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#E6E6E6]">
            <span className="text-3xl font-black text-[#3C4242]">
              ${Number(product.price).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#807D7E] line-through font-bold">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="bg-[#EC4899] text-white text-xs font-extrabold px-2.5 py-1 rounded-md">
                {product.discount}
              </span>
            )}
          </div>

          {/* Select Size */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label className="text-xs font-bold text-[#3C4242] uppercase tracking-wider">
                Select Size
              </label>
              <button type="button" className="text-xs font-bold text-[#8A33FD] hover:underline">
                Size Guide →
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-11 rounded-xl text-xs font-extrabold border transition-all ${
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

          {/* Colors Available */}
          <div>
            <label className="block text-xs font-bold text-[#3C4242] uppercase tracking-wider mb-2.5">
              Colours Available
            </label>
            <div className="flex items-center gap-3">
              {(product.colors || ['#1A1A1A', '#8A33FD', '#6B7280']).map((col, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColor(col)}
                  style={{ backgroundColor: col }}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                    selectedColor === col ? 'border-[#8A33FD] scale-110 ring-2 ring-[#8A33FD]/30' : 'border-[#E6E6E6]'
                  }`}
                >
                  {selectedColor === col && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </Button>

            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`w-13 h-13 rounded-xl border flex items-center justify-center transition-all ${
                inWish
                  ? 'border-[#EC4899] bg-[#FDF2F8] text-[#EC4899]'
                  : 'border-[#BEBCBD] text-[#3C4242] hover:border-[#EC4899] hover:text-[#EC4899]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWish ? 'fill-[#EC4899]' : ''}`} />
            </button>
          </div>

          {/* Service Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E6E6E6] text-xs font-semibold text-[#807D7E]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#8A33FD]" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8A33FD]" />
              <span>Free shipping $100+</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#8A33FD]" />
              <span>Free 30-day return</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#8A33FD]" />
              <span>100% Cotton Quality</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs: Description / Specifications / Reviews */}
      <section className="mt-16 pt-8 border-t border-[#E6E6E6]">
        <Tabs
          tabs={[
            { id: 'description', label: 'Product Description' },
            { id: 'specs', label: 'Fabric & Specifications' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewsCount})` }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="mb-8"
        />

        {activeTab === 'description' && (
          <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-[#807D7E] leading-relaxed">
            <p>
              100% Bio-washed Cotton — makes the fabric extra soft and silky. Provides unmatched comfort for all-day streetwear wear. Flexible ribbed cuffs and hem for athletic movement.
            </p>
            <p>
              Pair it with Euphoria cargo pants or tailored checks shirts to complete an effortless casual look. Designed with double-needle stitching for lasting durability through countless washes.
            </p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-xl">
            <dl className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <dt className="font-bold text-[#3C4242]">Fabric Composition</dt>
              <dd className="text-[#807D7E]">100% Combed Cotton, 320 GSM</dd>
              <dt className="font-bold text-[#3C4242]">Fit Type</dt>
              <dd className="text-[#807D7E]">Relaxed Drop-Shoulder</dd>
              <dt className="font-bold text-[#3C4242]">Care Instructions</dt>
              <dd className="text-[#807D7E]">Machine wash cold, tumble dry low</dd>
              <dt className="font-bold text-[#3C4242]">Origin</dt>
              <dd className="text-[#807D7E]">Made in Euphoria Mills</dd>
            </dl>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-2xl space-y-4">
            <div className="p-4 bg-[#F6F6F6] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-[#3C4242]">{product.rating} / 5</span>
                <p className="text-xs text-[#807D7E]">Based on {product.reviewsCount} verified reviews</p>
              </div>
              <Button variant="primary" size="sm">
                Write a Review
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Similar Products */}
      <section className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 bg-[#8A33FD] rounded-full" />
            <h2 className="text-2xl font-black text-[#3C4242]">
              Similar Products
            </h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-[#8A33FD] hover:underline flex items-center gap-1">
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
