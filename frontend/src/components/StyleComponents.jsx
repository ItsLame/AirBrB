import React from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { BsFillStarFill } from 'react-icons/bs';
import PropTypes from 'prop-types';

const StyledStarRating = styled(Card.Text)`
  &:hover {
    color: #ffc107;
  }
`;

export const StarRating = ({ ratings, reviews }) => {
  StarRating.propTypes = {
    ratings: PropTypes.number,
    reviews: PropTypes.number,
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
        <span>{`${ratings} (${reviews})`}</span>
      </StyledStarRating>
    </>
  );
};
