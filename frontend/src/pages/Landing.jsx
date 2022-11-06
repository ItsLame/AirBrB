import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getListings } from '../services/listings';

const Landing = ({ token, setToken }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  const [listings, setListings] = React.useState([]);

  React.useEffect(() => {
    getListings().then((response) => {
      // temporary list
      let tempMap = [];

      // map to list
      tempMap = response.data.listings.map((x) => (
        <Col key={x.title}>
          <ListingCard
            title={x.title}
            street={x.address.street}
            city={x.address.city}
            state={x.address.state}
            country={x.address.country}
            price={x.price}
            reviews={x.reviews.length}
            thumbnail={x.thumbnail}
          />
        </Col>
      ));

      // sort alphabetically
      tempMap = tempMap.sort((a, b) =>
        a.props.children.props.title > b.props.children.props.title ? 1 : -1
      );

      // set temporary list to listings
      setListings(tempMap);
    });
  }, []);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} xxl={4} className="g-4 h-100">
          {listings}
        </Row>
      </Container>
      <Outlet />
    </>
  );
};

export default Landing;
