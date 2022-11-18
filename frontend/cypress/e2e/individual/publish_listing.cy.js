describe('publish listing happy path', () => {
  it('should publish listing successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    cy.get('#navbar-toggle').click();

    cy.get('#login-dropdown-item').click();
    cy.url().should('include', '/login');

    const email = 'Bob@email.address.com';
    const password = 'bpassword';

    cy.get('input[name="login-email"]').focus().type(email);
    cy.get('input[name="login-password"]').focus().type(password);
    cy.get('button[name="login-submit"').click();

    cy.get('#mylisting-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });

    cy.get('#mylisting-nav-link').click();
    cy.url().should('include', '/my_listing');

    cy.get('#mylisting-publish-button').click();
    cy.url().should('include', '/my_listings/publish');

    cy.get('button[name="mylisting-publish-submit"]').click();
    cy.url().should('not.include', '/my_listings/publish');
  });
});
