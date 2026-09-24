import React from 'react';
import { Link } from 'react-router-dom';
import illustration from '../../assets/images/tolibov/error-404/404-illustration.svg';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={illustration}
            alt="404 Page Not Found"
            className={styles.illustration}
          />
        </div>

        <h1 className={styles.title}>Oops! Page not found</h1>
        <p className={styles.text}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link to="/" className={styles.btn}>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
