// import 'cypress-localstorage-commands';
describe('create new listing happy path', () => {
  it('should create a new listing successfully', () => {
    cy.visit('localhost:3000/');
    cy.url().should('include', 'localhost:3000');
    cy.get('#navbar-toggle').click();

    cy.get('#login-dropdown-item').click();
    cy.url().should('include', 'localhost:3000/login');

    const email = 'Bob@email.address.com';
    const password = 'bpassword';

    cy.get('input[name="login-email"]').focus().type(email);
    cy.get('input[name="login-password"]').focus().type(password);
    cy.get('button[name="login-submit"').click();

    cy.get('#mylisting-nav-link').then((navlink) => {
      expect(navlink.text()).to.contain('My listings');
    });

    cy.get('#mylisting-nav-link').click();
    cy.url().should('include', 'localhost:3000/my_listing');

    cy.get('#add-listing').click();
    cy.url().should('include', 'localhost:3000/my_listings/create');

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

    cy.get('button[name="listings-thumbnail-youtube-toggle"]').click();
    cy.get('input[name="listings-youtube-url-field"]')
      .focus()
      .type(youtubeLink);

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

    cy.get('button[name="listings-amenities-more-button"]').click();

    [...amenitiesFeatures, ...amenitiesLocation, ...amenitiesSafety].forEach(
      (item) => {
        cy.get(`#amenities-${item}`).click();
      }
    );

    cy.get('button[name="create-listing-submit"]').click();
    cy.url().should('not.include', '/create');
  });
});

// describe('create new listing happy path', () => {
//   it('should navigate to landing screen successfully', () => {
//     cy.visit('localhost:3000/');
//     cy.url().should('include', 'localhost:3000');

//     // cy.getLocalStorage('airbrbAccessToken').should('equal', '');
//     // cy.getLocalStorage('airbrbEmail').should('equal', 'Bob@email.address.com');
//   });

//   it('should open up login form successfully', () => {
//     cy.get('#navbar-toggle').click();
//     cy.get('#login-dropdown-item').click();
//     cy.url().should('include', 'localhost:3000/login');
//   });

//   it('should login successfully', () => {
//     const email = 'Bob@email.address.com';
//     const password = 'bpassword';

//     cy.get('input[name="login-email"]').focus().type(email);
//     cy.get('input[name="login-password"]').focus().type(password);
//     cy.get('button[name="login-submit"').click();

//     cy.get('#mylisting-nav-link').then((navlink) => {
//       expect(navlink.text()).to.contain('My listings');
//     });

//     // cy.getLocalStorage('airbrbAccessToken').should('not.equal', '');
//     // cy.getLocalStorage('airbrbEmail').should('equal', 'Bob@email.address.com');
//     cy.log(cy.getLocalStorage('airbrbAccessToken'));
//   });

//   it('should navigate to my listing page successfully', () => {
//     cy.get('#mylisting-nav-link').click();
//     cy.url().should('include', 'localhost:3000/my_listing');
//   });

//   it('should open up a create new listing form successfully', () => {
//     cy.get('#add-listing').click();
//     cy.url().should('include', 'localhost:3000/my_listings/create');
//   });

//   it('should create a new listing successfully', () => {
//     const title = 'Cart Hotel';
//     const youtubeLink = 'Now89X4xOv4';

//     const street = 'Cowper Street';
//     const city = 'Newcastle';
//     const state = 'New South Wales';
//     const postcode = '2267';
//     const country = 'Australia';
//     const price = 5;
//     const bathrooms = 3;
//     const bedrooms = [[4], [3], [1]];
//     const amenitiesEssential = ['Wi-Fi', 'Hair-dryer'];
//     const amenitiesFeatures = [
//       'Indoor-fireplace',
//       'Breakfast',
//       'Free-parking-on-premises',
//     ];
//     const amenitiesLocation = ['Beachfront'];
//     const amenitiesSafety = ['Smoke-alarm', 'Carbon-monoxide-alarm'];

//     cy.get('input[name="listing-title-input"]').focus().type(title);

//     cy.get('button[name="listings-thumbnail-youtube-toggle"]').click();
//     cy.get('input[name="listings-youtube-url-field"]')
//       .focus()
//       .type(youtubeLink);

//     cy.get('input[name="listing-street-input"]').focus().type(street);
//     cy.get('input[name="listing-city-input"]').focus().type(city);
//     cy.get('input[name="listing-state-input"]').focus().type(state);
//     cy.get('input[name="listing-postcode-input"]').focus().type(postcode);
//     cy.get('input[name="listing-country-input"]').focus().type(country);
//     cy.get('input[name="listing-price-input"]').focus().clear().type(price);
//     cy.get('button[name="listing-property-hotel-button"]').click();

//     for (let i = 0; i <= bathrooms; i++) {
//       cy.get('button[name="listing-bathrooms-plus-button"]').click();
//     }

//     for (let i = 0; i < bedrooms.length - 1; i++) {
//       cy.get('button[name="listing-bedrooms-add-button"]').click();
//     }

//     bedrooms.forEach((item, idx) => {
//       for (let i = 0; i < item - 1; i++) {
//         cy.get(`button[name="listing-bedrooms-${idx}-plus-button"]`).click();
//       }
//     });

//     amenitiesEssential.forEach((item) => {
//       cy.get(`#amenities-${item}`).click();
//     });

//     cy.get('button[name="listings-amenities-more-button"]').click();

//     [...amenitiesFeatures, ...amenitiesLocation, ...amenitiesSafety].forEach(
//       (item) => {
//         cy.get(`#amenities-${item}`).click();
//       }
//     );

//     cy.get('button[name="create-listing-submit"]').click();
//   });
// });
