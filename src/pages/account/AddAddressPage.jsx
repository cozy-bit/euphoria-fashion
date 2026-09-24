import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/images/tolibov/add-address/address-icon.png';
import styles from './AddAddress.module.css';

export default function AddAddressPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Address saved successfully!');
    navigate('/checkout');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img src={icon} alt="Delivery Address" className={styles.icon} />
          </div>
          <div>
            <h1 className={styles.title}>Add Delivery Address</h1>
            <p className={styles.subtitle}>Enter a new address for orders and shipping</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Recipient Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.input}
              placeholder="e.g. Jhanvi Shah"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Street Address</label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className={styles.input}
              placeholder="e.g. 89 Main Market Street, Flat 4B"
              required
            />
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={styles.input}
                placeholder="Ahmedabad"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className={styles.input}
                placeholder="Gujarat"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Postal Code</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              className={styles.input}
              placeholder="380015"
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              Save Address
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
