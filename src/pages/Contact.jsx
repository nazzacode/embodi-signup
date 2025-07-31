import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/bg1.jpg')`
        }}
      >
        <Navigation />
        <div className="flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-2xl">
            <div className="bg-black/30 backdrop-blur-sm rounded shadow-2xl border border-white/30 p-8 text-center">
              {/* VR Man Image */}
              <div className="mb-6">
                <img 
                  src="/assets/vr_man2.png" 
                  alt="VR User" 
                  className="w-32 h-32 mx-auto opacity-80 invert drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" 
                />
              </div>
              
              <h1 className="text-4xl font-medium text-white mb-6">
                Thank you!
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
              <Button
                onClick={() => setIsSuccess(false)}
                className="bg-white text-black hover:bg-gray-100"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/bg1.jpg')`
      }}
    >
      <Navigation />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-2xl">
          <div className="bg-black/30 backdrop-blur-sm rounded shadow-2xl border border-white/30 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* VR Man Image */}
              <div className="mb-6">
                <img 
                  src="/assets/vr_man2.png" 
                  alt="VR User" 
                  className="w-32 h-32 mx-auto opacity-80 invert drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" 
                />
              </div>
              
              <h1 className="text-4xl font-medium text-white mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                Want to get in touch? We'd love to hear from you about spatial computing, partnerships, or any questions about our platform.
              </p>
              <p className="text-sm text-gray-350 mb-8">
                You can also email us directly at <a href="mailto:info@embodi.tech" className="text-white hover:text-gray-300 transition-colors underline">info@embodi.tech</a>
              </p>
            </div>

            {/* Error Message */}
            <ErrorMessage message={error} />

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FormInput
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    disabled={isSubmitting}
                    data-testid="name-input"
                  />
                  {validationErrors.name && (
                    <div className="text-red-400 text-sm mt-1">
                      {validationErrors.name}
                    </div>
                  )}
                </div>
                
                <div>
                  <FormInput
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    disabled={isSubmitting}
                    showIcon={false}
                    data-testid="email-input"
                  />
                  {validationErrors.email && (
                    <div className="text-red-400 text-sm mt-1">
                      {validationErrors.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <FormInput
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  disabled={isSubmitting}
                  data-testid="subject-input"
                />
                {validationErrors.subject && (
                  <div className="text-red-400 text-sm mt-1">
                    {validationErrors.subject}
                  </div>
                )}
              </div>
              
              <div>
                <FormInput
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message..."
                  required
                  disabled={isSubmitting}
                  rows={5}
                  data-testid="message-input"
                />
                {validationErrors.message && (
                  <div className="text-red-400 text-sm mt-1">
                    {validationErrors.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  data-testid="submit-button"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;