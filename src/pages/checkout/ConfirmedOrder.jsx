import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/confirmed-order/order-confirmed-illustration.svg';
import styles from './ConfirmedOrder.module.css';

export default function ConfirmedOrder() {
  const orderId = `EUPH-${Math.floor(100000 + Math.random() * 900000)}`;

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
          Thank you for shopping with Euphoria! We have sent your order confirmation receipt and tracking code to your registered email address.
        </p>

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
