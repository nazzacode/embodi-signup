import React, { useEffect, useState } from 'react';

const ConfigurableSuccessScreen = ({ onSubmitAnother }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          onSubmitAnother();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [onSubmitAnother]);

  return (
    <div className="w-full max-w-sm">
      <div className="bg-black/30 backdrop-blur-sm rounded shadow-2xl border border-white/30 p-8 text-center">
        {/* Success Icon - Monochrome SVG Checkmark */}
        <div className="mb-4 flex justify-center">
          <svg 
            className="w-16 h-16 text-white opacity-80" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Thank You Message */}
        <h2 className="text-2xl font-medium text-gray-350 mb-4">
          Thank you for signing up!
        </h2>

        {/* Success Description */}
        <p className="text-sm text-gray-300 mb-6">
          We'll be in touch soon with updates on our spatial computing platform.
        </p>

        {/* Auto-redirect message with countdown */}
        <p className="text-xs text-gray-350">
          Returning to signup form in <span className="text-gray-300 font-medium">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};

export default ConfigurableSuccessScreen; 