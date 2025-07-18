/**
 * Embodi Computing Signup Form Configuration
 * Single source of truth for all form content, structure, and behavior
 */

// Form field types
export const FIELD_TYPES = {
  EMAIL: 'email',
  TEXT: 'text',
  TEL: 'tel',
  TEXTAREA: 'textarea',
};

// Form stages
export const FORM_STAGES = {
  INITIAL: 'initial',
  EXPANDED: 'expanded',
  SUCCESS: 'success',
};

// Main form configuration
export const formConfig = {
  // Brand and content
  content: {
    branding: {
      logo: 'Embodi Computing',
      mainHeading: 'So you want a spatial computer?',
      subtitle: "We've got the missing piece.",
    },
    
    buttons: {
      submit: 'Submit',
      submitAnother: 'Submit Another',
    },
    
    messages: {
      submitSubtext: '~1 update/month, never spam.',
      loading: 'Submitting...',
      success: {
        heading: 'Thank you!',
        description: 'Thank you! Your submission has been received successfully.',
      },
      errors: {
        networkError: 'Network error. Please check your connection and try again.',
        submissionFailed: 'Submission failed. Please try again.',
        formTimeout: 'Request timed out. Please try again.',
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
      },
    },
  },

  // Form stages configuration
  stages: [
    {
      id: FORM_STAGES.INITIAL,
      title: 'Email Collection',
      description: 'Initial email capture stage',
      showSubtext: true,
      fields: [
        {
          name: 'email',
          type: FIELD_TYPES.EMAIL,
          placeholder: 'Email',
          required: true,
          disabled: false,
          validation: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessage: 'Please enter a valid email address',
          },
        },
      ],
      submitText: 'Submit',
      validationMode: 'emailOnly', // Special validation for this stage
    },
    
    {
      id: FORM_STAGES.EXPANDED,
      title: 'Additional Details',
      description: 'Optional additional information collection',
      showSubtext: false,
      thankYouMessage: 'Thank you!',
      explanationMessage: "We'd like to address you by name and get you updates 48hrs in advance.",
      fields: [
        {
          name: 'name',
          type: FIELD_TYPES.TEXT,
          placeholder: 'Name (optional)',
          required: false,
          disabled: false,
          validation: {
            required: false,
            minLength: 2,
            maxLength: 100,
            errorMessage: 'Name must be between 2 and 100 characters',
          },
        },
        {
          name: 'phone',
          type: FIELD_TYPES.TEL,
          placeholder: 'Phone (optional)',
          required: false,
          disabled: false,
          validation: {
            required: false,
            maxLength: 20,
            errorMessage: 'Phone number is too long',
          },
        },
      ],
      submitText: 'Update',
      validationMode: 'full', // Full validation for this stage
    },
  ],

  // API configuration
  api: {
    endpoint: process.env.REACT_APP_FORM_ENDPOINT || '/.netlify/functions/submit-form',
    timeout: 30000,
    retries: 1,
  },

  // UI configuration
  ui: {
    container: {
      maxWidth: '28rem',
      padding: '3rem 2rem',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb',
    },
    
    spacing: {
      fieldGap: '1.5rem',
      sectionGap: '2rem',
      headerMargin: '3rem',
      submitPadding: '2rem',
    },
    
    typography: {
      fontFamily: "'Inter', system-ui, sans-serif",
      headingSize: '2.25rem',
      headingWeight: '600',
      bodySize: '1.125rem',
      smallSize: '0.875rem',
    },
    
    colors: {
      primary: '#111827',
      secondary: '#4B5563',
      muted: '#6B7280',
      error: '#DC2626',
      border: '#e5e7eb',
      background: '#f9fafb',
    },
  },

  // Validation configuration
  validation: {
    rules: {
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        maxLength: 254,
      },
      name: {
        minLength: 2,
        maxLength: 100,
      },
      phone: {
        maxLength: 20,
      },

    },
  },

  // Feature flags
  features: {
    enableDebug: process.env.REACT_APP_ENABLE_DEBUG === 'true',
    enableAnimations: process.env.REACT_APP_ENABLE_ANIMATIONS !== 'false',
    enableAnalytics: Boolean(process.env.REACT_APP_GA_TRACKING_ID),
    progressiveDisclosure: true,
  },
};

// Helper functions to get configuration
export const getStageConfig = (stageId) => {
  return formConfig.stages.find(stage => stage.id === stageId);
};

export const getFieldConfig = (stageId, fieldName) => {
  const stage = getStageConfig(stageId);
  return stage?.fields.find(field => field.name === fieldName);
};

export const getValidationRules = (fieldName) => {
  return formConfig.validation.rules[fieldName] || {};
};

export const getContent = (path) => {
  const keys = path.split('.');
  let content = formConfig.content;
  
  for (const key of keys) {
    content = content?.[key];
    if (content === undefined) break;
  }
  
  return content;
};

// Export individual sections for convenience
export const { content, stages, api, ui, validation, features } = formConfig;

export default formConfig; 