import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import AuthLayout from './AuthLayout';

import verificationImage from '../../assets/images/kibriyo/auth/5-verification-banner.webp';

const RESET_CODE_KEY = 'resetCode';

export default function VerificationPage() {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedCode = localStorage.getItem(
      RESET_CODE_KEY
    );

    if (!savedCode) {
      setError(
        'Verification code has expired. Please request a new one.'
      );
      return;
    }

    if (code !== savedCode) {
      setError('Incorrect verification code.');
      return;
    }

    setError('');

    navigate('/create-new-password');
  };

  return (
    <AuthLayout image={verificationImage}>

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
          Verification Code
        </h1>

        <p className="
          mt-3
          text-[#888]
        ">
          Enter the 6-digit code sent to your email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12"
        >

          <label className="block mb-3">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(
                e.target.value
                  .replace(/\D/g, '')
                  .slice(0, 6)
              );

              setError('');
            }}
            placeholder="000000"
            className="
              w-full
              h-[62px]
              border
              border-[#777]
              rounded-[8px]
              px-5
              text-[20px]
              tracking-[8px]
              outline-none
              focus:border-[#8B32F5]
            "
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                mt-4
                text-sm
                text-[#e63962]
              "
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            className="
              mt-7
              w-[180px]
              h-[55px]
              rounded-[7px]
              bg-[#8B32F5]
              text-white
            "
          >
            Verify Code
          </motion.button>

        </form>

      </motion.div>

    </AuthLayout>
  );
}