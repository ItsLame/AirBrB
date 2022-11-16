import React from 'react';
import PropTypes from 'prop-types';
import { BsFillStarFill } from 'react-icons/bs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { StyledStarRating } from '../StyledComponents';

const StarRating = ({ avgRating, numReviews }) => {
  StarRating.propTypes = {
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Popover id={`star-rating-${avgRating}-popover`}>
          <Popover.Header as="h3">Reviews</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      }
    >
      <StyledStarRating
        tabIndex={0}
        className="d-flex gap-1 align-items-center text-decoration-underline mb-0 flex-nowrap fw-bold"
        onClick={(event) => {
          // event.stopPropagation();
        }}
      >
        <BsFillStarFill size={10} />
        <span>{avgRating}</span>
        <span>({numReviews})</span>
        <RiArrowDropDownLine size={25} style={{ marginLeft: '-7px', marginRight: '-7px' }} />
      </StyledStarRating>
    </OverlayTrigger>
  );
};

export default StarRating;
