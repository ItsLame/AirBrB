import React from 'react';
import ReactPlayer from 'react-player';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

const PropertyImageCarousel = ({ title, thumbnail, propertyImages }) => {
  PropertyImageCarousel.propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    propertyImages: PropTypes.array,
  };

  return (
    <Carousel
      className="w-100"
      style={{
        border: '3px solid black',
        borderRadius: '2%',
        overflow: 'hidden',
        height: '400px',
      }}
      interval={null}
    >
      <Carousel.Item>
        {thumbnail.split('.')[1] === 'youtube'
          ? (
          <ReactPlayer
            url={thumbnail}
            width="100%"
            height="395px"
            controls={true}
          />
            )
          : (
          <img
            style={{
              height: '400px',
              objectFit: 'cover',
              objectPosition: '50% 50%',
            }}
            className="d-block w-100"
            src={thumbnail}
            alt={`Thumbnail for listing ${title}`}
          />
            )}
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{
            height: '400px',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
          className="d-block w-100"
          src="https://oranahouse.com/images/home-slider/home-slider_30e7ad12d64c376438cf3fe17ac0e1fd.jpg"
          alt={`Thumbnail for listing ${title}`}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default PropertyImageCarousel;
