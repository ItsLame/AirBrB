import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';

import StarRating from '../reviews/StarRating';
import { currencyFormatter } from '../../helpers';

const ListingCard = ({
  listingId,
  title,
  street,
  city,
  state,
  country,
  pricePerNight,
  reviews,
  numReviews,
  avgRating,
  thumbnail,
  numBeds,
  numBathrooms,
  bookings,
  owner,
  email,
}) => {
  ListingCard.propTypes = {
    listingId: PropTypes.number,
    title: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    pricePerNight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    reviews: PropTypes.array,
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    thumbnail: PropTypes.string,
    numBeds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numBathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bookings: PropTypes.array,
    owner: PropTypes.string,
    email: PropTypes.string,
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      owner === email ? `/my_listing/${listingId}` : `/listing/${listingId}`
    );
  };

  const handleFocus = (e) => {
    e.currentTarget.classList.add('bg-dark');
    e.currentTarget.classList.add('text-light');
    e.currentTarget.classList.remove('border-dark');
  };

  const handleBlur = (e) => {
    e.currentTarget.classList.remove('bg-dark');
    e.currentTarget.classList.remove('text-light');
    e.currentTarget.classList.add('border-dark');
  };

  return (
    <Card
      tabIndex={0}
      border="dark"
      className="h-100 overflow-auto position-relative"
      onClick={handleClick}
      onMouseOver={handleFocus}
      onFocus={handleFocus}
      onMouseLeave={handleBlur}
      onBlur={handleBlur}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
      }}
      style={{ cursor: 'pointer', transition: 'all 0.1s ease-in' }}
    >
      <div className="d-flex flex-wrap gap-1 position-absolute top-0 left-0 ms-2 mt-2">
        {owner === email && <Badge bg="secondary">Your listing</Badge>}

        {(() => {
          const numAccepted = bookings.filter(
            (booking) => booking.status === 'accepted'
          ).length;
          if (numAccepted !== 0) {
            return (
              <Badge bg="success">
                Accepted{numAccepted > 1 && ` (${numAccepted})`}
              </Badge>
            );
          }
        })()}
        {(() => {
          const numPending = bookings.filter(
            (booking) => booking.status === 'pending'
          ).length;
          if (numPending !== 0) {
            return (
              <Badge bg="primary">
                Pending{numPending > 1 && ` (${numPending})`}
              </Badge>
            );
          }
        })()}
        {(() => {
          const numDeclined = bookings.filter(
            (booking) => booking.status === 'declined'
          ).length;
          if (numDeclined !== 0) {
            return (
              <Badge bg="danger">
                Declined{numDeclined > 1 && ` (${numDeclined})`}
              </Badge>
            );
          }
        })()}
      </div>

      {thumbnail.split('.')[1] === 'youtube'
        ? (
        <ReactPlayer url={thumbnail} width="100%" height="200px" />
          )
        : (
        <Card.Img
          variant="top"
          src={thumbnail}
          alt={`Thumbnail for listing ${title}`}
          style={{
            height: '200px',
            objectFit: 'cover',
          }}
        />
          )}

      <Card.Body className="d-flex flex-column align-items-start">
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
          <StarRating
            reviews={reviews}
            avgRating={avgRating}
            numReviews={numReviews}
          />
        </Container>

        <Card.Subtitle className="d-flex flex-column mb-2 text-muted">
          <span>
            {city}, {state}, {country}
          </span>
          <span>{street}</span>
        </Card.Subtitle>

        <Card.Text className="mt-auto mb-0 d-flex w-100">
          <span className="flex-grow-1 fst-italic">
            <u>{currencyFormatter.format(pricePerNight)} per night</u>
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
