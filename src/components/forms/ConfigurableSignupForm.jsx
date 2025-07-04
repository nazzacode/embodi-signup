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
    <div
      className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200"
      style={{
        width: '100%',
        maxWidth: ui.container.maxWidth,
        margin: '0 auto',
        backgroundColor: ui.container.backgroundColor,
        borderRadius: ui.container.borderRadius,
        boxShadow: ui.container.shadow,
        border: ui.container.border,
        padding: ui.container.padding,
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-12"
        style={{ 
          textAlign: 'center', 
          marginBottom: ui.spacing.headerMargin 
        }}
      >
        {/* Logo */}
        <div
          className="font-sans text-lg text-gray-600 mb-3"
          style={{
            fontFamily: ui.typography.fontFamily,
            fontSize: ui.typography.bodySize,
            color: ui.colors.secondary,
            marginBottom: '0.75rem',
            fontWeight: '400',
          }}
        >
          {content.branding.logo}
        </div>

        {/* Main Heading */}
        <h1
          className="font-sans text-4xl font-semibold text-gray-900 mb-3 tracking-tight"
          style={{
            fontFamily: ui.typography.fontFamily,
            fontSize: ui.typography.headingSize,
            fontWeight: ui.typography.headingWeight,
            color: ui.colors.primary,
            marginBottom: '0.75rem',
            letterSpacing: '-0.025em',
          }}
        >
          {content.branding.mainHeading}
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-lg text-gray-600 leading-relaxed"
          style={{
            fontFamily: ui.typography.fontFamily,
            fontSize: ui.typography.bodySize,
            color: ui.colors.secondary,
            lineHeight: '1.625',
            fontWeight: '400',
          }}
        >
          {content.branding.subtitle}
        </p>
      </div>

      {/* Error Message */}
      <ErrorMessage message={error} />

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-8"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: ui.spacing.sectionGap 
        }}
      >
        {/* Dynamic Fields */}
        <div
          className="space-y-6"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: ui.spacing.fieldGap 
          }}
        >
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
              
              {/* Field explainer text */}
              {fieldConfig.explainer && (
                <div 
                  style={{ 
                    color: ui.colors.muted, 
                    fontSize: ui.typography.smallSize, 
                    marginTop: '0.25rem' 
                  }}
                >
                  {fieldConfig.explainer}
                </div>
              )}
              
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
        <div 
          className="pt-8" 
          style={{ paddingTop: ui.spacing.submitPadding }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            data-testid="submit-button"
          >
            {isSubmitting ? content.messages.loading : stageConfig.submitText}
          </Button>
          
          {/* Subtext - only shown when configured for this stage */}
          {stageConfig.showSubtext && (
            <p
              className="text-center text-sm text-gray-500 mt-3"
              style={{
                textAlign: 'center',
                fontSize: ui.typography.smallSize,
                color: ui.colors.muted,
                marginTop: '0.75rem',
                fontFamily: ui.typography.fontFamily,
              }}
            >
              {content.messages.submitSubtext}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ConfigurableSignupForm; 