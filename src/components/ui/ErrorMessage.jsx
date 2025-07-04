import React from 'react';

const ErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-md p-3 mb-6 text-red-800 text-sm ${className}`}
      style={{
        backgroundColor: '#FEE2E2',
        border: '1px solid #FECACA',
        borderRadius: '0.375rem',
        padding: '0.75rem',
        marginBottom: '1.5rem',
        color: '#991B1B',
        fontSize: '0.875rem',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default ErrorMessage; 