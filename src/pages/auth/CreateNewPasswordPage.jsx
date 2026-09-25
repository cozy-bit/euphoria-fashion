import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import AuthLayout from './AuthLayout';

import passwordImage from '../../assets/images/kibriyo/auth/6-create-password-banner.webp';

const RESET_EMAIL_KEY = 'resetEmail';
const USERS_KEY = 'euphoria_users';
const RESET_CODE_KEY = 'resetCode';

export default function CreateNewPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (password.length < 8) {
      setError(
        'Password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      );
      return;
    }

    const email = localStorage.getItem(
      RESET_EMAIL_KEY
    );

    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || '[]'
    );

    /*
      В твоей текущей регистрации email
      может быть пустым.

      Поэтому если пользователь ранее
      сохранил email в профиле — пароль
      обновится по email.
    */

    const userIndex = users.findIndex(
      (user) =>
        user.email &&
        user.email.toLowerCase() ===
          email?.toLowerCase()
    );

    if (userIndex !== -1) {
      users[userIndex].password = password;

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
      );
    }

    /*
      Даже если email пока не привязан
      к зарегистрированному телефону,
      сам reset flow проходит локально.
    */

    localStorage.removeItem(
      RESET_EMAIL_KEY
    );

    localStorage.removeItem(
      RESET_CODE_KEY
    );

    setSuccess(true);

    setTimeout(() => {
      navigate('/signin');
    }, 1200);
  };

  return (
    <AuthLayout image={passwordImage}>

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
          Create New Password
        </h1>

        <p className="
          mt-3
          text-[#888]
        ">
          Your new password must be different
          from previous passwords.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12"
        >

          <label className="block mb-3">
            New Password
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
            >
              {showPassword
                ? <VisibilityIcon />
                : <VisibilityOffIcon />
              }
            </button>

          </div>

          <label className="
            block
            mt-8
            mb-3
          ">
            Confirm Password
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
                showConfirm
                  ? 'text'
                  : 'password'
              }
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                );
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
                setShowConfirm(
                  !showConfirm
                )
              }
            >
              {showConfirm
                ? <VisibilityIcon />
                : <VisibilityOffIcon />
              }
            </button>

          </div>

          {error && (
            <p className="
              mt-5
              text-sm
              text-[#e63962]
            ">
              {error}
            </p>
          )}

          {success && (
            <motion.p
              initial={{
                opacity: 0,
                y: 5
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
                mt-5
                text-sm
                text-green-600
              "
            >
              Password changed successfully!
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
              w-[210px]
              h-[55px]
              rounded-[7px]
              bg-[#8B32F5]
              text-white
            "
          >
            Create Password
          </motion.button>

        </form>

      </motion.div>

    </AuthLayout>
  );
}