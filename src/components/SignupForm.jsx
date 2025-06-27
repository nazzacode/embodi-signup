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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Embodi Computing
          </h1>
          <p className="font-serif text-lg text-gray-600 leading-relaxed">
            Join Our Mailing List
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide">
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
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide">
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
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 transition-colors duration-200"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="note" className="block font-serif text-sm font-medium text-gray-900 mb-3 tracking-wide">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={form.note}
                onChange={handleChange}
                rows="4"
                className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:outline-none focus:border-gray-900 text-gray-900 font-serif text-base placeholder-gray-400 resize-none transition-colors duration-200"
                placeholder="Add any additional notes"
              />
            </div>
          </div>
          
          <div className="pt-8">
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-4 px-8 font-typewriter text-xs uppercase tracking-widest hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 border-0"
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