import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const Landing = ({ token, setToken }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <div>Landing</div>
      <Outlet />
    </>
  );
};

export default Landing;
