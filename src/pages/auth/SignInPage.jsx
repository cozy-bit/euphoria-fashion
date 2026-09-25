import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

import signinImage from '../../assets/images/kibriyo/auth/1-sign-in-banner.webp';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (phone.length !== 9) {
      setError(
        'Please enter a valid phone number.'
      );
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login(
        `+992${phone}`,
        password
      );

      if (!result.success) {
        setError(result.message);
        setLoading(false);
        return;
      }

      navigate('/', {
        replace: true
      });
    }, 600);
  };

  return (
    <AuthLayout
      image={signinImage}
      activePage="signin"
    >

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
          Sign In
        </h1>

        <p className="
          mt-2
          text-[#888]
        ">
          Welcome back! Please enter your details.
        </p>

        <form className="mt-12" onSubmit={handleSubmit}>

          <label className="block mb-3">
            Phone Number
          </label>

          <div className="
            h-[62px]
            border
            border-[#777]
            rounded-[8px]
            flex
            items-center
            px-5
            focus-within:border-[#8B32F5]
          ">

            <span className="mr-2">
              +992
            </span>

            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(
                  e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 9)
                );
                setError('');
              }}
              placeholder="90 123 45 67"
              className="
                flex-1
                outline-none
                bg-transparent
              "
            />

          </div>

          <label className="
            block
            mt-8
            mb-3
          ">
            Password
          </label>

          <div className="
            h-[62px]
            border
            border-[#777]
            rounded-[8px]
            flex
            items-center
            px-5
          ">

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="
                flex-1
                outline-none
                bg-transparent
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="text-[#888]"
            >
              {showPassword
                ? <VisibilityIcon />
                : <VisibilityOffIcon />
              }
            </button>

          </div>

          <div className="text-right mt-4">
            <Link
              to="/reset-password"
              className="underline"
            >
              Forget your password
            </Link>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                mt-5
                text-[#e63962]
                text-sm
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
            disabled={loading}
            className="
              mt-7
              w-[150px]
              h-[55px]
              bg-[#8B32F5]
              text-white
              rounded-[7px]
              disabled:opacity-60
            "
          >
            {loading
              ? 'Signing...'
              : 'Sign In'
            }
          </motion.button>

          <p className="
            mt-4
            text-[#777]
          ">
            Don’t have an account?{' '}

            <Link
              to="/signup"
              className="underline text-[#555]"
            >
              Sign up
            </Link>
          </p>

        </form>

      </motion.div>

    </AuthLayout>
  );
}