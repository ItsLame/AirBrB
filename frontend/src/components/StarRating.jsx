import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';

import { StyledStarRating } from './StyledComponents';

const StarRating = ({ avgRating, numReviews }) => {
  StarRating.propTypes = {
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  return (
    <>
      <StyledStarRating
        className="d-flex gap-1 align-items-center text-decoration-underline mb-0 flex-nowrap"
        onClick={(event) => {
          event.stopPropagation();
          console.log('CLICK REVIEW');
        }}
      >
        <BsFillStarFill size={10} />
        <span>{avgRating}</span>
        <span>({numReviews})</span>
      </StyledStarRating>
    </>
  );
};

export default StarRating;
