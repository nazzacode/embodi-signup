import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignupForm from './SignupForm';

// Mock fetch globally
global.fetch = jest.fn();

describe('SignupForm - Airtable Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should submit form data to Airtable endpoint', async () => {
    const user = userEvent.setup();

    // Mock successful Airtable response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Form submitted successfully' }),
    });

    render(<SignupForm />);

    // Fill out the form
    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const phoneInput = screen.getByPlaceholderText('PHONE');
    const noteInput = screen.getByPlaceholderText('NOTE');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '+1234567890');
    await user.type(noteInput, 'Test note');

    // Submit the form
    await user.click(submitButton);

    // Verify fetch was called with correct data
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
            note: 'Test note',
          }),
        })
      );
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

    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show loading state
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.queryByText(/submitting/i)).not.toBeInTheDocument();
    });
  });

  test('should show success message after successful submission', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Form submitted successfully' }),
    });

    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });
  });

  test('should show error message when submission fails', async () => {
    const user = userEvent.setup();

    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
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

    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    // Should show Airtable error message
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });

  test('should reset form after successful submission', async () => {
    const user = userEvent.setup();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Form submitted successfully' }),
    });

    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText('NAME *');
    const emailInput = screen.getByPlaceholderText('EMAIL *');
    const phoneInput = screen.getByPlaceholderText('PHONE');
    const noteInput = screen.getByPlaceholderText('NOTE');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill out form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '+1234567890');
    await user.type(noteInput, 'Test note');

    await user.click(submitButton);

    // Wait for success message to appear (form is replaced with success screen)
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    });

    // Click "Submit Another" to return to form
    const submitAnotherButton = screen.getByRole('button', {
      name: /submit another/i,
    });
    await user.click(submitAnotherButton);

    // Now verify the form is reset
    await waitFor(() => {
      const newNameInput = screen.getByPlaceholderText('NAME *');
      const newEmailInput = screen.getByPlaceholderText('EMAIL *');
      const newPhoneInput = screen.getByPlaceholderText('PHONE');
      const newNoteInput = screen.getByPlaceholderText('NOTE');

      expect(newNameInput.value).toBe('');
      expect(newEmailInput.value).toBe('');
      expect(newPhoneInput.value).toBe('');
      expect(newNoteInput.value).toBe('');
    });
  });

  test('should not submit form with missing required fields', async () => {
    const user = userEvent.setup();

    render(<SignupForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Try to submit empty form
    await user.click(submitButton);

    // Should not call fetch
    expect(fetch).not.toHaveBeenCalled();
  });
});
