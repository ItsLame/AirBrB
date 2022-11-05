import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { HiPlusCircle } from 'react-icons/hi';

import Navbar from '../components/Navbar';

const MyListings = ({ token, setToken }) => {
  MyListings.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  const navigate = useNavigate();

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <main className="container d-flex mt-5 flex-wrap justify-content-between ">
        <Card
          border="light"
          style={{ width: '300px' }}
          className="mb-4"
          onClick={() => navigate('create')}
        >
          <Button variant="outline-dark" className="w-100 h-100">
            <Card.Title>Add a listing</Card.Title>
            <HiPlusCircle size={30} />
          </Button>
        </Card>

        <Card style={{ width: '300px' }} className="mb-4">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '300px' }} className="mb-4">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '300px' }} className="mb-4">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the cards content.
            </Card.Text>
          </Card.Body>
        </Card>
      </main>
      <Outlet />
    </>
  );
};

export default MyListings;
