import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders signup form', () => {
  render(<App />);
  const headingElement = screen.getByText(/embodi computing/i);
  expect(headingElement).toBeInTheDocument();
  
  const joinElement = screen.getByText(/join our mailing list/i);
  expect(joinElement).toBeInTheDocument();
});
