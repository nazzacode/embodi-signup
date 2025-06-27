import React, { useState } from 'react';

const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic will go here in later steps
    alert('Form submitted!');
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-4"
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div className="w-full max-w-md mx-auto" style={{ width: '100%', maxWidth: '28rem', margin: '0 auto' }}>
        <div className="text-center mb-12" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 
            className="font-serif text-4xl font-semibold text-gray-900 mb-3 tracking-tight"
            style={{ 
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '2.25rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.75rem',
              letterSpacing: '-0.025em'
            }}
          >
            Embodi Computing
          </h1>
          <p 
            className="font-serif text-lg text-gray-600 leading-relaxed"
            style={{
              fontFamily: "'Crimson Text', Georgia, serif",
              fontSize: '1.125rem',
              color: '#4B5563',
              lineHeight: '1.625'
            }}
          >
            Join Our Mailing List
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label 
                htmlFor="name" 
                className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide"
                style={{
                  display: 'block',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.025em'
                }}
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 transition-colors duration-200"
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your full name"
                onFocus={(e) => e.target.style.borderBottomColor = '#111827'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E5E7EB'}
              />
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide"
                style={{
                  display: 'block',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.025em'
                }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 transition-colors duration-200"
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your email address"
                onFocus={(e) => e.target.style.borderBottomColor = '#111827'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E5E7EB'}
              />
            </div>
            
            <div>
              <label 
                htmlFor="phone" 
                className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide"
                style={{
                  display: 'block',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.025em'
                }}
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 transition-colors duration-200"
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '1rem',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Enter your phone number"
                onFocus={(e) => e.target.style.borderBottomColor = '#111827'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E5E7EB'}
              />
            </div>
            
            <div>
              <label 
                htmlFor="note" 
                className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide"
                style={{
                  display: 'block',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#111827',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.025em'
                }}
              >
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={form.note}
                onChange={handleChange}
                rows="4"
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 resize-none transition-colors duration-200"
                style={{
                  width: '100%',
                  padding: '1rem 0',
                  border: 'none',
                  borderBottom: '2px solid #E5E7EB',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  color: '#111827',
                  fontFamily: "'Crimson Text', Georgia, serif",
                  fontSize: '1rem',
                  resize: 'none',
                  transition: 'border-color 0.2s'
                }}
                placeholder="Add any additional notes"
                onFocus={(e) => e.target.style.borderBottomColor = '#111827'}
                onBlur={(e) => e.target.style.borderBottomColor = '#E5E7EB'}
              />
            </div>
          </div>
          
          <div className="pt-8" style={{ paddingTop: '2rem' }}>
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-4 px-8 font-typewriter text-xs uppercase tracking-widest hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 border-0"
              style={{
                width: '100%',
                backgroundColor: '#111827',
                color: 'white',
                padding: '1rem 2rem',
                fontFamily: "'Courier Prime', 'Courier New', monospace",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1F2937'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#111827'}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm; 