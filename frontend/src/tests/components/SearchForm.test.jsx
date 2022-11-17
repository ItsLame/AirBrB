import React from 'react';
// import { render, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import SearchForm from '../../components/listings/SearchForm';

test('renders listing card component', () => {
  render(<SearchForm />);
  // expect(screen.getByRole('button', { name: /clear all/i }));
  // expect(screen.getByText(/filters/i));
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
