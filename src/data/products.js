// src/data/products.js
// Catalog data matching Figma design screenshot exactly

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

// Additional for men/combos
import productBluePolo from '../assets/images/amirkhon/products/product-blue-polo.webp';
import productChecksShirt from '../assets/images/amirkhon/products/product-checks-shirt.webp';
import productUrbanJacket from '../assets/images/amirkhon/products/product-urban-jacket.webp';
import productDenimShirt from '../assets/images/amirkhon/products/product-denim-shirt.webp';

export const PRODUCTS = [
  // 12 Products matching Screenshot 2 (Women's Clothing)
  {
    id: 1,
    title: 'Black Sweatshirt',
    brand: "Jhanvi's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 123.00,
    originalPrice: 150.00,
    image: productBlackSweatshirt,
    colors: ['#252525', '#8434E1', '#345EFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isLimelight: true,
    rating: 4.8
  },
  {
    id: 2,
    title: 'White T-Shirt',
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
    rating: 4.5
  },
  {
    id: 3,
    title: 'Lavender Hoodie',
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
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.6
  },
  {
    id: 6,
    title: 'Reverse Crop Top',
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
    rating: 4.4
  },
  {
    id: 7,
    title: 'Grey Sweatshirt',
    brand: "Barbara's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 89.00,
    originalPrice: 110.00,
    image: catMenHoodies,
    colors: ['#E4E5E8', '#252525', '#345EFF'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: false,
    isLimelight: false,
    rating: 4.6
  },
  {
    id: 8,
    title: 'Yellow Hoodie',
    brand: "Dres's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 120.00,
    originalPrice: 150.00,
    image: catWomenYellowPolka,
    colors: ['#FDC761', '#F16F2B', '#FFFFFF'],
    sizes: ['S', 'M', 'L'],
    isNew: true,
    isLimelight: false,
    rating: 4.8
  },
  {
    id: 9,
    title: 'Black Flower T-shirt',
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
    rating: 4.7
  },
  {
    id: 10,
    title: 'Beige Printed Tee',
    brand: "AS's Brand",
    category: 'women',
    subCategory: 'Plain T-Shirts',
    price: 35.00,
    originalPrice: 48.00,
    image: catMenBlackTee,
    colors: ['#D67E3B', '#FFFFFF', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.5
  },
  {
    id: 11,
    title: 'Blue Floral Top',
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
    rating: 4.9
  },
  {
    id: 12,
    title: 'Black Polka Blouse',
    brand: "Helen's Brand",
    category: 'women',
    subCategory: 'Tops',
    price: 67.00,
    originalPrice: 85.00,
    image: productWomenRainbowDress,
    colors: ['#252525', '#FFFFFF', '#8434E1'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.8
  },

  // Men catalog items
  {
    id: 13,
    title: 'Classic Blue Polo T-Shirt',
    brand: "Polo's Brand",
    category: 'men',
    subCategory: 'Polo T-Shirts',
    price: 38.00,
    originalPrice: 50.00,
    image: productBluePolo,
    colors: ['#345EFF', '#252525', '#FFFFFF'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    isNew: true,
    isLimelight: true,
    rating: 4.7
  },
  {
    id: 14,
    title: 'Checked Flannel Casual Shirt',
    brand: "Urban's Brand",
    category: 'men',
    subCategory: 'Shirts',
    price: 45.00,
    originalPrice: 65.00,
    image: productChecksShirt,
    colors: ['#F35528', '#252525', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.6
  },
  {
    id: 15,
    title: 'Urban Street Bomber Jacket',
    brand: "Jacket's Brand",
    category: 'men',
    subCategory: 'Jackets',
    price: 95.00,
    originalPrice: 130.00,
    image: productUrbanJacket,
    colors: ['#252525', '#D67E3B', '#48BC4E'],
    sizes: ['M', 'L', 'XL'],
    isNew: true,
    isLimelight: false,
    rating: 4.9
  },
  {
    id: 16,
    title: 'Casual Blue Denim Shirt',
    brand: "Levis's Brand",
    category: 'men',
    subCategory: 'Shirts',
    price: 52.00,
    originalPrice: 75.00,
    image: productDenimShirt,
    colors: ['#3FBDF1', '#345EFF', '#252525'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isLimelight: false,
    rating: 4.8
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
