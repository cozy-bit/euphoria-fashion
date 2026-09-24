import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import bannerImg from '../../assets/images/kibriyo/auth/6-create-password-banner.jpg';

export default function CreateNewPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password successfully reset! Please sign in with your new credentials.');
    navigate('/signin');
  };

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Create New Password"
      subtitle="Your new password must be different from previous used passwords."
    >
      <form onSubmit={handleReset} className="space-y-4">
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Must be at least 8 characters"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
          required
        />

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
