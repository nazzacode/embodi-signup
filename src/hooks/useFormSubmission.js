import { useState } from 'react';
import { submitForm } from '../services/api';
import { validateForm } from '../utils/validation';
import { FORM_FIELDS } from '../constants';

const useFormSubmission = (initialFormData = {}) => {
  const [formData, setFormData] = useState({
    [FORM_FIELDS.NAME]: '',
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PHONE]: '',
    [FORM_FIELDS.NOTE]: '',
    ...initialFormData,
  });

  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
    
    // Clear general error when user starts typing
    if (submissionState.error) {
      setSubmissionState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const validateFormData = () => {
    const validation = validateForm(formData);
    setValidationErrors(validation.errors);
    return validation.isValid;
  };

  const resetForm = () => {
    setFormData({
      [FORM_FIELDS.NAME]: '',
      [FORM_FIELDS.EMAIL]: '',
      [FORM_FIELDS.PHONE]: '',
      [FORM_FIELDS.NOTE]: '',
    });
    setValidationErrors({});
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form before submission
    if (!validateFormData()) {
      return;
    }

    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      await submitForm(formData);
      
      setSubmissionState({
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });
      
      // Reset form data after successful submission
      setFormData({
        [FORM_FIELDS.NAME]: '',
        [FORM_FIELDS.EMAIL]: '',
        [FORM_FIELDS.PHONE]: '',
        [FORM_FIELDS.NOTE]: '',
      });
      setValidationErrors({});
      
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: error.message,
      });
    }
  };

  const handleSuccessReset = () => {
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
  };

  return {
    formData,
    submissionState,
    validationErrors,
    handleInputChange,
    handleSubmit,
    handleSuccessReset,
    resetForm,
    validateFormData,
    updateField,
  };
};

export default useFormSubmission; 