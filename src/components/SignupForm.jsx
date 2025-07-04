import React from 'react';
import useFormSubmission from '../hooks/useFormSubmission';
import SuccessScreen from './SuccessScreen';
import SignupFormFields from './forms/SignupFormFields';

const SignupForm = () => {
  const {
    formData,
    submissionState,
    validationErrors,
    formStage,
    handleInputChange,
    handleSubmit,
    handleSuccessReset,
  } = useFormSubmission();

  // Show success screen after successful submission
  if (submissionState.isSuccess) {
    return <SuccessScreen onSubmitAnother={handleSuccessReset} />;
  }

  // Show main form
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
      <SignupFormFields
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

export default SignupForm;
