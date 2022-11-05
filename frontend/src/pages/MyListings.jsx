import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const MyListings = ({ token, setToken }) => {
  MyListings.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <div>My Listings</div>
      <Outlet />
    </>
  );
};

export default MyListings;
