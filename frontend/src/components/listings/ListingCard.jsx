import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';

import { StarRating } from '../StyledComponents';

const ListingCard = ({
  listingId,
  title,
  street,
  city,
  state,
  country,
  pricePerNight,
  numReviews,
  avgRating,
  thumbnail,
  numBeds,
  numBathrooms,
  accepted,
}) => {
  ListingCard.propTypes = {
    listingId: PropTypes.number,
    title: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    pricePerNight: PropTypes.number,
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    thumbnail: PropTypes.string,
    numBeds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numBathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accepted: PropTypes.bool,
    // reviews: PropTypes.array,
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <Card
      border="dark"
      className="h-100 overflow-auto"
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.classList.add('bg-dark');
        e.currentTarget.classList.add('text-light');
        e.currentTarget.classList.remove('border-dark');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.classList.remove('bg-dark');
        e.currentTarget.classList.remove('text-light');
        e.currentTarget.classList.add('border-dark');
      }}
      style={{ cursor: 'pointer', transition: 'all 0.1s ease-in' }}
    >
      <Card.Img
        variant="top"
        src={thumbnail}
        alt={`Thumbnail for listing ${title}`}
        style={{
          height: '200px',
          objectFit: 'cover',
        }}
      />

      <Card.Body className="d-flex flex-column align-items-start">
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

        <Container className="d-flex gap-1 p-0 mb-2 align-items-start">
          <Card.Title
            className="flex-grow-1 m-0"
            style={{
              width: '0',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Card.Title>
          <StarRating avgRating={avgRating} numReviews={numReviews} />
        </Container>

        <Card.Subtitle className="d-flex flex-column mb-2 text-muted">
          <span>
            {city}, {state}, {country}
          </span>
          <span>{street}</span>
        </Card.Subtitle>

        <Card.Text className="mt-auto mb-0 fst-italic d-flex w-100">
          <span className="flex-grow-1">
            <u>${pricePerNight.toFixed(2)} per night</u>
          </span>
          <span className="d-flex gap-2">
            <span>
              {numBeds} <IoMdBed size={25} />
            </span>
            <span>
              {numBathrooms} <FaToilet size={17} />
            </span>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
