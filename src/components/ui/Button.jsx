import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  children,
  className = '',
  'data-testid': dataTestId,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      data-testid={dataTestId}
      className={`w-full bg-white text-black py-3 px-6 rounded font-medium text-lg hover:bg-gray-50 hover:shadow-xl hover:scale-[1.01] focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent active:scale-[0.99] transition-all duration-200 flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
    </button>
  );
};

export default Button; 