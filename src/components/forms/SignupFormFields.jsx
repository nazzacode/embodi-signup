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
          Embodi Computing
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
          Join our mailing list
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
          {/* Name Field */}
          <div>
            <FormInput
              type="text"
              name={FORM_FIELDS.NAME}
              value={formData[FORM_FIELDS.NAME]}
              onChange={onChange}
              placeholder="NAME *"
              required
              disabled={isSubmitting}
              data-testid="name-input"
            />
            {validationErrors[FORM_FIELDS.NAME] && (
              <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {validationErrors[FORM_FIELDS.NAME]}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <FormInput
              type="email"
              name={FORM_FIELDS.EMAIL}
              value={formData[FORM_FIELDS.EMAIL]}
              onChange={onChange}
              placeholder="EMAIL *"
              required
              disabled={isSubmitting}
              data-testid="email-input"
            />
            {validationErrors[FORM_FIELDS.EMAIL] && (
              <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {validationErrors[FORM_FIELDS.EMAIL]}
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
              placeholder="PHONE"
              disabled={isSubmitting}
              data-testid="phone-input"
            />
            {validationErrors[FORM_FIELDS.PHONE] && (
              <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {validationErrors[FORM_FIELDS.PHONE]}
              </div>
            )}
          </div>

          {/* Note Field */}
          <div>
            <FormInput
              type="textarea"
              name={FORM_FIELDS.NOTE}
              value={formData[FORM_FIELDS.NOTE]}
              onChange={onChange}
              placeholder="NOTE"
              rows={4}
              disabled={isSubmitting}
              data-testid="note-input"
            />
            {validationErrors[FORM_FIELDS.NOTE] && (
              <div style={{ color: '#DC2626', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {validationErrors[FORM_FIELDS.NOTE]}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-8" style={{ paddingTop: '2rem' }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            data-testid="submit-button"
          >
            {isSubmitting ? MESSAGES.LOADING.SUBMITTING : 'SUBMIT'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupFormFields; 