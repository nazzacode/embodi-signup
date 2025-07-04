import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <SignupForm />
      </div>
    </ErrorBoundary>
  );
}

export default App;
