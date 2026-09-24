import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import Button from '../../components/ui/Button';
import bannerImg from '../../assets/images/kibriyo/auth/4-check-email-banner.jpg';

export default function CheckEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <AuthLayout
      bannerImage={bannerImg}
      title="Check Email"
      subtitle={`Please check your email inbox and click on the received link to reset a password or enter code.`}
    >
      <div className="space-y-6">
        <div className="p-4 bg-[#F4ECFF]/50 border border-[#8A33FD]/20 rounded-xl text-center">
          <p className="text-xs text-[#3C4242] font-semibold">
            Sent to: <span className="font-extrabold text-[#8A33FD]">{email}</span>
          </p>
        </div>

        <Button
          onClick={() => navigate('/verification')}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Enter Code Manually
        </Button>

        <p className="text-xs text-center text-[#807D7E] font-medium">
          Didn't receive the email?{' '}
          <button
            type="button"
            onClick={() => alert('Code resent!')}
            className="font-bold text-[#8A33FD] hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
