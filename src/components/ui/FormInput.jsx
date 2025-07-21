import React from 'react';

const FormInput = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  'data-testid': dataTestId,
}) => {
  // For email inputs, show email icon
  const isEmailType = type === 'email';
  
  if (type === 'textarea') {
    return (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        data-testid={dataTestId}
        className="w-full px-4 py-3 border border-white/40 bg-white/15 backdrop-blur-sm rounded focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 hover:bg-white/20 hover:border-white/50 text-lg placeholder-gray-300 text-white transition-all duration-300 outline-none shadow-lg resize-none"
      />
    );
  }

  if (isEmailType) {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={dataTestId}
          className="w-full pl-10 pr-4 py-3 border border-white/40 bg-white/15 backdrop-blur-sm rounded focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 hover:bg-white/20 hover:border-white/50 text-lg placeholder-gray-300 text-white transition-all duration-300 outline-none shadow-lg"
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      data-testid={dataTestId}
      className="w-full px-4 py-3 border border-white/40 bg-white/15 backdrop-blur-sm rounded focus:ring-2 focus:ring-white/60 focus:border-white/60 focus:bg-white/25 hover:bg-white/20 hover:border-white/50 text-lg placeholder-gray-300 text-white transition-all duration-300 outline-none shadow-lg"
    />
  );
};

export default FormInput; 