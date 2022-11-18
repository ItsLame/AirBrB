import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { StyledStarRating } from '../StyledComponents';

const StarRating = ({ reviews, avgRating, numReviews }) => {
  StarRating.propTypes = {
    reviews: PropTypes.array,
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  const [show, setShow] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState(0);

  // opening and closing the popover
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  // hovering over an individual rating
  const hoverRating = (e) =>
    e.currentTarget.classList.add('text-decoration-underline');
  const blurRating = (e) =>
    e.currentTarget.classList.remove('text-decoration-underline');

  // individual rating modals
  const hideModal = () => {
    setModalShow(false);
    setSelectedRating(0);
  };
  const showModal = (rating, event) => {
    event.stopPropagation();
    handleClose();
    setSelectedRating(rating);
    setModalShow(true);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyPress={(e) => e.stopPropagation()}
    >
      <OverlayTrigger
        show={show}
        placement="bottom"
        overlay={
          <Popover
            id={`star-rating-${avgRating}-popover`}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onClick={(e) => e.stopPropagation()}
          >
            <Popover.Header as="h3">Reviews</Popover.Header>
            <Popover.Body>
              <div className="d-flex flex-column gap-2">
                <div
                  className="d-flex gap-1 align-items-center fs-6 fw-bold"
                  style={{ color: '#ffc107' }}
                >
                  <BsFillStarFill size={10} />
                  <span>
                    {avgRating} ({numReviews} reviews)
                  </span>
                </div>

                <hr className="my-0" />

                <div
                  className="d-flex gap-1 align-items-center"
                  aria-haspopup="dialog"
                  aria-label="View all 1 star ratings"
                  onClick={(e) => showModal(1, e)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  onMouseEnter={hoverRating}
                  onFocus={hoverRating}
                  onMouseLeave={blurRating}
                  onBlur={blurRating}
                >
                  <BsFillStarFill />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <span className="mt-1 ms-2">
                    {reviews.filter((review) => review.rating === 1).length} (
                    {numReviews === 0
                      ? '0%'
                      : (
                          (reviews.filter((review) => review.rating === 1)
                            .length /
                            numReviews) *
                          100
                        ).toFixed(1) + '%'}
                    )
                  </span>
                </div>
                <div
                  className="d-flex gap-1 align-items-center"
                  aria-haspopup="dialog"
                  aria-label="View all 2 star ratings"
                  onClick={(e) => showModal(2, e)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  onMouseEnter={hoverRating}
                  onFocus={hoverRating}
                  onMouseLeave={blurRating}
                  onBlur={blurRating}
                >
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <span className="mt-1 ms-2">
                    {reviews.filter((review) => review.rating === 2).length} (
                    {numReviews === 0
                      ? '0%'
                      : (
                          (reviews.filter((review) => review.rating === 2)
                            .length /
                            numReviews) *
                          100
                        ).toFixed(1) + '%'}
                    )
                  </span>
                </div>
                <div
                  className="d-flex gap-1 align-items-center"
                  aria-haspopup="dialog"
                  aria-label="View all 3 star ratings"
                  onClick={(e) => showModal(3, e)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  onMouseEnter={hoverRating}
                  onFocus={hoverRating}
                  onMouseLeave={blurRating}
                  onBlur={blurRating}
                >
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill fill="darkgray" />
                  <BsFillStarFill fill="darkgray" />
                  <span className="mt-1 ms-2">
                    {reviews.filter((review) => review.rating === 3).length} (
                    {numReviews === 0
                      ? '0%'
                      : (
                          (reviews.filter((review) => review.rating === 3)
                            .length /
                            numReviews) *
                          100
                        ).toFixed(1) + '%'}
                    )
                  </span>
                </div>
                <div
                  className="d-flex gap-1 align-items-center"
                  aria-haspopup="dialog"
                  aria-label="View all 4 star ratings"
                  onClick={(e) => showModal(4, e)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  onMouseEnter={hoverRating}
                  onFocus={hoverRating}
                  onMouseLeave={blurRating}
                  onBlur={blurRating}
                >
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill fill="darkgray" />
                  <span className="mt-1 ms-2">
                    {reviews.filter((review) => review.rating === 4).length} (
                    {numReviews === 0
                      ? '0%'
                      : (
                          (reviews.filter((review) => review.rating === 4)
                            .length /
                            numReviews) *
                          100
                        ).toFixed(1) + '%'}
                    )
                  </span>
                </div>
                <div
                  className="d-flex gap-1 align-items-center"
                  aria-haspopup="dialog"
                  aria-label="View all 5 star ratings"
                  onClick={(e) => showModal(5, e)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  onMouseEnter={hoverRating}
                  onFocus={hoverRating}
                  onMouseLeave={blurRating}
                  onBlur={blurRating}
                >
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <span className="mt-1 ms-2">
                    {reviews.filter((review) => review.rating === 5).length} (
                    {numReviews === 0
                      ? '0%'
                      : (
                          (reviews.filter((review) => review.rating === 5)
                            .length /
                            numReviews) *
                          100
                        ).toFixed(1) + '%'}
                    )
                  </span>
                </div>
              </div>
            </Popover.Body>
          </Popover>
        }
      >
        <StyledStarRating
          tabIndex={0}
          className="d-flex gap-1 align-items-center text-decoration-underline mb-0 flex-nowrap fw-bold"
          onMouseEnter={handleOpen}
          onFocus={handleOpen}
          onMouseLeave={handleClose}
          onBlur={handleClose}
          onClick={(e) => e.stopPropagation()}
        >
          <BsFillStarFill size={10} />
          <span>{avgRating}</span>
          <span>({numReviews})</span>
          <RiArrowDropDownLine
            size={25}
            style={{ marginLeft: '-7px', marginRight: '-7px' }}
          />
        </StyledStarRating>
      </OverlayTrigger>

      <Modal show={modalShow} onHide={hideModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRating}-star reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.filter((review) => review.rating === selectedRating)
            .length === 0
            ? (
            <p className="text-muted fst-italic">
              No {selectedRating}-star reviews yet!
            </p>
              )
            : (
            <Table hover size="md">
              <tbody>
                {reviews
                  .filter((review) => review.rating === selectedRating)
                  .sort((a, b) => {
                    if (new Date(a.postedOn) < new Date(b.postedOn)) return 1;
                    if (new Date(a.postedOn) > new Date(b.postedOn)) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((review, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="lh-1 align-middle" style={{ width: 0 }}>
                          <span className="fw-bold">{review.rater}</span>
                          <br />
                          <span
                            className="text-muted fst-italic"
                            style={{ fontSize: '10pt', whiteSpace: 'nowrap' }}
                          >
                            {new Date(review.postedOn).toLocaleDateString(
                              'default',
                              {
                                day: 'numeric',
                                year: 'numeric',
                                month: 'long',
                              }
                            )}
                          </span>
                        </td>

                        <td className="align-top lh-1">{review.comment}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
              )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StarRating;
