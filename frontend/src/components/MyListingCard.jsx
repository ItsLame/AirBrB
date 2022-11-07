import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { StarRating } from './StyledComponents';

const MyListingCard = ({
  thumbnail,
  title,
  avgRating,
  propertyType,
  pricePerNight,
  numBeds,
  numBathrooms,
  numReviews,
  createdAt,
  published,
}) => {
  MyListingCard.propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    propertyType: PropTypes.string,
    pricePerNight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numBeds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numBathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    published: PropTypes.bool,
  };

  return (
    <Card border="dark" className="h-100 overflow-auto">
      {/* Listing thumbnail */}
      <Card.Img
        variant="top"
        src={thumbnail}
        alt={`Thumbnail for listing ${title}`}
        style={{
          height: '200px',
          objectFit: 'cover',
        }}
      ></Card.Img>

      <Card.Body>
        <Badge bg={published ? 'success' : 'danger'} className="mb-1">
          {published ? 'P' : 'Not p'}ublished
        </Badge>

        <Container className="d-flex p-0 mb-2">
          {/* Listing title */}
          <Card.Title
            className="flex-grow-1 m-0"
            style={{
              width: '0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Card.Title>
          {/* Average review */}
          <StarRating ratings={avgRating} reviews={numReviews} />
        </Container>

        <Card.Subtitle className="mb-2">
          {/* Property type */}
          <span>{propertyType}</span>
          {/* Price per night */}
          <span className="fw-normal fst-italic">
            —${pricePerNight} per night
          </span>
        </Card.Subtitle>

        <Card.Text>
          {/* Number of beds and bathrooms */}
          <span>
            {numBeds} <IoMdBed size={25} /> {numBathrooms}{' '}
            <FaToilet size={18} />
          </span>
          <br />
          <span className="text-muted fst-italic" style={{ fontSize: '8pt' }}>
            Created at {new Date(createdAt).toLocaleTimeString()} on{' '}
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyListingCard;