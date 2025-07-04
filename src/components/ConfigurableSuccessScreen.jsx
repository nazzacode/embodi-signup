import React from 'react';
import Button from './ui/Button';
import { formConfig } from '../config/form-config';

const ConfigurableSuccessScreen = ({ onSubmitAnother }) => {
  const { content, ui } = formConfig;

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{
        minHeight: '100vh',
        backgroundColor: ui.colors.background,
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
          maxWidth: ui.container.maxWidth,
          margin: '0 auto',
          backgroundColor: ui.container.backgroundColor,
          borderRadius: ui.container.borderRadius,
          boxShadow: ui.container.shadow,
          border: ui.container.border,
          padding: ui.container.padding,
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
            fontFamily: ui.typography.fontFamily,
            fontSize: '2rem',
            fontWeight: ui.typography.headingWeight,
            color: ui.colors.primary,
            marginBottom: '1rem',
          }}
        >
          {content.messages.success.heading}
        </h2>

        {/* Success Description */}
        <p
          style={{
            fontFamily: ui.typography.fontFamily,
            fontSize: ui.typography.bodySize,
            color: ui.colors.secondary,
            marginBottom: '2rem',
          }}
        >
          {content.messages.success.description}
        </p>

        {/* Submit Another Button */}
        <Button
          onClick={onSubmitAnother}
          variant="secondary"
          data-testid="submit-another-button"
          style={{
            backgroundColor: 'transparent',
            color: ui.colors.muted,
            border: `1px solid ${ui.colors.border}`,
          }}
        >
          {content.buttons.submitAnother}
        </Button>
      </div>
    </div>
  );
};

export default ConfigurableSuccessScreen; 