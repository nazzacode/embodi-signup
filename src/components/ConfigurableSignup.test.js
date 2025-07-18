import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigurableSignup from './ConfigurableSignup';

// Mock fetch globally
global.fetch = jest.fn();

describe('ConfigurableSignup', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should render initial form with content from configuration', () => {
    render(<ConfigurableSignup />);

    // Check for configured content
    expect(screen.getByText(/So you want a spatial computer/i)).toBeInTheDocument();
    expect(screen.getByText(/We've got the missing piece/i)).toBeInTheDocument();
    expect(screen.getByText(/1 update per month, never spam/i)).toBeInTheDocument();
    expect(screen.getByText(/We're building the first spatial desktop/i)).toBeInTheDocument();

    // Check for email field from configuration
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    
    // Additional fields should not be visible initially
    expect(screen.queryByPlaceholderText('Name (optional)')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Phone (optional)')).not.toBeInTheDocument();

    // Submit button should be present
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('should use configuration for styling and structure', () => {
    render(<ConfigurableSignup />);

    // Check that the email input has proper attributes from config
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).not.toBeDisabled();

    // Check that submit button is present and properly configured
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
}); 