import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg'
  to,
  href,
  className = '',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-[#8A33FD] text-white hover:bg-[#6610F2] shadow-sm hover:shadow-md hover:shadow-[#8A33FD]/20',
    secondary: 'bg-[#F4ECFF] text-[#8A33FD] hover:bg-[#ebdcfc]',
    outline: 'border-2 border-[#3C4242] text-[#3C4242] hover:bg-[#3C4242] hover:text-white',
    outlinePurple: 'border-2 border-[#8A33FD] text-[#8A33FD] hover:bg-[#8A33FD] hover:text-white',
    dark: 'bg-[#3C4242] text-white hover:bg-[#1A1A1A]',
    ghost: 'bg-transparent text-[#3C4242] hover:bg-[#F6F6F6]'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5'
  };

  const computedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (to) {
    return (
      <Link to={to} className={computedClasses} {...props}>
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={computedClasses} {...props}>
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
      </a>
    );
  }

  return (
    <button className={computedClasses} disabled={disabled} {...props}>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
