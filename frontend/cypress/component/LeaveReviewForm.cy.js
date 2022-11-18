import LeaveReviewForm from '../../src/components/listings/LeaveReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

describe('Leave Review Form Component', () => {
  it('test review form fields and buttons', () => {
    cy.mount(<LeaveReviewForm reviewFormShow={true} />);

    // check ratings
    cy.get('#review-rating-3')
      .click()
      .should('have.attr', 'aria-pressed', 'true');

    // check comment
    cy.get('input[name="review-comment"]')
      .focus()
      .type('Review Comment')
      .should('have.value', 'Review Comment');
  });
});
