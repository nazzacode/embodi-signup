import { useState } from 'react';
import { submitForm } from '../services/api';
import { formConfig, getStageConfig, FORM_STAGES } from '../config/form-config';

/**
 * Custom hook for managing configurable form state and validation
 */
const useConfigurableForm = (initialFormData = {}) => {
  // Initialize form data with all possible fields
  const allFields = formConfig.stages.flatMap(stage => stage.fields);
  const initialData = allFields.reduce((data, field) => {
    data[field.name] = initialFormData[field.name] || '';
    return data;
  }, {});

  const [formData, setFormData] = useState(initialData);
  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [formStage, setFormStage] = useState(FORM_STAGES.INITIAL);
  const [recordId, setRecordId] = useState(null); // Store record ID for updates

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

  /**
   * Validate a single field based on its configuration
   */
  const validateField = (fieldConfig, value) => {
    const { validation } = fieldConfig;
    const errors = [];

    // Required check
    if (validation.required && (!value || !value.trim())) {
      errors.push(formConfig.content.messages.errors.required);
    }

    // Skip other validations if field is empty and not required
    if (!value || !value.trim()) {
      return errors;
    }

    // Pattern validation (e.g., email)
    if (validation.pattern && !validation.pattern.test(value)) {
      errors.push(validation.errorMessage || formConfig.content.messages.errors.invalidEmail);
    }

    // Length validations
    if (validation.minLength && value.length < validation.minLength) {
      errors.push(validation.errorMessage || `Must be at least ${validation.minLength} characters`);
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      errors.push(validation.errorMessage || `Must be no more than ${validation.maxLength} characters`);
    }

    return errors;
  };

  /**
   * Validate the current form stage
   */
  const validateCurrentStage = () => {
    const stageConfig = getStageConfig(formStage);
    if (!stageConfig) return { isValid: false, errors: {} };

    const errors = {};
    let isValid = true;

    // Validate only fields that are visible in the current stage
    stageConfig.fields.forEach((fieldConfig) => {
      const fieldErrors = validateField(fieldConfig, formData[fieldConfig.name]);
      if (fieldErrors.length > 0) {
        errors[fieldConfig.name] = fieldErrors[0]; // Show first error
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return { isValid, errors };
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate current stage
    const validation = validateCurrentStage();
    if (!validation.isValid) {
      return;
    }

    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      // Pass recordId for updates (will be null for initial submission)
      const response = await submitForm(formData, recordId);
      
      if (formStage === FORM_STAGES.INITIAL) {
        // First submission (email only) - record created, expand the form
        setRecordId(response.recordId); // Store the record ID for updates
        setSubmissionState({
          isSubmitting: false,
          isSuccess: false,
          error: null,
        });
        setFormStage(FORM_STAGES.EXPANDED);
      } else {
        // Second submission - record updated, show success
        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });
        
        // Reset form data after successful submission
        setFormData(initialData);
        setValidationErrors({});
        setFormStage(FORM_STAGES.INITIAL);
        setRecordId(null); // Clear record ID
      }
      
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: error.message,
      });
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData(initialData);
    setValidationErrors({});
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
    setFormStage(FORM_STAGES.INITIAL);
    setRecordId(null); // Clear record ID
  };

  /**
   * Handle success screen reset
   */
  const handleSuccessReset = () => {
    setSubmissionState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    });
    setFormStage(FORM_STAGES.INITIAL);
    setRecordId(null); // Clear record ID
  };

  /**
   * Get current stage configuration
   */
  const getCurrentStageConfig = () => {
    return getStageConfig(formStage);
  };

  /**
   * Check if a field should be visible in current stage
   */
  const isFieldVisible = (fieldName) => {
    const stageConfig = getCurrentStageConfig();
    return stageConfig?.fields.some(field => field.name === fieldName) || false;
  };

  /**
   * Get field configuration for current stage
   */
  const getFieldConfig = (fieldName) => {
    const stageConfig = getCurrentStageConfig();
    return stageConfig?.fields.find(field => field.name === fieldName);
  };

  return {
    // State
    formData,
    submissionState,
    validationErrors,
    formStage,
    recordId, // For debugging and potential future use
    
    // Actions
    handleInputChange,
    handleSubmit,
    handleSuccessReset,
    resetForm,
    updateField,
    
    // Utilities
    validateCurrentStage,
    getCurrentStageConfig,
    isFieldVisible,
    getFieldConfig,
    
    // Configuration access
    config: formConfig,
  };
};

export default useConfigurableForm; 