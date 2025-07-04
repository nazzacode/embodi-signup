import React from 'react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { FORM_FIELDS, MESSAGES } from '../../constants';

const SignupFormFields = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  validationErrors = {},
  formStage = 'initial',
}) => {
  return (
    <div
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200"
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
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-12"
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div
          className="font-sans text-lg text-gray-600 mb-3"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1.125rem',
            color: '#4B5563',
            marginBottom: '0.75rem',
            fontWeight: '400',
          }}
        >
          {MESSAGES.CONTENT.LOGO}
        </div>
        <h1
          className="font-sans text-4xl font-semibold text-gray-900 mb-3 tracking-tight"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '2.25rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em',
          }}
        >
          {MESSAGES.CONTENT.MAIN_HEADING}
        </h1>
        <p
          className="font-sans text-lg text-gray-600 leading-relaxed"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1.125rem',
            color: '#4B5563',
            lineHeight: '1.625',
            fontWeight: '400',
          }}
        >
          {MESSAGES.CONTENT.SUBTITLE}
        </p>
      </div>

      {/* Error Message */}
      <ErrorMessage message={error} />

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-8"
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <div
          className="space-y-6"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Email Field - always shown */}
          <div>
            <FormInput
              type="email"
              name={FORM_FIELDS.EMAIL}
              value={formData[FORM_FIELDS.EMAIL]}
              onChange={onChange}
              placeholder="Email"
              required
              disabled={isSubmitting || formStage === 'expanded'}
              data-testid="email-input"
            />
            {validationErrors[FORM_FIELDS.EMAIL] && (
              <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {validationErrors[FORM_FIELDS.EMAIL]}
              </div>
            )}
          </div>

          {/* Additional fields - only shown in expanded stage */}
          {formStage === 'expanded' && (
            <>
              {/* Name Field */}
              <div>
                <FormInput
                  type="text"
                  name={FORM_FIELDS.NAME}
                  value={formData[FORM_FIELDS.NAME]}
                  onChange={onChange}
                  placeholder="Name (optional)"
                  disabled={isSubmitting}
                  data-testid="name-input"
                />
                <div style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {MESSAGES.CONTENT.NAME_EXPLAINER}
                </div>
                {validationErrors[FORM_FIELDS.NAME] && (
                  <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {validationErrors[FORM_FIELDS.NAME]}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <FormInput
                  type="tel"
                  name={FORM_FIELDS.PHONE}
                  value={formData[FORM_FIELDS.PHONE]}
                  onChange={onChange}
                  placeholder="Phone (optional)"
                  disabled={isSubmitting}
                  data-testid="phone-input"
                />
                <div style={{ color: '#6B7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {MESSAGES.CONTENT.PHONE_EXPLAINER}
                </div>
                {validationErrors[FORM_FIELDS.PHONE] && (
                  <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    {validationErrors[FORM_FIELDS.PHONE]}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-8" style={{ paddingTop: '2rem' }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            data-testid="submit-button"
          >
            {isSubmitting ? MESSAGES.LOADING.SUBMITTING : MESSAGES.CONTENT.SUBMIT_BUTTON}
          </Button>
          
          {/* Subtext - only shown in initial stage */}
          {formStage === 'initial' && (
            <p
              className="text-center text-sm text-gray-500 mt-3"
              style={{
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#6B7280',
                marginTop: '0.75rem',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {MESSAGES.CONTENT.SUBMIT_SUBTEXT}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupFormFields; 