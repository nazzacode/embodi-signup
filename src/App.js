import React from 'react';
import './App.css';
import ConfigurableSignup from './components/ConfigurableSignup';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <ConfigurableSignup />
      </div>
    </ErrorBoundary>
  );
}

export default App;
