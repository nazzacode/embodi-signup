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
  const baseStyles = {
    width: '100%',
    padding: '1rem 0',
    border: 'none',
    borderBottom: '2px solid #E5E7EB',
    backgroundColor: 'transparent',
    outline: 'none',
    color: '#111827',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '1rem',
    transition: 'border-color 0.2s',
    opacity: disabled ? 0.5 : 1,
  };

  const textareaStyles = {
    ...baseStyles,
    resize: 'none',
  };

  const handleFocus = (e) => {
    e.target.style.borderBottomColor = '#111827';
  };

  const handleBlur = (e) => {
    e.target.style.borderBottomColor = '#E5E7EB';
  };

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
        style={textareaStyles}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 resize-none transition-colors duration-200"
      />
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
      style={baseStyles}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 transition-colors duration-200"
    />
  );
};

export default FormInput; 