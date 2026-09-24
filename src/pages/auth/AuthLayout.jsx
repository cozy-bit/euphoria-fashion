import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({
  bannerImage,
  title,
  subtitle,
  children
}) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column: Full Original Studio Banner */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#F6F6F6] overflow-hidden">
        <img
          src={bannerImage}
          alt="Euphoria Fashion"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <Link
          to="/"
          className="absolute top-8 left-8 z-10 font-black text-2xl tracking-tighter text-white drop-shadow-md"
        >
          Euphoria<span className="text-[#8A33FD]">.</span>
        </Link>
      </div>

      {/* Right Column: Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Link to="/" className="font-black text-3xl tracking-tighter text-[#3C4242]">
              Euphoria<span className="text-[#8A33FD]">.</span>
            </Link>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#3C4242] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#807D7E] font-medium mt-2">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Content */}
          {children}

        </div>
      </div>
    </div>
  );
}
