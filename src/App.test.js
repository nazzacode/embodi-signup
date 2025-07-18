import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfigurableSignup from './components/ConfigurableSignup';

// Mock the Navigation component to avoid routing dependency issues
jest.mock('./components/Navigation', () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation</div>;
  };
});

// Test the core signup functionality
test('renders signup form', () => {
  render(<ConfigurableSignup />);
  
  const headingElement = screen.getByText(/So you want a spatial computer/i);
  expect(headingElement).toBeInTheDocument();
  
  const subtitleElement = screen.getByText(/We've got the missing piece/i);
  expect(subtitleElement).toBeInTheDocument();
});

test('renders form elements', () => {
  render(<ConfigurableSignup />);
  
  const emailInput = screen.getByPlaceholderText('Email');
  expect(emailInput).toBeInTheDocument();
  
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});
