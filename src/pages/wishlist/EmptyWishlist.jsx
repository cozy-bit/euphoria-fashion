import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/empty-wishlist/empty-wishlist-illustration.svg';
import styles from './EmptyWishlist.module.css';

export default function EmptyWishlist() {
  return (
    <div className={styles.container}>
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
    </div>
  );
}
