import React from 'react';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import { formConfig, getStageConfig, FORM_STAGES } from '../../config/form-config';

const ConfigurableSignupForm = ({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  validationErrors = {},
  formStage = FORM_STAGES.INITIAL,
}) => {
  // Get current stage configuration
  const stageConfig = getStageConfig(formStage);
  
  if (!stageConfig) {
    // eslint-disable-next-line no-console
    console.error(`Unknown form stage: ${formStage}`);
    return null;
  }

  const { content, ui } = formConfig;

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded shadow-2xl border border-white/30 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        {/* VR Man Image */}
        <div className="mb-1">
          <img 
            src="/assets/vr_man2.png" 
            alt="VR User" 
            className="w-32 h-32 mx-auto opacity-80 invert drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" 
          />
        </div>
        
        {/* Dynamic content based on form stage */}
        {formStage === FORM_STAGES.INITIAL ? (
          <>
            {/* Main Heading */}
            <h2 className="text-2xl font-medium text-white mb-6">
              So you want a spatial computer? <em>We've got the missing piece.</em>
            </h2>
            
            {/* Call to Action */}
            <p className="text-sm text-gray-300">
              We're building the first spatial desktop. Join our mailing list for more.
            </p>
          </>
        ) : (
          <>
            {/* Thank You Message */}
            <h2 className="text-2xl font-medium text-gray-350 mb-6">
              {stageConfig.thankYouMessage}
            </h2>
            
            {/* Explanation Message */}
            <p className="text-sm text-gray-300">
              {stageConfig.explanationMessage}
            </p>
          </>
        )}
      </div>

      {/* Error Message */}
      <ErrorMessage message={error} />

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Dynamic Fields */}
        <div className="space-y-4">
          {stageConfig.fields.map((fieldConfig) => (
            <div key={fieldConfig.name}>
              <FormInput
                type={fieldConfig.type}
                name={fieldConfig.name}
                value={formData[fieldConfig.name] || ''}
                onChange={onChange}
                placeholder={fieldConfig.placeholder}
                required={fieldConfig.required}
                disabled={isSubmitting || fieldConfig.disabled}
                rows={fieldConfig.type === 'textarea' ? 4 : undefined}
                data-testid={`${fieldConfig.name}-input`}
              />
              
              
              {/* Validation errors */}
              {validationErrors[fieldConfig.name] && (
                <div 
                  style={{ 
                    color: ui.colors.error, 
                    fontSize: ui.typography.smallSize, 
                    marginTop: '0.25rem' 
                  }}
                >
                  {validationErrors[fieldConfig.name]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            data-testid="submit-button"
          >
            {isSubmitting ? content.messages.loading : stageConfig.submitText}
          </Button>
          
          {/* Only show subtext and terms on initial stage */}
          {formStage === FORM_STAGES.INITIAL && (
            <>
              {/* Subtext */}
              <div className="text-center mt-2">
                <p className="text-xs text-gray-350">1 update per month, never spam.</p>
              </div>
              
              {/* Terms Disclaimer */}
              <div className="text-center mt-3">
                <p className="text-xs text-gray-350">
                  By submitting, you agree to our{' '}
                  <button className="text-gray-300 hover:text-white transition-colors underline">
                    Terms of Service
                  </button>{' '}
                  including non-disclosure obligations.
                </p>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConfigurableSignupForm; 