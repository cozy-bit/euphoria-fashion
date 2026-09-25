import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import signInImage from "../../assets/images/kibriyo/auth/1-sign-in-banner.webp";
import signUpImage from "../../assets/images/kibriyo/auth/2-sign-up-banner.webp";
import resetImage from "../../assets/images/kibriyo/auth/3-reset-password-banner.webp";
import checkEmailImage from "../../assets/images/kibriyo/auth/4-check-email-banner.webp";
import verificationImage from "../../assets/images/kibriyo/auth/5-verification-banner.webp";
import createPasswordImage from "../../assets/images/kibriyo/auth/6-create-password-banner.webp";

const images = {
  "/signin": signInImage,
  "/signup": signUpImage,
  "/reset-password": resetImage,
  "/check-email": checkEmailImage,
  "/verification": verificationImage,
  "/create-new-password": createPasswordImage,
};

export default function AuthLayout({ children }) {
  const location = useLocation();

  const image = images[location.pathname] || signInImage;

  return (
    <div className="min-h-screen bg-white text-[#333] overflow-hidden">

      {/* HEADER */}
      <header className="h-[110px] border-b border-[#d7d7d7] bg-white">
        <div className="h-full max-w-[1250px] mx-auto px-5 flex items-center justify-between gap-8">

          {/* LOGO */}
          <Link to="/" className="shrink-0">
            <div className="font-serif italic font-bold text-[28px] leading-none">
              Euphoria
            </div>

            <div className="text-[7px] text-center italic -mt-1">
              Keep it classy.
            </div>
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex w-[180px] h-[46px] bg-[#f6f6f6] rounded-[8px] items-center px-5 gap-3 text-[#777]">
            <SearchIcon sx={{ fontSize: 22 }} />

            <span className="text-[16px]">
              Search
            </span>
          </div>

          <div className="flex items-center gap-5">

            {/* LANGUAGE */}
            <button className="hidden lg:flex items-center gap-2 text-[16px]">
              <span>English (united States)</span>
              <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
            </button>

            {/* LOGIN */}
            <Link
              to="/signin"
              className={`hidden sm:flex items-center justify-center w-[140px] h-[48px] rounded-[8px] border border-[#333] text-[16px] transition-all duration-300
                ${
                  location.pathname === "/signin"
                    ? "bg-[#8d32ff] text-white border-[#8d32ff]"
                    : "text-[#8d32ff] hover:bg-[#8d32ff] hover:text-white"
                }
              `}
            >
              Login
            </Link>

            {/* SIGN UP */}
            <Link
              to="/signup"
              className={`hidden sm:flex items-center justify-center w-[155px] h-[48px] rounded-[8px] border text-[16px] transition-all duration-300
                ${
                  location.pathname === "/signup"
                    ? "bg-[#8d32ff] text-white border-[#8d32ff]"
                    : "border-[#333] text-[#8d32ff] hover:bg-[#8d32ff] hover:text-white"
                }
              `}
            >
              Sign Up
            </Link>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-110px)]">

        {/* IMAGE */}
        <motion.div
          key={image}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block relative overflow-hidden"
        >
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* FORM */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="flex justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-14"
        >
          <div className="w-full max-w-[565px]">
            {children}
          </div>
        </motion.div>

      </main>
    </div>
  );
}