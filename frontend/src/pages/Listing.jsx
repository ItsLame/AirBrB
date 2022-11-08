import React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import Navbar from '../components/Navbar';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Listing = ({ token, setToken, setAppEmail }) => {
  Listing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const { listingId } = useParams();

  return (
    <>
      {token === '' && (
        <Routes>
          <Route
            path="login"
            element={
              <LoginForm setToken={setToken} setAppEmail={setAppEmail} />
            }
          />
          <Route
            path="register"
            element={
              <RegisterForm setToken={setToken} setAppEmail={setAppEmail} />
            }
          />
        </Routes>
      )}

      {/* Navbar */}
      <Navbar token={token} setToken={setToken} setAppEmail={setAppEmail} />

      {/* Main content */}
      <Container className="my-5">
        <div>
          {listingId} + {token}
        </div>
      </Container>
    </>
  );
};

export default Listing;
