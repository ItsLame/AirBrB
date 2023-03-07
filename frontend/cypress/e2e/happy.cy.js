describe('user flow happy path', () => {
  it('should navigate to landing screen successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
  });

  it('should be logged out', () => {
    cy.get('#register-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('Become a host');
    });
  });

  it('happy user flow', () => {
    // --- 1. REGISTER --- //
    cy.get('#register-nav-link').click();
    cy.url().should('include', '/register');

    const email = 'Bob@email.address.com';
    const name = 'Bob';
    const password = 'bpassword';

    cy.get('input[name="register-email"]').focus().type(email);
    cy.get('input[name="register-name"]').focus().type(name);
    cy.get('input[name="register-password"]').focus().type(password);
    cy.get('input[name="register-password-confirm"]').focus().type(password);
    cy.get('button[name="register-submit"').click();

    cy.get('#mylisting-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });
    cy.url().should('not.include', '/register');

    // --- 2. CREATE NEW LISTING --- //
    cy.get('#mylisting-nav-link').click();
    cy.url().should('include', '/my_listing');

    cy.get('#add-listing').click();
    cy.url().should('include', '/my_listings/create');

    const title = 'Cart Hotel';
    const youtubeLink = 'Now89X4xOv4';
    const street = 'Cowper Street';
    const city = 'Newcastle';
    const state = 'New South Wales';
    const postcode = '2267';
    const country = 'Australia';
    const price = 5;
    const bathrooms = 3;
    const bedrooms = [[4], [3], [1]];
    const amenitiesEssential = ['Wi-Fi', 'Hair-dryer'];
    const amenitiesFeatures = [
      'Indoor-fireplace',
      'Breakfast',
      'Free-parking-on-premises',
    ];
    const amenitiesLocation = ['Beachfront'];
    const amenitiesSafety = ['Smoke-alarm', 'Carbon-monoxide-alarm'];

    cy.get('input[name="listing-title-input"]').focus().type(title);

    cy.get('button[name="listing-thumbnail-youtube-toggle"]').click();
    cy.get('input[name="listing-youtube-url-field"]').focus().type(youtubeLink);

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

    amenitiesEssential.forEach((item) => {
      cy.get(`#amenities-${item}`).click();
    });

    cy.get('button[name="listing-amenities-more-button"]').click();

    [...amenitiesFeatures, ...amenitiesLocation, ...amenitiesSafety].forEach(
      (item) => {
        cy.get(`#amenities-${item}`).click();
      }
    );

    cy.get('button[name="create-listing-submit"]').click();
    cy.url().should('not.include', '/my_listings/create');

    // --- 3. UPDATE LISTING TITLE AND THUMBNAIL --- //
    cy.get('#mylisting-edit-button').click();
    cy.url().should('include', '/my_listings/edit');

    const newTitle = 'Jungle Hotel';
    const newYoutubeLink = 'GySYuc1koLI';

    cy.get('input[name="listing-title-input"]').focus().clear().type(newTitle);

    cy.get('button[name="listing-thumbnail-youtube-toggle"]').click();
    cy.get('input[name="listing-youtube-url-field"]')
      .focus()
      .type(newYoutubeLink);

    cy.get('button[name="edit-listing-submit"]').click();
    cy.url().should('not.include', '/my_listings/edit');

    // --- 4. PUBLISH LISTING --- //
    cy.get('#mylisting-publish-button').click();
    cy.url().should('include', '/my_listings/publish');

    cy.get('button[name="mylisting-publish-submit"]').click();
    cy.url().should('not.include', '/my_listings/publish');

    // --- 5. UNPUBLISH LISTING --- //
    cy.get('#mylisting-unpublish-button').click();
    cy.get('button[name="mylisting-unpublish-submit"]').click();

    // --- 6. MAKE A BOOKING --- //
    // cy.get('#landing-button').click();

    // --- 7. LOGOUT  --- //
    cy.get('#navbar-toggle').click();
    cy.get('#logout-dropdown-item').click();
    cy.get('#register-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('Become a host');
    });

    // --- 8. LOG BACK IN --- //
    cy.get('#navbar-toggle').click();
    cy.get('#login-dropdown-item').click();
    cy.url().should('include', '/login');
    cy.get('input[name="login-email"]').focus().type(email);
    cy.get('input[name="login-password"]').focus().type(password);
    cy.get('button[name="login-submit"').click();
    cy.get('#mylisting-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });
  });
});
