describe('register happy path', () => {
  it('should navigate to landing screen successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
  });

  it('should be logged out', () => {
    cy.get('#register-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('Become a host');
    });
  });

  it('should open up register form successfully through become a host', () => {
    cy.get('#register-nav-link').click();
    cy.url().should('include', 'localhost:3000/register');
  });

  // it('should open up register form successfully through drop down', () => {
  //   cy.get('[name="navbar-toggle"]').click();
  //   cy.get('[name="register-dropdown-item"]').click();
  //   cy.url().should('include', 'localhost:3000/register');
  // });

  it('should register successfully', () => {
    const email = 'Bob@email.address.com';
    const name = 'Bob';
    const password = 'bpassword';

    cy.get('input[name="register-email"]').focus().type(email);
    cy.get('input[name="register-name"]').focus().type(name);
    cy.get('input[name="register-password"]').focus().type(password);
    cy.get('input[name="register-password-confirm"]').focus().type(password);
    cy.get('button[name="register-submit"').click();
  });

  it('should automatically be logged in', () => {
    cy.get('[name="mylisting-nav-link"]').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });
  });
});
