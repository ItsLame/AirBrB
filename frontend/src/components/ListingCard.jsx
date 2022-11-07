import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
// import { BsFillStarFill } from 'react-icons/bs';
// import { MdRateReview } from 'react-icons/md';
// import { MdOutlineRateReview } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';

import { StarRating } from './StyledComponents';

const ListingCard = ({
  title,
  street,
  city,
  state,
  country,
  price,
  reviews,
  thumbnail,
  beds,
  bathrooms,
  accepted,
}) => {
  ListingCard.propTypes = {
    title: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    price: PropTypes.string,
    reviews: PropTypes.number,
    thumbnail: PropTypes.string,
    beds: PropTypes.number,
    bathrooms: PropTypes.number,
    accepted: PropTypes.bool,
    // reviews: PropTypes.array,
  };

  const handleClick = () => {
    console.log(`Click ${title}`);
  };

  return (
    <>
      <Button
        variant="outline-dark"
        className="p-0 text-start h-100 w-100 overflow-auto"
        // className="p-0 text-start w-100 overflow-auto"
        onClick={handleClick}
      >
        <Card className="bg-transparent border-0">
          <Card.Img
            variant="top"
            src={thumbnail}
            alt={`Thumbnail for listing ${title}`}
            style={{
              height: '200px',
              objectFit: 'cover',
            }}
          />

          <Card.Body>
            <span>
              <Badge bg="success" className="mb-1">
                Accepted
              </Badge>
              {/* {accepted === null
                ? null
                : accepted
                  ? (
                <Badge bg="success">Accepted</Badge>
                    )
                  : (
                <Badge bg="secondary">Pending</Badge>
                    )} */}
              {/* <span className="bg-danger">asd</span> */}
            </span>

            <Container className="d-flex p-0 mb-2">
              <Card.Title
                className="flex-grow-1 m-0"
                style={{
                  width: '0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {title}{' '}
              </Card.Title>
              <StarRating ratings={1.23} reviews={reviews} />
            </Container>

            <Card.Subtitle className="d-flex flex-column mb-2 text-muted">
              <span>{street}</span>
              <span>
                {city}, {state}, {country}
              </span>
            </Card.Subtitle>

            <Card.Text className="fst-italic d-flex">
              <span className="flex-grow-1">${price} per night</span>
              <span className="d-flex gap-2">
                <span>
                  {beds} <IoMdBed size={25} />
                </span>
                <span>
                  {bathrooms} <FaToilet size={17} />
                </span>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Button>
    </>
  );
};

export default ListingCard;