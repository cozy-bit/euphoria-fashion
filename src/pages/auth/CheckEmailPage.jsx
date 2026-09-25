import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

import AuthLayout from './AuthLayout';

import emailImage from '../../assets/images/kibriyo/auth/4-check-email-banner.webp';

const RESET_CODE_KEY = 'resetCode';

export default function CheckEmailPage() {
  const navigate = useNavigate();

  const code = localStorage.getItem(
    RESET_CODE_KEY
  );

  return (
    <AuthLayout image={emailImage}>

      <motion.div
        initial={{
          opacity: 0,
          y: 25
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
      >

        <h1 className="
          text-[34px]
          sm:text-[38px]
          font-semibold
        ">
          Check Your Email
        </h1>

        <p className="
          mt-4
          text-[#888]
          leading-7
        ">
          We've sent a verification code to your
          email address.
        </p>

        {/* DEV CODE */}

        {code && (
          <div className="
            mt-8
            p-5
            rounded-[8px]
            bg-[#f7f3ff]
            border
            border-[#e4d5ff]
          ">
            <p className="
              text-sm
              text-[#777]
            ">
              Your verification code:
            </p>

            <p className="
              text-2xl
              font-semibold
              tracking-[8px]
              text-[#8B32F5]
              mt-2
            ">
              {code}
            </p>
          </div>
        )}

        <motion.button
          whileHover={{
            scale: 1.02
          }}
          whileTap={{
            scale: 0.98
          }}
          onClick={() =>
            navigate('/verification')
          }
          className="
            mt-8
            w-[180px]
            h-[55px]
            rounded-[7px]
            bg-[#8B32F5]
            text-white
          "
        >
          Enter Code
        </motion.button>

        <p className="
          mt-5
          text-[#777]
        ">
          Didn't receive the email?{' '}

          <Link
            to="/reset-password"
            className="underline"
          >
            Try again
          </Link>
        </p>

      </motion.div>

    </AuthLayout>
  );
}