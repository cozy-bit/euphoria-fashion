import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import bannerImg from '../../assets/images/kibriyo/auth/3-reset-password-banner.jpg';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/check-email', { state: { email } });
  };

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Reset Your Password"
      subtitle="Enter your email and we'll send you a link to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="focus@euphoria.in"
          required
        />

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Send Instructions
        </Button>

        <p className="text-xs text-center text-[#807D7E] font-medium">
          Back to{' '}
          <Link to="/signin" className="font-bold text-[#8A33FD] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
