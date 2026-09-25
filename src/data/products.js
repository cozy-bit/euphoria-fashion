// src/data/products.js
// Catalog data matching Figma design specifications with clear Men/Women separation

import productBlackSweatshirt from '../assets/images/amirkhon/products/product-black-sweatshirt.webp';
import productWhiteTeeSunglasses from '../assets/images/amirkhon/products/product-white-tee-sunglasses.webp';
import productLavenderHoodie from '../assets/images/amirkhon/products/product-lavender-hoodie.webp';
import catWomenSummerFloral from '../assets/images/amirkhon/home/cat-women-summer-floral.webp';
import catWomenBlueCrop from '../assets/images/amirkhon/home/cat-women-blue-crop.webp';
import savingPrintedBlackTee from '../assets/images/amirkhon/home/saving-printed-black-tee.webp';
import catMenHoodies from '../assets/images/amirkhon/home/cat-men-hoodies.webp';
import catWomenYellowPolka from '../assets/images/amirkhon/home/cat-women-yellow-polka.webp';
import productPrintedBlackTee from '../assets/images/amirkhon/products/product-printed-black-tee.webp';
import catMenBlackTee from '../assets/images/amirkhon/home/cat-men-black-tee.webp';
import productBlueFlowerTop from '../assets/images/amirkhon/products/product-blue-flower-top.webp';
import productWomenRainbowDress from '../assets/images/amirkhon/products/product-women-rainbow-dress.webp';

// Additional products for men, women, combos & joggers
import productBluePolo from '../assets/images/amirkhon/products/product-blue-polo.webp';
import productChecksShirt from '../assets/images/amirkhon/products/product-checks-shirt.webp';
import productUrbanJacket from '../assets/images/amirkhon/products/product-urban-jacket.webp';
import productDenimShirt from '../assets/images/amirkhon/products/product-denim-shirt.webp';
import productWomenRedCoat from '../assets/images/amirkhon/products/product-women-red-coat.webp';
import productYellowPolkaDress from '../assets/images/amirkhon/products/product-yellow-polka-dress.webp';
import productPinkHoodie from '../assets/images/amirkhon/products/product-pink-hoodie.webp';
import savingCargoPants from '../assets/images/amirkhon/home/saving-cargo-pants.webp';
import savingHawaiianPolo from '../assets/images/amirkhon/home/saving-hawaiian-polo.webp';
import savingHawaiianShorts from '../assets/images/amirkhon/home/saving-hawaiian-shorts.webp';

