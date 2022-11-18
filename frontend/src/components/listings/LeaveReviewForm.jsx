import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { StyledStar } from '../StyledComponents';
import { reviewListing } from '../../services/listings';

const LeaveReviewForm = ({
  rater,
  listingId,
  bookings,
  reviewFormShow,
  setReviewFormShow,
  setReviews,
}) => {
  LeaveReviewForm.propTypes = {
    rater: PropTypes.string,
    listingId: PropTypes.string,
    bookings: PropTypes.array,
    reviewFormShow: PropTypes.bool,
    setReviewFormShow: PropTypes.func,
    setReviews: PropTypes.func,
  };

  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const onHide = () => {
    setReviewFormShow(false);
    setRating(0);
    setComment('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
    } else {
      const review = {
        rater,
        rating,
        comment,
        postedOn: new Date().toISOString(),
      };

      reviewListing(
        listingId,
        bookings.find((booking) => booking.status === 'accepted').id,
        review
      )
        .then(() => {
          onHide();
          setReviews((curr) => [...curr, review]);
          toast.success('Review posted!');
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Modal show={reviewFormShow} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Rating</h5>
          <div className="d-flex gap-3 mb-3 w-100 justify-content-center align-items-center">
            <StyledStar
              size={40}
              tabIndex={0}
              id="review-rating-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRating(1);
                }
              }}
              aria-label="1 star rating"
              aria-pressed={rating === 1}
              onClick={() => setRating(1)}
              fill={rating >= 1 ? 'black' : 'darkgray'}
            />
            <StyledStar
              size={40}
              tabIndex={0}
              id="review-rating-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRating(2);
                }
              }}
              aria-label="2 star rating"
              aria-pressed={rating === 2}
              onClick={() => setRating(2)}
              fill={rating >= 2 ? 'black' : 'darkgray'}
            />
            <StyledStar
              size={40}
              tabIndex={0}
              id="review-rating-3"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRating(3);
                }
              }}
              aria-label="3 star rating"
              aria-pressed={rating === 3}
              onClick={() => setRating(3)}
              fill={rating >= 3 ? 'black' : 'darkgray'}
            />
            <StyledStar
              size={40}
              tabIndex={0}
              id="review-rating-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRating(4);
                }
              }}
              aria-label="4 star rating"
              aria-pressed={rating === 4}
              onClick={() => setRating(4)}
              fill={rating >= 4 ? 'black' : 'darkgray'}
            />
            <StyledStar
              size={40}
              tabIndex={0}
              id="review-rating-5"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRating(5);
                }
              }}
              aria-label="5 star rating"
              aria-pressed={rating === 5}
              onClick={() => setRating(5)}
              fill={rating >= 5 ? 'black' : 'darkgray'}
            />
          </div>

          <h5>Comment</h5>
          <FloatingLabel
            controlId="review-comment"
            label="Leave a comment (optional)"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment (optional)"
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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
