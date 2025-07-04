import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = 'primary',
  className = '',
  'data-testid': dataTestId,
  ...props
}) => {
  const baseStyles = {
    width: '100%',
    padding: '1rem 2rem',
    fontFamily: "'Baugeld Spezialisten', monospace",
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
    opacity: disabled || loading ? 0.7 : 1,
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled || loading ? '#6B7280' : '#111827',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#6B7280',
      border: '1px solid #D1D5DB',
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading && variant === 'primary') {
      e.target.style.backgroundColor = '#1F2937';
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && !loading && variant === 'primary') {
      e.target.style.backgroundColor = '#111827';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      data-testid={dataTestId}
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`w-full bg-gray-900 text-white py-4 px-8 font-mono text-xs uppercase tracking-widest hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 border-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 