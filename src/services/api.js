import { API_ENDPOINTS, UI_CONFIG, MESSAGES, ENVIRONMENT } from '../constants';

/**
 * Generic API request handler with timeout and error handling
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - API response
 */
const apiRequest = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    UI_CONFIG.FORM_SUBMIT_TIMEOUT
  );

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error(MESSAGES.ERROR.FORM_TIMEOUT);
    }

    if (!navigator.onLine) {
      throw new Error(MESSAGES.ERROR.NETWORK_ERROR);
    }

    throw error;
  }
};

/**
 * Development mode form submission simulation
 * @param {Object} formData - Form data to simulate
 * @returns {Promise} - Simulated response
 */
const simulateFormSubmission = async (formData) => {
  // eslint-disable-next-line no-console
  console.log(
    'Development mode: Simulating form submission with data:',
    formData
  );

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate occasional failures for testing
  if (Math.random() < 0.1) {
    // 10% failure rate
    throw new Error('Simulated network error for testing');
  }

  return {
    success: true,
    message: MESSAGES.SUCCESS.FORM_SUBMITTED,
    recordId: `sim_${Date.now()}`,
  };
};

/**
 * Submit form data to the backend
 * @param {Object} formData - Form data to submit
 * @returns {Promise} - Submission response
 */
export const submitForm = async (formData) => {
  // Validate required fields before making request
  if (!formData.name?.trim() || !formData.email?.trim()) {
    throw new Error('Name and email are required');
  }

  // Use simulation in development when running on localhost:3000
  const isDevelopment =
    ENVIRONMENT.isDevelopment &&
    ENVIRONMENT.isLocalhost &&
    window.location.port === '3000';

  if (isDevelopment) {
    return simulateFormSubmission(formData);
  }

  try {
    const response = await apiRequest(API_ENDPOINTS.SUBMIT_FORM, {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone?.trim() || '',
        note: formData.note?.trim() || '',
      }),
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Form submission error:', error);

    // Re-throw with user-friendly message
    if (error.message.includes('timeout')) {
      throw new Error(MESSAGES.ERROR.FORM_TIMEOUT);
    }

    if (error.message.includes('network') || error.message.includes('fetch')) {
      throw new Error(MESSAGES.ERROR.NETWORK_ERROR);
    }

    throw new Error(MESSAGES.ERROR.SUBMISSION_FAILED);
  }
};

/**
 * Health check for the API endpoint
 * @returns {Promise} - Health check response
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.SUBMIT_FORM, {
      method: 'OPTIONS',
    });

    return response.ok;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('API health check failed:', error);
    return false;
  }
};
