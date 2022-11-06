import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';
// import Container from 'react-bootstrap/Container';

const Landing = ({ token, setToken }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <main className="container d-flex mt-5 flex-wrap justify-content-between">
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        {/* <Container className="d-flex flex-wrap gap-3">
          <div>Landing</div>
          <ListingCardLanding />
        </Container> */}
      </main>
      <Outlet />
    </>
  );
};

export default Landing;
