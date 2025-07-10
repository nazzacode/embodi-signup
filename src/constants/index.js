// API Configuration
export const API_ENDPOINTS = {
  SUBMIT_FORM:
    process.env.REACT_APP_FORM_ENDPOINT || '/.netlify/functions/submit-form',
};

// Form Configuration
export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
};

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_PHONE_LENGTH: 20,
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  FORM_SUBMIT_TIMEOUT: 30000, // 30 seconds
};

// Messages
export const MESSAGES = {
  SUCCESS: {
    FORM_SUBMITTED: 'Thank you! Your submission has been received successfully.',
    THANK_YOU: 'Thank you!',
  },
  ERROR: {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SUBMISSION_FAILED: 'Submission failed. Please try again.',
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    FORM_TIMEOUT: 'Request timed out. Please try again.',
  },
  LOADING: {
    SUBMITTING: 'Submitting...',
    PLEASE_WAIT: 'Please wait...',
  },
  CONTENT: {
    LOGO: 'Embodi Computing',
    MAIN_HEADING: 'So you want a spatial computer?',
    SUBTITLE: "We've got the missing piece.",
    SUBMIT_BUTTON: 'Submit',
    SUBMIT_SUBTEXT: '~1 update/month, never spam',
    NAME_EXPLAINER: 'To address you by name.',
    PHONE_EXPLAINER: 'Get updates 48hrs in advance.',
  },
};

// Environment Detection
export const ENVIRONMENT = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isLocalhost:
    typeof window !== 'undefined' && window.location.hostname === 'localhost',
};

// Feature Flags
export const FEATURES = {
  ENABLE_DEBUG: process.env.REACT_APP_ENABLE_DEBUG === 'true',
  ENABLE_ANIMATIONS: process.env.REACT_APP_ENABLE_ANIMATIONS !== 'false',
  ENABLE_ANALYTICS: Boolean(process.env.REACT_APP_GA_TRACKING_ID),
};
