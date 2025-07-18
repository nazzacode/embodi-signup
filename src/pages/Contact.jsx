import React from 'react';
import Navigation from '../components/Navigation';

const Contact = () => {
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
            <h1 className="text-4xl font-medium text-gray-350 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Want to get in touch? We'd love to hear from you about spatial computing, partnerships, or any questions about our platform.
            </p>
            <div className="text-sm text-gray-350">
              More contact options coming soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;