export const PRODUCTS = [
  // ==========================================
  // WOMEN'S CLOTHING
  // ==========================================
  {
    id: 2,
    title: 'White Summer T-Shirt',
    brand: "Helen's Brand",
    category: 'women',
    subCategory: 'Plain T-Shirts',
    price: 11.00,
    originalPrice: 19.00,
    image: productWhiteTeeSunglasses,
    colors: ['#FFFFFF', '#E08D9D', '#FDC761'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isLimelight: true,
    rating: 4.9,
    dressStyle: 'Casual'
  },
  {
    id: 3,
    title: 'Lavender Cozy Hoodie',
    brand: "Nike's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 119.00,
    originalPrice: 140.00,
    image: productLavenderHoodie,
    colors: ['#8434E1', '#E4E5E8', '#252525'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isLimelight: true,
    rating: 4.9,
    dressStyle: 'Sport'
  },
  {
    id: 4,
    title: 'Leaves Pattern White Top',
    brand: "wdm's Brand",
    category: 'women',
    subCategory: 'Printed T-Shirts',
    price: 77.00,
    originalPrice: 95.00,
    image: catWomenSummerFloral,
    colors: ['#FFFFFF', '#48BC4E', '#F16F2B'],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    isLimelight: true,
    rating: 4.7,
    dressStyle: 'Casual'
  },
  {
    id: 5,
    title: 'White Printed Crop Top',
    brand: "MM's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 29.00,
    originalPrice: 42.00,
    image: catWomenBlueCrop,
    colors: ['#FFFFFF', '#3FBDF1', '#E08D9D'],
    sizes: ['XS', 'S', 'M'],
    isNew: false,
    isLimelight: false,
    rating: 4.6,
    dressStyle: 'Casual'
  },
  {
    id: 6,
    title: 'Reverse Orange Crop Top',
    brand: "Priya's Brand",
    category: 'women',
    subCategory: 'Printed T-Shirts',
    price: 45.00,
    originalPrice: 60.00,
    image: savingPrintedBlackTee,
    colors: ['#F35528', '#252525', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.4,
    dressStyle: 'Casual'
  },
  {
    id: 8,
    title: 'Yellow Floral Sundress',
    brand: "Dres's Brand",
    category: 'women',
    subCategory: 'Kurti',
    price: 120.00,
    originalPrice: 150.00,
    image: catWomenYellowPolka,
    colors: ['#FDC761', '#F16F2B', '#FFFFFF'],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    isLimelight: false,
    rating: 4.8,
    dressStyle: 'Elegant'
  },
  {
    id: 9,
    title: 'Black Flower Graphic Tee',
    brand: "Jhanvi's Brand",
    category: 'women',
    subCategory: 'Printed T-Shirts',
    price: 37.00,
    originalPrice: 50.00,
    image: productPrintedBlackTee,
    colors: ['#252525', '#E08D9D', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: false,
    isLimelight: false,
    rating: 4.7,
    dressStyle: 'Casual'
  },
  {
    id: 11,
    title: 'Blue Flower Print Crop Top',
    brand: "MM's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 44.00,
    originalPrice: 65.00,
    image: productBlueFlowerTop,
    colors: ['#3FBDF1', '#345EFF', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isLimelight: false,
    rating: 4.9,
    dressStyle: 'Casual'
  },
  {
    id: 12,
    title: 'Multicolor Striped Summer Dress',
    brand: "Helen's Brand",
    category: 'women',
    subCategory: 'Kurti',
    price: 67.00,
    originalPrice: 85.00,
    image: productWomenRainbowDress,
    colors: ['#252525', '#FFFFFF', '#8434E1'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.8,
    dressStyle: 'Elegant'
  },
  {
    id: 17,
    title: 'Red Woolen Winter Coat',
    brand: "Zara's Line",
    category: 'women',
    subCategory: 'Tops',
    price: 135.00,
    originalPrice: 170.00,
    image: productWomenRedCoat,
    colors: ['#F35528', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isLimelight: true,
    rating: 4.9,
    dressStyle: 'Formal'
  },
  {
    id: 18,
    title: 'Yellow Polka Dot Day Dress',
    brand: "Euphoria Women",
    category: 'women',
    subCategory: 'Kurti',
    price: 55.00,
    originalPrice: 75.00,
    image: productYellowPolkaDress,
    colors: ['#FDC761', '#FFFFFF'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: false,
    isLimelight: false,
    rating: 4.6,
    dressStyle: 'Casual'
  },
  {
    id: 19,
    title: 'Pastel Pink Minimal Hoodie',
    brand: "Streetwear Club",
    category: 'women',
    subCategory: 'Tops',
    price: 89.00,
    originalPrice: 110.00,
    image: productPinkHoodie,
    colors: ['#E08D9D', '#FFFFFF', '#8434E1'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isLimelight: true,
    rating: 4.7,
    dressStyle: 'Sport'
  },

  // ==========================================
  // MEN'S CLOTHING
  // ==========================================
  {
    id: 1,
    title: 'Black Minimalist Sweatshirt',
    brand: "Jhanvi's Brand",
    category: 'men',
    subCategory: 'Tops',
    price: 123.00,
    originalPrice: 150.00,
    image: productBlackSweatshirt,
    colors: ['#252525', '#8434E1', '#345EFF'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: true,
    isLimelight: true,
    rating: 4.8,
    dressStyle: 'Casual'
  },
  {
    id: 7,
    title: 'Grey Athletic Sweatshirt',
    brand: "Barbara's Brand",
    category: 'men',
    subCategory: 'Tops',
    price: 89.00,
    originalPrice: 110.00,
    image: catMenHoodies,
    colors: ['#E4E5E8', '#252525', '#345EFF'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: false,
    isLimelight: false,
    rating: 4.6,
    dressStyle: 'Sport'
  },
  {
    id: 10,
    title: 'Oversized Black Cotton Tee',
    brand: "AS's Brand",
    category: 'men',
    subCategory: 'Plain T-Shirts',
    price: 35.00,
    originalPrice: 48.00,
    image: catMenBlackTee,
    colors: ['#252525', '#FFFFFF', '#D67E3B'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isLimelight: false,
    rating: 4.5,
    dressStyle: 'Casual'
  },
  {
    id: 13,
    title: 'Classic Blue Polo T-Shirt',
    brand: "Polo's Brand",
    category: 'men',
    subCategory: 'Plain T-Shirts',
    price: 38.00,
    originalPrice: 50.00,
    image: productBluePolo,
    colors: ['#345EFF', '#252525', '#FFFFFF'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isLimelight: true,
    rating: 4.7,
    dressStyle: 'Classic'
  },
  {
    id: 14,
    title: 'Checked Flannel Casual Shirt',
    brand: "Urban's Brand",
    category: 'men',
    subCategory: 'Full sleeve T-Shirts',
    price: 45.00,
    originalPrice: 65.00,
    image: productChecksShirt,
    colors: ['#F35528', '#252525', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.6,
    dressStyle: 'Casual'
  },
  {
    id: 15,
    title: 'Urban Street Bomber Jacket',
    brand: "Jacket's Brand",
    category: 'men',
    subCategory: 'Tops',
    price: 95.00,
    originalPrice: 130.00,
    image: productUrbanJacket,
    colors: ['#252525', '#D67E3B', '#48BC4E'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isLimelight: false,
    rating: 4.9,
    dressStyle: 'Casual'
  },
  {
    id: 16,
    title: 'Casual Blue Denim Shirt',
    brand: "Levis's Brand",
    category: 'men',
    subCategory: 'Full sleeve T-Shirts',
    price: 52.00,
    originalPrice: 75.00,
    image: productDenimShirt,
    colors: ['#3FBDF1', '#345EFF', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.8,
    dressStyle: 'Classic'
  },

  // ==========================================
  // JOGGERS & PANTS
  // ==========================================
  {
    id: 20,
    title: 'Olive Cargo Utility Joggers',
    brand: 'Streetwear Co.',
    category: 'joggers',
    subCategory: 'Joggers',
    price: 65.00,
    originalPrice: 85.00,
    image: savingCargoPants,
    colors: ['#48BC4E', '#252525', '#D67E3B'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isLimelight: true,
    rating: 4.9,
    dressStyle: 'Sport'
  },
  {
    id: 21,
    title: 'Relaxed Fit Stretch Jeans',
    brand: 'Denim Lab',
    category: 'joggers',
    subCategory: 'Jeans',
    price: 79.00,
    originalPrice: 99.00,
    image: savingCargoPants,
    colors: ['#345EFF', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.7,
    dressStyle: 'Casual'
  },

  // ==========================================
  // COMBOS & MULTI-PACKS
  // ==========================================
  {
    id: 22,
    title: 'Hawaiian Shorts 2-in-1 Combo Pack',
    brand: 'Euphoria Combos',
    category: 'combos',
    subCategory: 'Boxers',
    price: 49.00,
    originalPrice: 75.00,
    image: savingHawaiianShorts,
    colors: ['#F16F2B', '#3FBDF1', '#252525'],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    isLimelight: true,
    rating: 4.8,
    dressStyle: 'Casual'
  },
  {
    id: 23,
    title: 'Pick Any 4 - Plain Polo T-Shirts Combo',
    brand: 'Euphoria Combos',
    category: 'combos',
    subCategory: 'Plain T-Shirts',
    price: 89.00,
    originalPrice: 130.00,
    image: savingHawaiianPolo,
    colors: ['#345EFF', '#FFFFFF', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: true,
    rating: 4.9,
    dressStyle: 'Classic'
  }
];

// Price comparison table data from Screenshot 2
export const BEST_PRICE_TABLE = [
  { item: 'Pick Any 4 - Oversized Plain T-shirt Combo', price: '₹1099' },
  { item: 'Pick Any 4 - Plain Polo T-shirts Combo', price: '₹1099' },
  { item: 'Pick Any 4 - Women Plain Tee / Dress / Kurti Combo', price: '₹1399' },
  { item: 'Multicolor Striped Long Dress with Belt For Women', price: '₹499' },
  { item: 'Pick Any 2: Plain Polo Cotton T-Shirts for Women Combo', price: '₹799' },
  { item: 'Blue Ripped Boyfriend Jeans', price: '₹999' },
  { item: 'Dark Wash High Rise Cut-Out Hem Denim Shorts', price: '₹699' },
  { item: 'Classic Boyfriend Style Heavy Washed Denim Pants', price: '₹1199' },
  { item: 'Women\'s Basic Camisole Pack of 2', price: '₹399' },
  { item: 'Olive Green Solid Regular Fit Casual Shirt for Women', price: '₹749' },
  { item: 'Plain Burgundy Summer Blazer', price: '₹1149' },
  { item: 'Autumn Warm Ribbed Knitted Sweater', price: '₹1199' }
];

export const SIDEBAR_CATEGORIES = [
  'All',
  'Tops',
  'Printed T-Shirts',
  'Plain T-Shirts',
  'Kurti',
  'Boxers',
  'Full sleeve T-Shirts',
  'Joggers',
  'Payjamas',
  'Jeans'
];

export const COLOR_OPTIONS = [
  { name: 'Purple', hex: '#8434E1' },
  { name: 'Black', hex: '#252525' },
  { name: 'Red', hex: '#F35528' },
  { name: 'Orange', hex: '#F16F2B' },
  { name: 'Navy', hex: '#345EFF' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Brown', hex: '#D67E3B' },
  { name: 'Green', hex: '#48BC4E' },
  { name: 'Yellow', hex: '#FDC761' },
  { name: 'Grey', hex: '#E4E5E8' },
  { name: 'Pink', hex: '#E08D9D' },
  { name: 'Light Blue', hex: '#3FBDF1' }
];

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

export const DRESS_STYLES = ['Classic', 'Casual', 'Business', 'Sport', 'Elegant', 'Formal'];

export const DEPARTMENT_INFO = {
  all: {
    title: 'All Apparel & New Arrivals',
    subtitle: 'Explore our complete modern collection crafted for style and daily comfort',
    seoTitle: 'Clothing & Fashion Online in India',
    seoHeading: 'Reexplore Euphoria Collection Online',
    seoText: [
      'Euphoria brings you a comprehensive array of contemporary fashion and everyday comfort for both men and women. From casual street wear to refined essentials, discover clothes tailored for every moment.',
      'Our designs focus on top-grade materials, breathable fabrics, and enduring silhouettes. Enjoy shopping with hassle-free 30-day returns and fast express shipping across India.'
    ],
    tableTitle: 'Best Prices on Euphoria Collection',
    table: [
      { item: 'Pick Any 4 - Plain Polo T-shirts Combo', price: '₹1099' },
      { item: 'Lavender Cozy Sport Hoodie', price: '₹1499' },
      { item: 'Black Minimalist Sweatshirt', price: '₹1299' },
      { item: 'Olive Cargo Utility Joggers', price: '₹899' },
      { item: 'White Summer Cotton T-Shirt', price: '₹399' },
      { item: 'Casual Blue Denim Shirt', price: '₹799' }
    ]
  },
  women: {
    title: "Women's Clothing",
    subtitle: 'Effortless elegance, trendsetting tops and comfortable everyday wear',
    seoTitle: 'Clothing for Women Online in India',
    seoHeading: "Reexplore Women's Clothing Collection Online at Euphoria",
    seoText: [
      "Women's Clothing – Euphoria brings you an array of styles and trends in women's wear, making everyday dressing easy and comfortable. Explore our women's collection online and pick your favorites. Euphoria offers wide range of western wear collection for women online at best price in India.",
      "In our journey to build the fashion brand you love, we haven't just focused on design, but also on quality, comfort and durability. Euphoria is your one stop destination for shopping women's clothing online at affordable price."
    ],
    tableTitle: "Buy Women's Clothing at Best Price",
    table: [
      { item: 'Pick Any 4 - Women Plain Tee / Dress / Kurti Combo', price: '₹1399' },
      { item: 'Lavender Cozy Hoodie', price: '₹1499' },
      { item: 'Leaves Pattern White Top', price: '₹899' },
      { item: 'Multicolor Striped Summer Dress', price: '₹799' },
      { item: 'Red Woolen Winter Coat', price: '₹1899' },
      { item: 'White Summer T-Shirt', price: '₹399' }
    ]
  },
  men: {
    title: "Men's Clothing",
    subtitle: 'Modern cuts, premium sweatshirts, tailored shirts and urban essentials',
    seoTitle: 'Clothing for Men Online in India',
    seoHeading: "Reexplore Men's Clothing Collection Online at Euphoria",
    seoText: [
      "Men's Clothing – Upgrade your everyday style with Euphoria's versatile lineup of men's apparel. From relaxed minimalist sweatshirts to sharp polo shirts and versatile denim jackets, our menswear delivers both comfort and confidence.",
      "Crafted with durable fabrics, clean aesthetics, and attention to stitch details, Euphoria men's fashion ensures you look sharp anywhere from work to weekend getaways."
    ],
    tableTitle: "Buy Men's Clothing at Best Price",
    table: [
      { item: 'Black Minimalist Sweatshirt', price: '₹1299' },
      { item: 'Grey Athletic Sweatshirt', price: '₹999' },
      { item: 'Classic Blue Polo T-Shirt', price: '₹499' },
      { item: 'Urban Street Bomber Jacket', price: '₹1599' },
      { item: 'Checked Flannel Casual Shirt', price: '₹799' },
      { item: 'Casual Blue Denim Shirt', price: '₹899' }
    ]
  },
  combos: {
    title: 'Combos & Multi-Packs',
    subtitle: 'Bundle your favorite styles and save up to 40% on multipacks',
    seoTitle: 'Value Combos & Multi-Packs Online in India',
    seoHeading: 'Save More with Euphoria Value Combos',
    seoText: [
      'Why buy one when you can bundle? Euphoria multi-packs combine our most popular tees, casual shorts, and basics into high-value bundles with unbeatable savings.',
      'Mix and match your favorite colors and silhouettes while enjoying top-tier cotton quality and durable seams.'
    ],
    tableTitle: 'Best Selling Combos & Multi-Packs',
    table: [
      { item: 'Pick Any 4 - Plain Polo T-shirts Combo', price: '₹1099' },
      { item: 'Pick Any 4 - Oversized Plain T-shirt Combo', price: '₹1099' },
      { item: 'Hawaiian Shorts 2-in-1 Combo Pack', price: '₹699' },
      { item: 'Pick Any 2: Plain Polo Cotton T-Shirts Combo', price: '₹799' }
    ]
  },
  joggers: {
    title: 'Joggers & Activewear',
    subtitle: 'Cargo joggers, relaxed fit denim and athletic sweatpants built for movement',
    seoTitle: 'Joggers & Bottoms Online in India',
    seoHeading: 'Street Style Meets Unrivaled Comfort',
    seoText: [
      'Whether you are lounging at home, hitting the gym, or heading out into the city, Euphoria joggers and bottoms deliver maximum stretch, breathability, and functional pockets.',
      'Engineered with premium cotton-spandex blends and reinforced drawstrings, our joggers keep up with your active lifestyle.'
    ],
    tableTitle: 'Best Prices on Joggers & Bottoms',
    table: [
      { item: 'Olive Cargo Utility Joggers', price: '₹899' },
      { item: 'Relaxed Fit Stretch Jeans', price: '₹1199' },
      { item: 'Classic Boyfriend Style Heavy Washed Denim Pants', price: '₹1199' },
      { item: 'Dark Wash High Rise Cut-Out Hem Denim Shorts', price: '₹699' }
    ]
  }
};

