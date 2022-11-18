import PlusMinusField from '../../src/components/my_listings/PlusMinusField';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

describe('Plus Minus Field Component', () => {
  it('plus and minus buttons', () => {
    cy.mount(<PlusMinusField name="test" />);
    cy.get('button[name="test-minus-button"]').click();
    cy.get('button[name="test-plus-button"]').click();
  });
});
