import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";;

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import authImage from '../../assets/images/kibriyo/auth/2-sign-up-banner.webp';

export default function AuthLayout({
  children,
  image = authImage,
  activePage = ''
}) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          h-[109px]
          border-b border-[#dedede]
          px-6 sm:px-10 lg:px-[7%]
          flex items-center
        "
      >
        <div className="w-full flex items-center gap-6">

          <Link
            to="/signup"
            className="
              text-[28px]
              italic
              font-serif
              font-bold
              leading-none
              text-[#333]
            "
          >
            Euphoria

            <span className="
              block
              text-[7px]
              text-center
              mt-1
            ">
              Keep it classy.
            </span>
          </Link>

          <div className="
            hidden md:flex
            items-center
            gap-2
            bg-[#f6f6f6]
            rounded-[8px]
            h-[47px]
            w-[180px]
            px-4
            ml-5
          ">
            <SearchIcon
              sx={{
                color: '#777',
                fontSize: 21
              }}
            />

            <span className="text-[#777]">
              Search
            </span>
          </div>

          <button className="
            hidden lg:flex
            items-center
            gap-1
            ml-auto
            text-[14px]
          ">
            English (united States)

            <KeyboardArrowDownIcon
              sx={{ fontSize: 18 }}
            />
          </button>

          <div className="
            flex
            items-center
            gap-3
            ml-auto
            lg:ml-5
          ">

            <Link
              to="/signin"
              className={`
                w-[120px]
                lg:w-[139px]
                h-[47px]
                rounded-[8px]
                border
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  activePage === 'signin'
                    ? 'bg-[#8B32F5] text-white border-[#8B32F5]'
                    : 'border-[#333] text-[#8B32F5] hover:bg-[#8B32F5] hover:text-white'
                }
              `}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`
                w-[120px]
                lg:w-[139px]
                h-[47px]
                rounded-[8px]
                border
                flex
                items-center
                justify-center
                transition-all
                duration-300
                ${
                  activePage === 'signup'
                    ? 'bg-[#8B32F5] text-white border-[#8B32F5]'
                    : 'border-[#333] text-[#8B32F5] hover:bg-[#8B32F5] hover:text-white'
                }
              `}
            >
              Sign Up
            </Link>

          </div>
        </div>
      </motion.header>

      <main className="
        min-h-[calc(100vh-109px)]
        flex
        flex-col
        lg:flex-row
      ">

        <motion.div
          initial={{
            opacity: 0,
            x: -40
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.7
          }}
          className="
            hidden
            lg:block
            w-1/2
            min-h-[calc(100vh-109px)]
          "
        >
          <img
            src={image}
            alt=""
            className="
              w-full
              h-full
              object-cover
            "
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.7
          }}
          className="
            w-full
            lg:w-1/2
            px-6
            sm:px-10
            md:px-16
            lg:px-[5.5%]
            py-12
            lg:py-14
          "
        >
          <div className="max-w-[565px]">
            {children}
          </div>
        </motion.div>

      </main>
    </div>
  );
}