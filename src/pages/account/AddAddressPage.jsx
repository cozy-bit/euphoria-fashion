import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import icon from '../../assets/images/tolibov/add-address/address-icon.webp';
import styles from './AddAddress.module.css';

export default function AddAddressPage() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    firstName: user?.address?.firstName || '',
    lastName: user?.address?.lastName || '',
    street: user?.address?.street || '',
    apartment: user?.address?.apartment || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || 'India',
    phone: user?.phone || ''
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      }
    });

    setSaved(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <img src={icon} alt="Delivery Address" className={styles.icon} />
          </div>
          <div>
            <h1 className={styles.title}>
              {user?.address?.street ? 'Edit Delivery Address' : 'Add Delivery Address'}
            </h1>
            <p className={styles.subtitle}>
              {user?.address?.street
                ? 'Update your address for orders and home deliveries'
                : 'Enter an address for orders and home deliveries'}
            </p>
          </div>
        </div>

        {saved && (
          <div className={styles.alertSuccess}>
            Delivery address successfully saved! Redirecting to profile...
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. Jhanvi"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. Shah"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className={styles.input}
              placeholder="House number and street name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Apartment, suite, unit (optional)</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className={styles.input}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ahmedabad"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styles.input}
                placeholder="Gujarat"
                required
              />
            </div>
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={styles.input}
                placeholder="380015"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.input}
                placeholder="India"
                required
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              Save Address
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
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
