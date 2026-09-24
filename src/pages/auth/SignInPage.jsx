import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import bannerImg from '../../assets/images/kibriyo/auth/1-sign-in-banner.jpg';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Sign In Page"
      subtitle="Sign in to your Euphoria account to access your wishlist and orders"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="User name or email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="developer@euphoria.in"
          required
        />

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-[#3C4242]">Password</label>
            <Link to="/reset-password" className="text-xs font-bold text-[#8A33FD] hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Sign In
        </Button>

        <p className="text-xs text-center text-[#807D7E] font-medium">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-bold text-[#8A33FD] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
