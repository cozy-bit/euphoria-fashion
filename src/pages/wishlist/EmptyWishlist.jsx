import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/empty-wishlist/empty-wishlist-illustration.svg';
import recBlueFlowerTop from '../../assets/images/tolibov/empty-wishlist/rec-blue-flower-top.webp';
import recChecksShirt from '../../assets/images/tolibov/empty-wishlist/rec-checks-shirt.webp';
import recLavenderHoodie from '../../assets/images/tolibov/empty-wishlist/rec-lavender-hoodie.webp';
import recWhiteTee from '../../assets/images/tolibov/empty-wishlist/rec-white-tee.webp';
import styles from './EmptyWishlist.module.css';

const recommendedItems = [
  {
    id: 1,
    name: 'Blue Flower Top',
    brand: "Wanderlust Co.",
    price: '$29.00',
    image: recBlueFlowerTop
  },
  {
    id: 2,
    name: 'Checks Casual Shirt',
    brand: 'Euphoria Classic',
    price: '$45.00',
    image: recChecksShirt
  },
  {
    id: 3,
    name: 'Lavender Cozy Hoodie',
    brand: 'Streetwear Club',
    price: '$65.00',
    image: recLavenderHoodie
  },
  {
    id: 4,
    name: 'Essential White Tee',
    brand: 'Minimal Basics',
    price: '$19.00',
    image: recWhiteTee
  }
];

export default function EmptyWishlist() {
  return (
    <div className={styles.container}>
      {/* 1. Empty State Card */}
      <div className={styles.contentCard}>
        <div className={styles.imageWrapper}>
          <img
            src={illustration}
            alt="Your wishlist is empty"
            className={styles.illustration}
          />
        </div>

        <h2 className={styles.title}>Your Wishlist is Empty</h2>
        <p className={styles.description}>
          You don't have any products in your wishlist yet. Explore our latest arrivals and save items you love for later.
        </p>

        <Link to="/products" className={styles.ctaButton}>
          Explore Collection
        </Link>
      </div>

      {/* 2. Recommended Showcase from Tolibov's assets */}
      <div className={styles.recommendedSection}>
        <h3 className={styles.recommendedTitle}>Recommended For You</h3>
        <div className={styles.recommendedGrid}>
          {recommendedItems.map((item) => (
            <Link key={item.id} to="/products" className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>
              <div className={styles.productInfo}>
                <h4 className={styles.productName}>{item.name}</h4>
                <p className={styles.productBrand}>{item.brand}</p>
                <span className={styles.productPrice}>{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
