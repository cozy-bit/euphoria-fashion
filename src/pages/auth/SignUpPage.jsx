import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import bannerImg from '../../assets/images/kibriyo/auth/2-sign-up-banner.jpg';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!terms) {
      alert('Please agree to Euphoria terms and conditions');
      return;
    }
    login(email, password);
    navigate('/');
  };

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Sign Up"
      subtitle="Sign up for free to access to in any of our products"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="designer@euphoria.in"
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Use 8 or more characters with letters and numbers"
          required
        />

        <div className="flex items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            id="terms"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="w-4 h-4 accent-[#8A33FD] mt-0.5 rounded cursor-pointer"
            required
          />
          <label htmlFor="terms" className="text-xs text-[#807D7E] leading-normal font-medium cursor-pointer">
            Agree to our <span className="underline text-[#3C4242]">Terms of use</span> and <span className="underline text-[#3C4242]">Privacy Policy</span>
          </label>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          Sign Up
        </Button>

        <p className="text-xs text-center text-[#807D7E] font-medium pt-2">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-[#8A33FD] hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
