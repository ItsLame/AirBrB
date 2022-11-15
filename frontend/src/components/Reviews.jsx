import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import Table from 'react-bootstrap/Table';

const Reviews = ({ reviews, avgRating, numReviews }) => {
  Reviews.propTypes = {
    reviews: PropTypes.array,
    avgRating: PropTypes.number,
    numReviews: PropTypes.number,
  };

  return (
    <>
      {reviews !== null && avgRating !== null && numReviews !== null && (
        <>
          <h4>Reviews</h4>

          {/* Reviews summary */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <BsFillStarFill />
            <span className="fs-5">{avgRating}</span>
            <span className="fs-5">
              ({numReviews} review{numReviews === 1 ? '' : 's'})
            </span>
          </div>

          {/* Reviews */}
          {reviews.length === 0
            ? (
            <p className="text-muted fst-italic">No reviews yet!</p>
              )
            : (
            <Table striped hover size="md">
              <tbody>
                {reviews
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
                        <td className="lh-1 align-middle">
                          <span className="fw-bold">{review.rater}</span>
                          <br />
                          <span
                            className="text-muted fst-italic"
                            style={{ fontSize: '10pt' }}
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

                        <td
                          className="align-middle"
                          style={{ minWidth: '100px' }}
                        >
                          {[...Array(review.rating).keys()].map((i) => (
                            <BsFillStarFill key={i} fill="black" />
                          ))}
                          {[...Array(5 - review.rating).keys()].map((i) => (
                            <BsFillStarFill key={i} fill="darkgray" />
                          ))}
                        </td>

                        <td className="align-middle">{review.comment}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
              )}
        </>
      )}
    </>
  );
};

export default Reviews;
