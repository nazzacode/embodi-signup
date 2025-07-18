import React from 'react';
import useConfigurableForm from '../hooks/useConfigurableForm';
import ConfigurableSuccessScreen from './ConfigurableSuccessScreen';
import ConfigurableSignupForm from './forms/ConfigurableSignupForm';

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
    <div className="w-full max-w-sm">
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