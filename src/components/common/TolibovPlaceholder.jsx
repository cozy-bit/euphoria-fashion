import React from 'react';
import styles from './TolibovPlaceholder.module.css';

export default function TolibovPlaceholder({ pageName }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>
        Часть Толибова: {pageName}
      </h1>
    </div>
  );
}
