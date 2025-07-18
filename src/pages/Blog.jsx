import React from 'react';
import Navigation from '../components/Navigation';

const Blog = () => {
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
              Blog
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Coming soon... We'll be sharing insights about spatial computing, AR/VR development, and the future of human-computer interaction.
            </p>
            <div className="text-sm text-gray-350">
              Stay tuned for updates!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;