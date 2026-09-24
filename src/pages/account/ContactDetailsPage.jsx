import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './ContactDetails.module.css';

export default function ContactDetailsPage() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <img src={user?.avatar} alt={user?.name} className={styles.avatar} />
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>My Contact Details</h1>
            <p className={styles.subtitle}>Update your personal profile information</p>
          </div>
        </div>

        {saved && (
          <div className={styles.alertSuccess}>
            Profile changes successfully saved!
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
