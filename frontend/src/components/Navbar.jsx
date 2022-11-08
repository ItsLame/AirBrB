import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BSNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HiSearch, HiUserCircle } from 'react-icons/hi';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { logout } from '../services/auth';

const Navbar = ({ token, setToken, setAppEmail }) => {
  Navbar.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const navigate = useNavigate();

  return (
    <BSNavbar bg="dark" variant="dark" expand="md">
      <Container>
        {/* Logo on left, redirects to landing page */}
        <BSNavbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <svg
            height="30"
            viewBox="0 0 56.7 56.7"
            width="30"
            className="d-inline-block align-top me-2"
            fill="white"
          >
            <path d="M50.3075,38.2082c-0.2454-0.5886-0.4908-1.2267-0.7362-1.7662c-0.3924-0.8831-0.785-1.7175-1.1285-2.5024l-0.0491-0.049  c-3.3855-7.3597-7.0164-14.8179-10.8434-22.1775l-0.1472-0.2946c-0.3926-0.7362-0.7854-1.5211-1.1776-2.3061  c-0.4909-0.883-0.9813-1.8156-1.7666-2.6988c-1.5699-1.9625-3.8269-3.0419-6.2311-3.0419c-2.4534,0-4.6614,1.0794-6.2807,2.9438  c-0.7358,0.8834-1.2757,1.8157-1.7662,2.6988c-0.3926,0.7849-0.7853,1.5701-1.1776,2.306l-0.1472,0.2946  c-3.7783,7.3596-7.4583,14.8179-10.8438,22.1775l-0.0491,0.0982c-0.3432,0.7853-0.7358,1.6193-1.1285,2.5023  c-0.245,0.5396-0.4905,1.1285-0.7358,1.7663c-0.6382,1.8157-0.8341,3.5327-0.589,5.2993c0.5399,3.68,2.9932,6.7711,6.3788,8.145  c1.2757,0.5395,2.6003,0.7849,3.9742,0.7849c0.3926,0,0.8835-0.049,1.2757-0.0982c1.6193-0.1963,3.2874-0.7358,4.9067-1.6684  c2.0116-1.1285,3.9254-2.7475,6.0843-5.1027c2.1589,2.3552,4.1214,3.9742,6.0844,5.1027c1.6189,0.9326,3.2873,1.4721,4.9063,1.6684  c0.3927,0.0491,0.8835,0.0982,1.2757,0.0982c1.374,0,2.7479-0.2454,3.9746-0.7849c3.4346-1.3739,5.8389-4.5141,6.3784-8.145  C51.1416,41.741,50.9452,40.024,50.3075,38.2082z M28.1787,40.7597c-2.6497-3.3364-4.3668-6.4765-4.9558-9.1262  c-0.2454-1.1285-0.2945-2.1097-0.1472-2.9929c0.0982-0.7849,0.3926-1.4721,0.7854-2.0607c0.9321-1.3249,2.502-2.1588,4.3177-2.1588  c1.8153,0,3.4347,0.7849,4.3177,2.1588c0.3927,0.5886,0.6872,1.2757,0.7854,2.0607c0.1469,0.8832,0.0978,1.9135-0.1473,2.9929  C32.5455,34.2341,30.8283,37.3742,28.1787,40.7597z M47.756,43.0658c-0.3436,2.5516-2.0607,4.7595-4.4649,5.7408  c-1.1777,0.4908-2.4534,0.6381-3.7291,0.4908c-1.2267-0.1473-2.4534-0.5399-3.7291-1.2757  c-1.7662-0.9813-3.5324-2.5024-5.5934-4.7594c3.2387-3.9746,5.2011-7.605,5.937-10.8434c0.3436-1.5212,0.3926-2.8951,0.2454-4.1709  c-0.1962-1.2267-0.6381-2.3552-1.3248-3.3364c-1.5212-2.208-4.0723-3.4837-6.9183-3.4837c-2.8456,0-5.3972,1.3249-6.9183,3.4837  c-0.6868,0.9813-1.1285,2.1097-1.3249,3.3364c-0.196,1.2758-0.1473,2.6988,0.2454,4.1709  c0.7359,3.2383,2.7479,6.9179,5.9371,10.8924c-2.0116,2.2571-3.8273,3.7782-5.5935,4.7594  c-1.2757,0.7359-2.5024,1.1285-3.7291,1.2758c-1.3249,0.1469-2.6006-0.0491-3.7291-0.4908  c-2.4043-0.9813-4.1213-3.1893-4.4649-5.7408c-0.1472-1.2266-0.049-2.4534,0.4418-3.8273c0.1473-0.4904,0.3923-0.9813,0.6377-1.5698  c0.3435-0.785,0.7362-1.6193,1.1285-2.4534l0.0491-0.0982c3.3854-7.3106,7.0165-14.7688,10.7947-22.0307l0.1473-0.2941  c0.3922-0.7362,0.7849-1.5212,1.1776-2.2571c0.3922-0.7853,0.834-1.5211,1.3735-2.1588C25.3821,7.2481,26.7556,6.61,28.2768,6.61  s2.8952,0.6381,3.9255,1.8156c0.5395,0.6377,0.9813,1.3736,1.374,2.1588c0.3922,0.7359,0.7849,1.5208,1.1775,2.2571l0.1469,0.2941  c3.7291,7.311,7.36,14.7687,10.7456,22.0797v0.0491c0.3923,0.7849,0.7359,1.6684,1.1285,2.4534  c0.2454,0.5885,0.4905,1.0794,0.6377,1.5698C47.8051,40.5635,47.9524,41.7902,47.756,43.0658z" />
          </svg>
          AirBrB
        </BSNavbar.Brand>

        <BSNavbar.Toggle className="mb-2" aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          {/* Middle nav search bar */}
          <Nav className="m-auto">
            <Form className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search listings"
                className="rounded-5"
              />
              <Button
                type="submit"
                className="position-absolute end-0 top-0 p-0 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  height: 30,
                  width: 30,
                  marginTop: 4,
                  marginRight: 4,
                }}
              >
                <HiSearch size={20} />
              </Button>
            </Form>
          </Nav>

          {/* Right side navbar */}
          <Nav>
            {/* My listings (logged in) or Become a host (logged out) button */}
            {token
              ? (
              <Nav.Link
                style={{ paddingTop: '11px' }}
                onClick={() => navigate('/my_listings')}
              >
                My listings
              </Nav.Link>
                )
              : (
              <Nav.Link
                style={{ paddingTop: '11px' }}
                onClick={() => navigate('register')}
              >
                Become a host
              </Nav.Link>
                )}

            {/* User icon dropdown */}
            {/* If logged in, show log out button, otherwise show log in + register buttons */}
            <NavDropdown title={<HiUserCircle size={30} />} align="end">
              {token
                ? (
                <NavDropdown.Item
                  onClick={() => {
                    logout()
                      .then((_) => {
                        setToken('');
                        setAppEmail('');
                        navigate('/');
                        toast.success('Logged out!');
                      })
                      .catch((error) => console.error(error));
                  }}
                >
                  Log out
                </NavDropdown.Item>
                  )
                : (
                <>
                  <NavDropdown.Item onClick={() => navigate('login')}>
                    Log in
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate('register')}>
                    Register
                  </NavDropdown.Item>
                </>
                  )}
            </NavDropdown>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
