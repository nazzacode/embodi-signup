import React from 'react';
import Button from './ui/Button';
import { MESSAGES } from '../constants';

const SuccessScreen = ({ onSubmitAnother }) => {
  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 text-center"
        style={{
          width: '100%',
          maxWidth: '28rem',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
          }}
        >
          ✅
        </div>

        {/* Thank You Message */}
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '2rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem',
          }}
        >
          {MESSAGES.SUCCESS.THANK_YOU}
        </h2>

        {/* Success Description */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1.125rem',
            color: '#4B5563',
            marginBottom: '2rem',
          }}
        >
          {MESSAGES.SUCCESS.FORM_SUBMITTED}
        </p>

        {/* Submit Another Button */}
        <Button
          onClick={onSubmitAnother}
          variant="secondary"
          data-testid="submit-another-button"
          style={{
            backgroundColor: 'transparent',
            color: '#6B7280',
            border: '1px solid #D1D5DB',
          }}
        >
          Submit Another
        </Button>
      </div>
    </div>
  );
};

export default SuccessScreen; 