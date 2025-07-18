import React from 'react';
import Navigation from '../components/Navigation';
import ConfigurableSignup from '../components/ConfigurableSignup';

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/assets/bg1.jpg')`
      }}
    >
      <Navigation />
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        <ConfigurableSignup />
      </div>
    </div>
  );
};

export default Home;