import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import AuthLayout from './AuthLayout';

import resetImage from '../../assets/images/kibriyo/auth/3-reset-password-banner.webp';

const RESET_EMAIL_KEY = 'resetEmail';
const RESET_CODE_KEY = 'resetCode';

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);

    setTimeout(() => {

      // Сохраняем email
      localStorage.setItem(
        RESET_EMAIL_KEY,
        email.trim()
      );

      // Создаём код без backend
      const code = String(
        Math.floor(
          100000 + Math.random() * 900000
        )
      );

      localStorage.setItem(
        RESET_CODE_KEY,
        code
      );

      // Для разработки показываем код
      console.log(
        'Verification code:',
        code
      );

      setLoading(false);

      navigate('/check-email');

    }, 600);
  };

  return (
    <AuthLayout image={resetImage}>

      <motion.div
        initial={{
          opacity: 0,
          y: 25
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >

        <h1 className="
          text-[34px]
          sm:text-[38px]
          font-semibold
        ">
          Reset Your Password
        </h1>

        <p className="
          mt-3
          text-[#888]
        ">
          Enter your email and we'll send you
          a verification code.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12"
        >

          <label className="block mb-3">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="your@email.com"
            className="
              w-full
              h-[62px]
              border
              border-[#777]
              rounded-[8px]
              px-5
              outline-none
              focus:border-[#8B32F5]
              focus:ring-1
              focus:ring-[#8B32F5]
            "
          />

          {error && (
            <p className="
              mt-4
              text-sm
              text-[#e63962]
            ">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="
              mt-7
              w-[180px]
              h-[55px]
              rounded-[7px]
              bg-[#8B32F5]
              text-white
              disabled:opacity-60
            "
          >
            {loading
              ? 'Sending...'
              : 'Send Code'
            }
          </motion.button>

        </form>

      </motion.div>

    </AuthLayout>
  );
}