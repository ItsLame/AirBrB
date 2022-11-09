import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSearchToggle = styled(Button)`
  & {
    color: #6c757d;
    background: #1c1c1c;
    box-shadow: inset 0 0 8px black, 0 0 0px black;
    transition: box-shadow 150ms ease-in-out;
  }

  &:hover {
    color: #89959f;
    background: #1c1c1c;
    box-shadow: inset 0 0 0px black, 0 0 8px black;
  }

  &:active:focus {
    color: #89959f;
    background: #1c1c1c;
    transform: scale(0.98);
  }
`;

const SearchToggle = ({ onSearchToggle }) => {
  SearchToggle.propTypes = {
    onSearchToggle: PropTypes.func,
  };

  return (
    <StyledSearchToggle
      className="rounded-5 border-0 px-5 py-2 my-2"
      onClick={onSearchToggle}
    >
      Search listings...
    </StyledSearchToggle>
  );
};

export default SearchToggle;
