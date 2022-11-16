import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { StyledStarRating } from '../StyledComponents';

const StarRating = ({ avgRating, numReviews }) => {
  StarRating.propTypes = {
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  return (
    <OverlayTrigger
      placement="right"
      overlay={
        <Popover id={`star-rating-${avgRating}-popover`}>
          <Popover.Header as="h3">Hi</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      }
    >
      <StyledStarRating
        tabIndex={0}
        className="d-flex gap-1 align-items-center text-decoration-underline mb-0 flex-nowrap"
        onClick={(event) => {
          // event.stopPropagation();
        }}
      >
        <BsFillStarFill size={10} />
        <span>{avgRating}</span>
        <span>({numReviews})</span>
      </StyledStarRating>
    </OverlayTrigger>
  );
};

export default StarRating;
