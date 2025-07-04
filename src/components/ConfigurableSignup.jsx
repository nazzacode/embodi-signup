import React from 'react';
import useConfigurableForm from '../hooks/useConfigurableForm';
import ConfigurableSuccessScreen from './ConfigurableSuccessScreen';
import ConfigurableSignupForm from './forms/ConfigurableSignupForm';
import { formConfig } from '../config/form-config';

const ConfigurableSignup = () => {
  const {
    formData,
    submissionState,
    validationErrors,
    formStage,
    handleInputChange,
    handleSubmit,
    handleSuccessReset,
  } = useConfigurableForm();

  // Show success screen after successful submission
  if (submissionState.isSuccess) {
    return <ConfigurableSuccessScreen onSubmitAnother={handleSuccessReset} />;
  }

  // Show main form
  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      style={{
        minHeight: '100vh',
        backgroundColor: formConfig.ui.colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <ConfigurableSignupForm
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={submissionState.isSubmitting}
        error={submissionState.error}
        validationErrors={validationErrors}
        formStage={formStage}
      />
    </div>
  );
};

export default ConfigurableSignup; 