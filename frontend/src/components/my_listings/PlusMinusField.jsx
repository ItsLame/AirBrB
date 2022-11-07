import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { HiPlus, HiMinus } from 'react-icons/hi';

const PlusMinusField = ({ onMinus, num, onPlus, fs }) => {
  PlusMinusField.propTypes = {
    onMinus: PropTypes.func,
    num: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPlus: PropTypes.func,
    fs: PropTypes.number,
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <Button
        variant="outline-dark"
        className="p-1 rounded-circle d-flex align-items-center justify-content-center"
        onClick={onMinus}
      >
        <HiMinus size={20} />
      </Button>
      <div className={`fs-${fs}`}>{num}</div>
      <Button
        variant="outline-dark"
        className="p-1 rounded-circle d-flex align-items-center justify-content-center"
        onClick={onPlus}
      >
        <HiPlus size={20} />
      </Button>
    </div>
  );
};

export default PlusMinusField;
