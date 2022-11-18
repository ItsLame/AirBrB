describe('create new listing happy path', () => {
  it('should navigate to landing screen successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
  });

  it('should open up login form successfully', () => {
    cy.get('#navbar-toggle').click();
    cy.get('#login-dropdown-item').click();
    cy.url().should('include', 'localhost:3000/login');
  });

  it('should login successfully', () => {
    const email = 'Bob@email.address.com';
    const password = 'bpassword';

    cy.get('input[name="login-email"]').focus().type(email);
    cy.get('input[name="login-password"]').focus().type(password);
    cy.get('button[name="login-submit"').click();

    cy.get('#mylisting-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });
  });

  it('should navigate to my listing page successfully', () => {
    cy.get('#mylisting-nav-link').click();
    cy.url().should('include', 'localhost:3000/my_listing');
  });

  it('should open up a create new listing form successfully', () => {
    cy.get('#add-listing').click();
    cy.url().should('include', 'localhost:3000/my_listings/create');
  });

  it('should create a new listing successfully', () => {
    const title = 'Cart Hotel';
    const street = 'Cowper Street';
    const city = 'Newcastle';
    const state = 'New South Wales';
    const postcode = '2267';
    const country = 'Australia';
    const price = 5;
    const bathrooms = 3;
    const bedrooms = [[4], [3], [1]];

    cy.get('input[name="listing-title-input"]').focus().type(title);
    cy.get('input[name="listing-street-input"]').focus().type(street);
    cy.get('input[name="listing-city-input"]').focus().type(city);
    cy.get('input[name="listing-state-input"]').focus().type(state);
    cy.get('input[name="listing-postcode-input"]').focus().type(postcode);
    cy.get('input[name="listing-country-input"]').focus().type(country);
    cy.get('input[name="listing-price-input"]').focus().clear().type(price);
    cy.get('button[name="listing-property-hotel-button"]').click();

    for (let i = 0; i <= bathrooms; i++) {
      cy.get('button[name="listing-bathrooms-plus-button"]').click();
    }

    for (let i = 0; i < bedrooms.length - 1; i++) {
      cy.get('button[name="listing-bedrooms-add-button"]').click();
    }

    bedrooms.forEach((item, idx) => {
      for (let i = 0; i < item - 1; i++) {
        cy.get(`button[name="listing-bedrooms-${idx}-plus-button"]`).click();
      }
    });

    // for (let k = 0; k < bedrooms[k]; k++) {
    // bedrooms.forEach((i) => {
    //   cy.get('button[name="listing-bedrooms-add-button"]').click();
    //   // cy.get(`button[name="listing-bedrooms-${i}-plus-button"]`).click();
    // });
    // }
  });

  // it('should open up register form successfully through become a host', () => {
  //   cy.get('[name="register-nav-link"]').click();
  //   cy.url().should('include', 'localhost:3000/register');
  // });

  // // it('should open up register form successfully through drop down', () => {
  // //   cy.get('[name="navbar-toggle"]').click();
  // //   cy.get('[name="register-dropdown-item"]').click();
  // //   cy.url().should('include', 'localhost:3000/register');
  // // });

  // it('should register successfully', () => {
  //   cy.get('input[name="register-email"]')
  //     .focus()
  //     .type('Bob@email.address.com');
  //   cy.get('input[name="register-name"]').focus().type('Bob');
  //   cy.get('input[name="register-password"]').focus().type('bpassword');
  //   cy.get('input[name="register-password-confirm"]').focus().type('bpassword');
  //   cy.get('button[name="register-button"').click();
  // });

  // it('should automatically be logged in', () => {
  //   cy.get('[name="mylisting-nav-link"]').then((navlink) => {
  //     expect(navlink.text()).to.contain('My listings');
  //   });
  // });
});
