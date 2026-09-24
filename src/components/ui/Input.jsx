import React from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  icon: Icon,
  className = '',
  id,
  required = false,
  ...props
}) {
  const inputId = id || `input-${label ? label.toLowerCase().replace(/\s+/g, '-') : Math.random()}`;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#3C4242] flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#807D7E] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full text-sm font-medium text-[#3C4242] bg-[#F6F6F6] border rounded-lg transition-all duration-200 outline-none placeholder:text-[#807D7E] focus:bg-white focus:border-[#8A33FD] focus:ring-2 focus:ring-[#8A33FD]/15 ${
            Icon ? 'pl-10 pr-4' : 'px-4'
          } py-3 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/15' : 'border-[#BEBCBD]'}`}
          {...props}
        />
      </div>

      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[#807D7E]">{helperText}</span>
      ) : null}
    </div>
  );
}
