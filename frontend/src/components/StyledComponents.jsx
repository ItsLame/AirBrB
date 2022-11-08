import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const StyledStarRating = styled(Card.Text)`
  &:hover {
    color: #ffc107;
    cursor: pointer;
    transition: all 0.2s ease-in;
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
        className="d-flex gap-1 align-items-center text-decoration-underline"
        onClick={(event) => {
          event.stopPropagation();
          console.log('CLICK REVIEW');
        }}
      >
        <BsFillStarFill />
        <span>{`${avgRating} (${numReviews})`}</span>
      </StyledStarRating>
    </>
  );
};
