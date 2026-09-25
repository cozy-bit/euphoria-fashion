import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import defaultAvatar from '../../assets/images/tolibov/contact-details/user-profile-avatar.webp';
import styles from './ContactDetails.module.css';

export default function ContactDetailsPage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Profile Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatarWrapper}>
              <img
                src={user?.avatar || defaultAvatar}
                alt={user?.name || 'User Profile'}
                className={styles.avatar}
              />
            </div>
            <div>
              <h1 className={styles.title}>My Contact Details</h1>
              <p className={styles.subtitle}>Manage your profile information and contact details</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={styles.logoutBtn}
            title="Log out of your account"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Success Alert */}
        {saved && (
          <div className={styles.alertSuccess}>
            Your contact details have been successfully updated!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Full Name</label>
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
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={styles.input}
              placeholder="e.g. jhanvi.shah@example.com"
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
              placeholder="+91 98765 43210"
              required
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Save Changes
          </button>
        </form>

        {/* Address Book Section */}
        <div className={styles.addressSection}>
          <div className={styles.addressHeader}>
            <h2 className={styles.sectionTitle}>Delivery Address</h2>
            <Link to="/profile/address/new" className={styles.addAddressBtn}>
              Edit Address
            </Link>
          </div>

          <div className={styles.addressCard}>
            <div>
              <span className={styles.addressBadge}>Default Address</span>
              <div className={styles.addressName}>
                {user?.address?.firstName || 'Jhanvi'} {user?.address?.lastName || 'Shah'}
              </div>
              <p className={styles.addressText}>
                {user?.address?.street || '89 Main Market Street, Flat 4B'}
                <br />
                {user?.address?.city || 'Ahmedabad'}, {user?.address?.state || 'Gujarat'} {user?.address?.postalCode || '380015'}
                <br />
                {user?.address?.country || 'India'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
