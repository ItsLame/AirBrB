describe('make a booking happy path', () => {
  it('should make a booking successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    cy.get('#navbar-toggle').click();

    cy.get('#login-dropdown-item').click();
    cy.url().should('include', '/login');

    const email = 'AnotherBob@email.address.com';
    const password = 'bpassword';

    cy.get('input[name="login-email"]').focus().type(email);
    cy.get('input[name="login-password"]').focus().type(password);
    cy.get('button[name="login-submit"').click();

    cy.get('#listing-card-0').click();
    cy.get('#listing-book-button').click();
    cy.url().should('include', '/book');

    cy.get('input[name="booking-availability"]').first().check();

    // const dayjs = require('dayjs')
    // cy.get('input[name="listing-book-start-date"]')
    // .find('input')
    // .click()
    cy.log(cy.get('#booking-start-0-date-field'));
    // .eq(0) // value stored in 1st input
    // .type('18/11/2022');
    // .invoke('val')

    // cy.get('#booking-start-0-button').click()
    // cy.get('input[name="listing-book-start-date"]').focus().type(dayjs().format('YYYY/MM/DD'))
    // cy.get('input[name="listing-book-start-date"]').focus().type('18')
    // cy.get('input[name="listing-book-start-date"]').invoke('val').type('18')
    // cy.get('button[name="listing-book-start-date"]').click()
    // cy.get('button[name="listing-book-submit"]')
  });
});
