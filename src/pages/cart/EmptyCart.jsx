import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/empty-cart/empty-cart-illustration.svg';
import styles from './EmptyCart.module.css';

export default function EmptyCart() {
  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        <div className={styles.imageWrapper}>
          <img
            src={illustration}
            alt="Your cart is empty"
            className={styles.illustration}
          />
        </div>

        <h2 className={styles.title}>Your Cart is Empty and Sad :(</h2>
        <p className={styles.description}>
          Add something to make it happy! Explore our summer pack, fresh streetwear hoodies and trendy styles.
        </p>

        <Link to="/products" className={styles.ctaButton}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
