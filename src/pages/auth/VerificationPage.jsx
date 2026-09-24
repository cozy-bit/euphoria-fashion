import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import bannerImg from '../../assets/images/kibriyo/auth/5-verification-banner.jpg';

export default function VerificationPage() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    // auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    navigate('/create-new-password');
  };

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Verification"
      subtitle="Verify your code sent to your registered email address"
    >
      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-3">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              id={`digit-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              className="w-14 h-14 text-center text-xl font-extrabold text-[#3C4242] bg-[#F6F6F6] border border-[#BEBCBD] rounded-xl focus:bg-white focus:border-[#8A33FD] focus:ring-2 focus:ring-[#8A33FD]/20 outline-none transition-all"
              required
            />
          ))}
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Verify Code
        </Button>
      </form>
    </AuthLayout>
  );
}
