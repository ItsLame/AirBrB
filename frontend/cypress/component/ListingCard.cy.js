import ListingCard from '../../src/components/listings/ListingCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

describe('ListingCard.cy.js', () => {
  it('test search form fields and buttons', () => {
    cy.mount(<ListingCard />);
  });
});
