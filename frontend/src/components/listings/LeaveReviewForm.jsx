import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

const LeaveReviewForm = ({ reviewFormShow, setReviewFormShow }) => {
  LeaveReviewForm.propTypes = {
    reviewFormShow: PropTypes.bool,
    setReviewFormShow: PropTypes.func,
  };

  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      //
    }

    setValidated(true);
  };

  return (
    <Modal
      show={reviewFormShow}
      onHide={() => setReviewFormShow(false)}
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a review</Modal.Title>
        </Modal.Header>

        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReviewFormShow(false)}>
            Close
          </Button>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LeaveReviewForm;
