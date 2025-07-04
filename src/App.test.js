import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders signup form', () => {
  render(<App />);
  const headingElement = screen.getByText(/So you want a spatial computer/i);
  expect(headingElement).toBeInTheDocument();
  
  const subtitleElement = screen.getByText(/We've got the missing piece/i);
  expect(subtitleElement).toBeInTheDocument();
});
