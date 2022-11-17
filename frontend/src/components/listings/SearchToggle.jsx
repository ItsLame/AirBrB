import React from 'react';
import PropTypes from 'prop-types';

import { StyledSearchToggle } from '../StyledComponents';

const SearchToggle = ({ onClickHandler }) => {
  SearchToggle.propTypes = {
    onClickHandler: PropTypes.func,
  };

  return (
    <StyledSearchToggle
      className="rounded-5 border-0 px-5 py-2 my-2"
      onClick={(event) => {
        onClickHandler();
      }}
    >
      Search listings...
    </StyledSearchToggle>
  );
};

export default SearchToggle;
