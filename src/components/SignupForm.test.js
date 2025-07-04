import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignupForm from './SignupForm';

// Mock fetch globally
global.fetch = jest.fn();

describe('SignupForm - Progressive Disclosure Flow', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should submit email first, then expand form for additional details', async () => {
    const user = userEvent.setup();

    // Mock successful Airtable response for both submissions
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      });

    render(<SignupForm />);

    // Initially only email field should be visible
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    
    // Name and phone should not be visible initially
    expect(screen.queryByPlaceholderText('Name (optional)')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Phone (optional)')).not.toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Submit email only
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Verify first fetch was called with email only
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_FORM_ENDPOINT,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: '',
            email: 'john@example.com',
            phone: '',
            note: '',
          }),
        })
      );
    });

    // After first submission, additional fields should be visible
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Phone (optional)')).toBeInTheDocument();
    });

    // Email should be disabled after first submission
    expect(emailInput).toBeDisabled();

    // Fill additional fields and submit again
    const nameInput = screen.getByPlaceholderText('Name (optional)');
    const phoneInput = screen.getByPlaceholderText('Phone (optional)');

    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '+1234567890');
    await user.click(submitButton);

    // Verify second fetch was called with complete data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        process.env.REACT_APP_FORM_ENDPOINT,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            note: '',
          }),
        })
      );
    });

    // Should show success screen after final submission
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument();
    });
  });

  test('should show loading state during form submission', async () => {
    const user = userEvent.setup();

    // Mock delayed response
    fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ message: 'Success' }),
              }),
            100
          )
        )
    );

    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show loading state
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();

    // Wait for submission to complete and form to expand
    await waitFor(() => {
      expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument();
    });
  });

  test('should allow email-only submission and show success', async () => {
    const user = userEvent.setup();

    // Mock two successful responses (email submission, then final submission)
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      });

    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Submit email only
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Wait for form to expand
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument();
    });

    // Submit again without filling additional fields
    await user.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument();
    });
  });

  test('should show error message when submission fails', async () => {
    const user = userEvent.setup();

    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });

  test('should handle Airtable error responses', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ errors: ['Email is required'] }),
    });

    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show Airtable error message
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });

  test('should reset form after successful submission', async () => {
    const user = userEvent.setup();

    // Mock successful responses for complete flow
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Form submitted successfully' }),
      });

    render(<SignupForm />);

    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out email and submit
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Wait for form to expand
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument();
    });

    // Fill additional fields
    const nameInput = screen.getByPlaceholderText('Name (optional)');
    const phoneInput = screen.getByPlaceholderText('Phone (optional)');

    await user.type(nameInput, 'John Doe');
    await user.type(phoneInput, '+1234567890');
    await user.click(submitButton);

    // Wait for success message to appear
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /thank you/i })).toBeInTheDocument();
    });

    // Click "Submit Another" to return to form
    const submitAnotherButton = screen.getByRole('button', {
      name: /submit another/i,
    });
    await user.click(submitAnotherButton);

    // Form should be reset to initial state
    await waitFor(() => {
      const newEmailInput = screen.getByPlaceholderText('Email');
      expect(newEmailInput.value).toBe('');
      expect(newEmailInput).not.toBeDisabled();
    });
    
    // Additional fields should not be visible
    expect(screen.queryByPlaceholderText('Name (optional)')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Phone (optional)')).not.toBeInTheDocument();
  });

  test('should not submit form with missing email', async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Try to submit without email
    await user.click(submitButton);

    // Should show validation error (email required)
    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    // Fetch should not be called
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should show initial stage with correct content', () => {
    render(<SignupForm />);

    // Check for new content
    expect(screen.getByText(/So you want a spatial computer/i)).toBeInTheDocument();
    expect(screen.getByText(/We've got the missing piece/i)).toBeInTheDocument();
    expect(screen.getByText(/~1 update\/month, never spam/i)).toBeInTheDocument();

    // Only email field should be visible
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Name (optional)')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Phone (optional)')).not.toBeInTheDocument();
  });
});
