import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

import signupImage from '../../assets/images/kibriyo/auth/2-sign-up-banner.webp';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [agree, setAgree] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhone = (e) => {
    const numbers = e.target.value
      .replace(/\D/g, '')
      .slice(0, 9);

    setPhone(numbers);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!agree) {
      setError(
        'Please agree to the Terms of use and Privacy Policy.'
      );
      return;
    }

    if (phone.length !== 9) {
      setError(
        'Please enter a valid phone number.'
      );
      return;
    }

    if (password.length < 8) {
      setError(
        'Password must contain at least 8 characters.'
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = register(
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
      image={signupImage}
      activePage="signup"
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
          text-[#333]
        ">
          Sign Up
        </h1>

        <p className="
          mt-2
          text-[#888]
        ">
          Sign up for free to access to in any of our products
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12"
        >

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
            focus-within:ring-1
            focus-within:ring-[#8B32F5]
          ">

            <span className="text-[#555] mr-2">
              +992
            </span>

            <input
              type="tel"
              value={phone}
              onChange={handlePhone}
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
            focus-within:border-[#8B32F5]
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

          <p className="
            text-[14px]
            text-[#888]
            mt-3
          ">
            Use 8 or more characters with a mix of
            letters, numbers & symbols
          </p>

          <label className="
            flex
            gap-3
            items-start
            mt-7
            text-[#777]
            cursor-pointer
          ">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) =>
                setAgree(e.target.checked)
              }
              className="
                w-[18px]
                h-[18px]
                mt-1
                accent-[#555]
              "
            />

            <span>
              Agree to our{' '}
              <span className="underline">
                Terms of use
              </span>{' '}
              and{' '}
              <span className="underline">
                Privacy Policy
              </span>
            </span>
          </label>

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
            type="submit"
            disabled={loading}
            className="
              mt-7
              w-[150px]
              h-[55px]
              rounded-[7px]
              bg-[#8B32F5]
              text-white
              disabled:opacity-60
            "
          >
            {loading
              ? 'Creating...'
              : 'Sign Up'
            }
          </motion.button>

          <p className="
            mt-4
            text-[#777]
          ">
            Already have an account?{' '}

            <Link
              to="/signin"
              className="underline text-[#555]"
            >
              Log in
            </Link>
          </p>

        </form>

      </motion.div>

    </AuthLayout>
  );
}