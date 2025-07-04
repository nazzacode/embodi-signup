import React, { useState } from 'react';

const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  });

  const [submissionState, setSubmissionState] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    setSubmissionState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
    });

    try {
      // Determine the endpoint - use localhost for development
      const isDevelopment =
        process.env.NODE_ENV === 'development' &&
        window.location.hostname === 'localhost';
      let endpoint =
        process.env.REACT_APP_FORM_ENDPOINT ||
        '/.netlify/functions/submit-form';

      // For development, simulate success since netlify dev isn't working
      if (isDevelopment && window.location.port === '3000') {
        console.log('Development mode: Simulating form submission with data:', {
          name: form.name,
          email: form.email,
          phone: form.phone,
          note: form.note,
        });

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });

        // Reset form after successful submission
        setForm({
          name: '',
          email: '',
          phone: '',
          note: '',
        });
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          note: form.note,
        }),
      });

      if (response.ok) {
        setSubmissionState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
        });

        // Reset form after successful submission
        setForm({
          name: '',
          email: '',
          phone: '',
          note: '',
        });
      } else {
        // const errorData = await response.json();
        setSubmissionState({
          isSubmitting: false,
          isSuccess: false,
          error: 'Submission failed. Please try again.',
        });
      }
    } catch (error) {
      setSubmissionState({
        isSubmitting: false,
        isSuccess: false,
        error: 'An error occurred. Please try again.',
      });
    }
  };

  // Show success message
  if (submissionState.isSuccess) {
    return (
      <div
        className='min-h-screen bg-gray-50 flex items-center justify-center px-4'
        style={{
          minHeight: '100vh',
          backgroundColor: '#f9fafb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <div
          className='w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 text-center'
          style={{
            width: '100%',
            maxWidth: '28rem',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '2rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '1rem',
            }}
          >
            Thank you!
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.125rem',
              color: '#4B5563',
              marginBottom: '2rem',
            }}
          >
            Your submission has been received successfully.
          </p>
          <button
            onClick={() =>
              setSubmissionState({
                isSubmitting: false,
                isSuccess: false,
                error: null,
              })
            }
            style={{
              backgroundColor: '#111827',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontFamily: "'Baugeld Spezialisten', monospace",
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen bg-gray-50 flex items-center justify-center px-4'
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className='w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200'
        style={{
          width: '100%',
          maxWidth: '28rem',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '3rem 2rem',
        }}
      >
        <div
          className='text-center mb-12'
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1
            className='font-sans text-4xl font-semibold text-gray-900 mb-3 tracking-tight'
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '2.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.75rem',
              letterSpacing: '-0.025em',
            }}
          >
            Embodi Computing
          </h1>
          <p
            className='font-sans text-lg text-gray-600 leading-relaxed'
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1.125rem',
              color: '#4B5563',
              lineHeight: '1.625',
              fontWeight: '400',
            }}
          >
            Join our mailing list
          </p>
        </div>

        {submissionState.error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              borderRadius: '0.375rem',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              color: '#991B1B',
              fontSize: '0.875rem',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {submissionState.error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='space-y-8'
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div
            className='space-y-6'
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div>
              <input
                type='text'
                id='name'
                name='name'
                value={form.name}
                onChange={handleChange}
                required
                disabled={submissionState.isSubmitting}
                className='w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 transition-colors duration-200'
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  opacity: submissionState.isSubmitting ? 0.5 : 1,
                }}
                placeholder='NAME *'
                onFocus={(e) => (e.target.style.borderBottomColor = '#111827')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#E5E7EB')}
              />
            </div>

            <div>
              <input
                type='email'
                id='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                required
                disabled={submissionState.isSubmitting}
                className='w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 transition-colors duration-200'
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  opacity: submissionState.isSubmitting ? 0.5 : 1,
                }}
                placeholder='EMAIL *'
                onFocus={(e) => (e.target.style.borderBottomColor = '#111827')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#E5E7EB')}
              />
            </div>

            <div>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                disabled={submissionState.isSubmitting}
                className='w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 transition-colors duration-200'
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  opacity: submissionState.isSubmitting ? 0.5 : 1,
                }}
                placeholder='PHONE'
                onFocus={(e) => (e.target.style.borderBottomColor = '#111827')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#E5E7EB')}
              />
            </div>

            <div>
              <textarea
                id='note'
                name='note'
                value={form.note}
                onChange={handleChange}
                rows='4'
                disabled={submissionState.isSubmitting}
                className='w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-sans text-base placeholder-gray-400 resize-none transition-colors duration-200'
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1rem',
                  resize: 'none',
                  transition: 'border-color 0.2s',
                  opacity: submissionState.isSubmitting ? 0.5 : 1,
                }}
                placeholder='NOTE'
                onFocus={(e) => (e.target.style.borderBottomColor = '#111827')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#E5E7EB')}
              />
            </div>
          </div>

          <div className='pt-8' style={{ paddingTop: '2rem' }}>
            <button
              type='submit'
              disabled={submissionState.isSubmitting}
              className='w-full bg-gray-900 text-white py-4 px-8 font-mono text-xs uppercase tracking-widest hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 border-0'
              style={{
                width: '100%',
                backgroundColor: submissionState.isSubmitting
                  ? '#6B7280'
                  : '#111827',
                color: 'white',
                padding: '1rem 2rem',
                fontFamily: "'Baugeld Spezialisten', monospace",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: 'none',
                cursor: submissionState.isSubmitting
                  ? 'not-allowed'
                  : 'pointer',
                transition: 'background-color 0.2s',
                opacity: submissionState.isSubmitting ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                if (!submissionState.isSubmitting) {
                  e.target.style.backgroundColor = '#1F2937';
                }
              }}
              onMouseLeave={(e) => {
                if (!submissionState.isSubmitting) {
                  e.target.style.backgroundColor = '#111827';
                }
              }}
            >
              {submissionState.isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
