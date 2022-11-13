import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { StarRating } from '../StyledComponents';
import { deleteListing } from '../../services/listings';

const MyListingCard = ({
  listingId,
  thumbnail,
  title,
  avgRating,
  propertyType,
  pricePerNight,
  numBeds,
  numBathrooms,
  numReviews,
  lastUpdatedAt,
  published,
  setMyListings,
}) => {
  MyListingCard.propTypes = {
    listingId: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    propertyType: PropTypes.string,
    pricePerNight: PropTypes.number,
    numBeds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numBathrooms: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    numReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lastUpdatedAt: PropTypes.string,
    published: PropTypes.bool,
    setMyListings: PropTypes.func,
  };

  const navigate = useNavigate();

  // Delete this listing
  const deleteMyListing = () => {
    deleteListing(listingId)
      .then((_) => {
        setMyListings((curr) =>
          curr.filter((listing) => listing.id !== listingId)
        );
        toast.success(`Deleted listing: ${title}!`);
      })
      .catch((error) => console.error(error));
  };

  // Confirm delete popover
  const confirmDelete = (
    <Popover id="confirm-delete-popover">
      <Popover.Body className="d-flex gap-2 align-items-center">
        Are you sure?
        <Button
          className="py-0 px-2"
          style={{ fontSize: '11pt' }}
          variant="danger"
          onClick={() => {
            deleteMyListing();
            document.body.click();
          }}
        >
          Delete
        </Button>
      </Popover.Body>
    </Popover>
  );

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
      />

      <Card.Body className="d-flex flex-column align-items-start">
        <Badge bg={published ? 'success' : 'danger'} className="mb-1">
          {published ? 'P' : 'Not p'}ublished
        </Badge>

        <Container className="d-flex gap-1 p-0 mb-2 align-items-start">
          {/* Listing title */}
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
          {/* Average review */}
          <StarRating avgRating={avgRating} numReviews={numReviews} />
        </Container>

        <Card.Subtitle className="mb-2">
          {/* Property type */}
          <span>{propertyType}</span>
          {/* Price per night */}
          <span className="fw-normal fst-italic">
            —${pricePerNight.toFixed(2)} per night
          </span>
        </Card.Subtitle>

        <Card.Text className="mt-auto mb-0">
          {/* Number of beds and bathrooms */}
          <span>
            {numBeds} <IoMdBed size={25} /> {numBathrooms}{' '}
            <FaToilet size={18} />
          </span>
          <br />
          <span className="text-muted fst-italic" style={{ fontSize: '8pt' }}>
            Last updated at {new Date(lastUpdatedAt).toLocaleTimeString()} on{' '}
            {new Date(lastUpdatedAt).toLocaleDateString()}
          </span>
        </Card.Text>
      </Card.Body>

      <Card.Footer className="d-flex gap-2">
        {/* Delete button */}
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={confirmDelete}
          rootClose
          rootCloseEvent="click"
        >
          <Button
            className="py-0 px-2"
            style={{ fontSize: '11pt' }}
            variant="outline-danger"
          >
            Delete
          </Button>
        </OverlayTrigger>

        {/* Edit button */}
        <span className="flex-grow-1"></span>
        <Button
          className="py-0 px-2"
          style={{ fontSize: '11pt' }}
          variant="outline-primary"
          onClick={() => navigate(`edit/${listingId}`)}
        >
          Edit
        </Button>

        {/* Publish button */}
        {!published && (
          <Button
            className="py-0 px-2"
            style={{ fontSize: '11pt' }}
            variant="outline-success"
            onClick={() => navigate(`publish/${listingId}`)}
          >
            Publish
          </Button>
        )}

        {/* Unpublish button */}
        {published && (
          <Button
            className="py-0 px-2"
            style={{ fontSize: '11pt' }}
            variant="outline-secondary"
          >
            Unpublish
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default MyListingCard;
