import { FORM_VALIDATION, MESSAGES } from '../constants';

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: MESSAGES.ERROR.REQUIRED_FIELD };
  }

  if (!FORM_VALIDATION.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: MESSAGES.ERROR.INVALID_EMAIL };
  }

  if (email.length > FORM_VALIDATION.MAX_EMAIL_LENGTH) {
    return {
      isValid: false,
      error: `Email must be less than ${FORM_VALIDATION.MAX_EMAIL_LENGTH} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates a name field
 * @param {string} name - Name to validate
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, error: MESSAGES.ERROR.REQUIRED_FIELD };
  }

  if (name.trim().length < FORM_VALIDATION.MIN_NAME_LENGTH) {
    return {
      isValid: false,
      error: `Name must be at least ${FORM_VALIDATION.MIN_NAME_LENGTH} characters`,
    };
  }

  if (name.length > FORM_VALIDATION.MAX_NAME_LENGTH) {
    return {
      isValid: false,
      error: `Name must be less than ${FORM_VALIDATION.MAX_NAME_LENGTH} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validates a phone number (optional field)
 * @param {string} phone - Phone number to validate
 * @returns {Object} - { isValid: boolean, error: string|null }
 */
export const validatePhone = (phone) => {
  // Phone is optional, so empty is valid
  if (!phone || !phone.trim()) {
    return { isValid: true, error: null };
  }

  if (phone.length > FORM_VALIDATION.MAX_PHONE_LENGTH) {
    return {
      isValid: false,
      error: `Phone number must be less than ${FORM_VALIDATION.MAX_PHONE_LENGTH} characters`,
    };
  }

  // Basic phone validation - could be enhanced based on requirements
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true, error: null };
};



/**
 * Validates just the email field for initial submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateEmailOnly = (formData) => {
  const errors = {};
  let isValid = true;

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }

  return { isValid, errors };
};

/**
 * Validates the entire form
 * @param {Object} formData - Form data to validate
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export const validateForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Name is now optional in the new flow
  if (formData.name) {
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
    isValid = false;
  }

  // Validate phone (optional)
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error;
    isValid = false;
  }



  return { isValid, errors };
};
