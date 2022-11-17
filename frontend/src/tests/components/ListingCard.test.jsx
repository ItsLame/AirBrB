import React from 'react';
// import { render, screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import ListingCard from '../../components/listings/ListingCard';

test('renders listing card component', () => {
  render(<ListingCard />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
