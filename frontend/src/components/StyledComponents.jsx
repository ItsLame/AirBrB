import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const StyledStarRating = styled(Card.Text)`
  & {
    transition: all 100ms ease-in-out;
  }

  &:hover {
    color: #ffc107;
    cursor: pointer;
  }
`;

export const StarRating = ({ avgRating, numReviews }) => {
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
