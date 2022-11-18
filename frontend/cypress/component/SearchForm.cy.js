import SearchForm from '../../src/components/listings/SearchForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

describe('Search Form Component', () => {
  it('Test', () => {
    cy.mount(<SearchForm show={true} />);

    // check search button
    cy.get('button[name="search-submit"]').should('have.text', 'Search');

    // check toggle on/off working
    cy.get('#search-filter-toggle')
      .invoke('attr', 'aria-pressed')
      .should('contain', 'false');
    cy.get('#search-filter-toggle').click();
    cy.get('#search-filter-toggle')
      .invoke('attr', 'aria-pressed')
      .should('contain', 'true');

    // check fields and buttons are working
    cy.get('input[name="search-field"]')
      .focus()
      .type('test title')
      .should('have.value', 'test title');

    cy.get('input[name="min-bedrooms-field"]')
      .focus()
      .type(1)
      .should('have.value', 1);

    cy.get('input[name="max-bedrooms-field"]')
      .focus()
      .type(2)
      .should('have.value', 2);

    cy.get('input[name="min-price-field"]')
      .focus()
      .type(10)
      .should('have.value', 10);

    cy.get('input[name="max-price-field"]')
      .focus()
      .type(20)
      .should('have.value', 20);

    cy.get('button[name="high-rating-toggle"]')
      .click()
      .invoke('attr', 'aria-pressed')
      .should('contain', 'true');

    cy.get('button[name="low-rating-toggle"]')
      .click()
      .click()
      .invoke('attr', 'aria-pressed')
      .should('contain', 'false');

    // check search button again
    cy.get('button[name="search-filter-submit"]').should(
      'have.text',
      'Search with 4 filters'
    );
  });
});

// const dateNow = new Date().toLocaleDateString()
// it('Default Message', () => {
// cy.mount(<Demo/>)
// cy.get('#message').should('have.text','Hello Browserstack! Good Morning')
// cy.get('#date').should('have.text','Today\'s date is: '+ dateNow)
// })
// it('Good Evening Message', () => {
// cy.mount(<Demo greetings='Good Evening'/>)
// cy.get('#message').should('have.text','Hello Browserstack! Good Evening')
// cy.get('#date').should('have.text','Today\'s date is: '+ dateNow)
// })
