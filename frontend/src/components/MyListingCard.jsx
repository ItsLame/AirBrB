import React from 'react';
import Card from 'react-bootstrap/Card';
import { IoMdBed } from 'react-icons/io';
import { FaToilet } from 'react-icons/fa';
import PropTypes from 'prop-types';

const MyListingCard = ({
  thumbnail,
  title,
  avgRating,
  propertyType,
  pricePerNight,
  numBeds,
  numBathrooms,
  numReviews,
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
  };

  return (
    <Card border="dark" className="h-100 overflow-auto">
      {/* Listing thumbnail */}
      <Card.Img
        variant="top"
        src={thumbnail}
        alt="My listing thumbnail"
        style={{
          height: '200px',
          objectFit: 'cover',
        }}
      ></Card.Img>

      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {/* Listing title */}
          <span>{title}</span>
          {/* Average review */}
          {numReviews !== 0 && (
            <span className="fw-normal fs-6 d-flex align-items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              <span>{avgRating}</span>
            </span>
          )}
        </Card.Title>

        <Card.Subtitle className="text-muted mb-2">
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
          {/* Number of reviews */}
          <span className="text-muted">
            {numReviews !== 0
              ? (
              <u>
                {numReviews} review{numReviews === 1 ? '' : 's'}
              </u>
                )
              : (
              <u>No reviews yet!</u>
                )}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MyListingCard;
