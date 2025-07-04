import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import ConfigurableSignup from './components/ConfigurableSignup';
import ErrorBoundary from './components/ErrorBoundary';

// Feature flag to switch between implementations
const USE_CONFIGURABLE_FORM = process.env.REACT_APP_USE_CONFIGURABLE_FORM === 'true';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        {USE_CONFIGURABLE_FORM ? (
          <ConfigurableSignup />
        ) : (
          <SignupForm />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;

/* 
To use the configurable form:

1. Set environment variable:
   REACT_APP_USE_CONFIGURABLE_FORM=true

2. Or replace the current SignupForm:
   - Change: <SignupForm />
   - To: <ConfigurableSignup />

3. Edit content by modifying src/config/form-config.js:
   
   // Change the heading
   content: {
     branding: {
       mainHeading: 'Your new heading here!'
     }
   }
   
   // Add a new field
   stages: [{
     fields: [
       // ... existing fields
       {
         name: 'company',
         type: 'text',
         placeholder: 'Company (optional)',
         explainer: 'Where do you work?'
       }
     ]
   }]
   
   // Change colors
   ui: {
     colors: {
       primary: '#2563eb',  // New blue color
       background: '#f0f9ff' // Light blue background
     }
   }

All changes are made in one file: src/config/form-config.js
No need to touch React components!
*/ 