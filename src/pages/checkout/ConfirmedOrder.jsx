import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/confirmed-order/order-confirmed-illustration.svg';
import { useAuth } from '../../context/AuthContext';
import styles from './ConfirmedOrder.module.css';

export default function ConfirmedOrder() {
  const { user } = useAuth();
  
  // Stable random order id for the session
  const orderId = useMemo(() => `EUPH-${Math.floor(100000 + Math.random() * 900000)}`, []);
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={styles.container}>
      <div className={styles.contentCard}>
        <div className={styles.imageWrapper}>
          <img
            src={illustration}
            alt="Order confirmed"
            className={styles.illustration}
          />
        </div>

        <h1 className={styles.title}>Your Order is Confirmed!</h1>
        <p className={styles.orderNumber}>
          Order Number: <span>#{orderId}</span>
        </p>
        <p className={styles.description}>
          Thank you for shopping with Euphoria! We have sent your order confirmation receipt and tracking code to{' '}
          <strong>{user?.email || 'your email'}</strong>.
        </p>

        <div className={styles.infoBox}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Order Date:</span>
            <span className={styles.infoValue}>{today}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Estimated Delivery:</span>
            <span className={styles.infoValue}>3 - 5 Business Days</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Payment Method:</span>
            <span className={styles.infoValue}>Credit Card (Paid)</span>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link to="/products" className={styles.primaryBtn}>
            Continue Shopping
          </Link>
          <Link to="/orders" className={styles.secondaryBtn}>
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
