import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillStarFill } from 'react-icons/bs';
// import { MdRateReview } from 'react-icons/md';
// import { MdOutlineRateReview } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ListingCard = ({
  title,
  street,
  city,
  state,
  country,
  price,
  reviews,
  thumbnail,
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
            // src="https://a0.muscache.com/im/pictures/miso/Hosting-54380902/original/9dc52173-f50d-47e5-b5d9-3c072ad7d40c.jpeg?im_w=960"
            src={thumbnail}
            style={{
              // width: '100%',
              // height: '13rem',
              height: '200px',
              objectFit: 'cover',
            }}
            alt={`${title} thumbnail`}
            className="bg-info"
          />
          <Card.Body>
            <Container className="d-flex p-0">
              <Card.Title
                className="mt-2 flex-grow-1"
                style={{
                  width: '0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {title}
              </Card.Title>
              <Card.Text className="d-flex gap-1 align-items-center w22">
                <BsFillStarFill />
                <span>{`0.00 (${reviews})`}</span>
                {/* <MdRateReview size={20} /> */}
                {/* <MdOutlineRateReview size={20} /> */}
                {/* <span>{`${reviews}`}</span> */}
              </Card.Text>
            </Container>
            <Card.Text className="d-flex flex-column">
              <span>{street}</span>
              <span>
                {city}, {state}, {country}
              </span>
              <span>${price} per night</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Button>
    </>
  );
};

export default ListingCard;
