import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { HiOutlineOfficeBuilding, HiOutlineHome } from 'react-icons/hi';
import { FaHouseUser } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { toast } from 'react-toastify';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactPlayer from 'react-player/youtube';

import { fileToDataUrl } from '../../helpers';
import PlusMinusField from './PlusMinusField';

const MyListingFormModalBody = ({
  title,
  setTitle,
  thumbnail,
  setThumbnail,
  thumbnailToggle,
  street,
  setStreet,
  city,
  setCity,
  state,
  setState,
  postcode,
  setPostcode,
  country,
  setCountry,
  pricePerNight,
  setPricePerNight,
  activePropertyTypeBtn,
  setActivePropertyTypeBtn,
  numBathrooms,
  setNumBathrooms,
  bedrooms,
  setBedrooms,
  amenities,
  setAmenities,
  showMoreAmenitiesActive,
  setShowMoreAmenitiesActive,
  thumbnailRequired,
}) => {
  MyListingFormModalBody.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
    thumbnail: PropTypes.string,
    setThumbnail: PropTypes.func,
    thumbnailToggle: PropTypes.array,
    street: PropTypes.string,
    setStreet: PropTypes.func,
    city: PropTypes.string,
    setCity: PropTypes.func,
    state: PropTypes.string,
    setState: PropTypes.func,
    postcode: PropTypes.string,
    setPostcode: PropTypes.func,
    country: PropTypes.string,
    setCountry: PropTypes.func,
    pricePerNight: PropTypes.number,
    setPricePerNight: PropTypes.func,
    activePropertyTypeBtn: PropTypes.string,
    setActivePropertyTypeBtn: PropTypes.func,
    numBathrooms: PropTypes.number,
    setNumBathrooms: PropTypes.func,
    bedrooms: PropTypes.array,
    setBedrooms: PropTypes.func,
    amenities: PropTypes.object,
    setAmenities: PropTypes.func,
    showMoreAmenitiesActive: PropTypes.bool,
    setShowMoreAmenitiesActive: PropTypes.func,
    thumbnailRequired: PropTypes.bool,
  };

  // Amenity checkbox component
  const AmenityCheck = ({ type, amenity }) => {
    AmenityCheck.propTypes = {
      type: PropTypes.string,
      amenity: PropTypes.string,
    };

    return (
      <Form.Check
        type="checkbox"
        id={`amenities-${amenity}`}
        label={amenity}
        onChange={() => handleAmenitiesChange(type, amenity)}
        checked={isAmenityChecked(type, amenity)}
      />
    );
  };

  // Update amenities state given a particular amenity
  const handleAmenitiesChange = (amenityType, amenity) => {
    setAmenities({
      ...amenities,
      [amenityType]: isAmenityChecked(amenityType, amenity)
        ? amenities[amenityType].filter((a) => a !== amenity)
        : [...amenities[amenityType], amenity],
    });
  };

  // Is a particular amenity selected
  const isAmenityChecked = (amenityType, amenity) =>
    amenities[amenityType].includes(amenity);

  return (
    <>
      {/* Thumbnail preview */}
      <div className="mb-3 text-center">
        {thumbnail
          ? (
              thumbnail.split('.')[1] === 'youtube'
                ? (
            <ReactPlayer url={thumbnail} width="100%" height="300px" />
                  )
                : (
            <img
              src={thumbnail}
              alt="Listing thumbnail preview"
              className="w-100 h-100"
            />
                  )
            )
          : (
          <div
            className="d-flex border border-secondary text-secondary align-items-center justify-content-center"
            style={{ height: '300px' }}
          >
            Thumbnail Preview
          </div>
            )}
      </div>

      {/* Title field */}
      <FloatingLabel className="mb-2" controlId="title" label="Title">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
      </FloatingLabel>

      {/* Thumbnail field */}
      <h4 className="mt-4">Thumbnail</h4>
      {/* <Form.Group controlId="thumbnail"> */}
      <Form.Group>
        {/* <Form.Label>Thumbnail</Form.Label> */}
        {/* Thumbnail: image toggle button */}
        <ButtonGroup className="mb-2">
          <Button
            variant="outline-dark"
            className="d-flex align-items-center"
            active={thumbnailToggle[0] === 'thumbnailImage'}
            onClick={() => thumbnailToggle[1]('thumbnailImage')}
          >
            Image
          </Button>
          {/* Thumbnail: youtube toggle button */}
          <Button
            variant="outline-dark"
            className="d-flex align-items-center"
            active={thumbnailToggle[0] === 'thumbnailYouTube'}
            onClick={() => thumbnailToggle[1]('thumbnailYouTube')}
          >
            YouTube
          </Button>
        </ButtonGroup>
        {/* Thumbnail: upload image / youtube link field */}
        {thumbnailToggle[0] === 'thumbnailImage'
          ? (
          <Form.Control
            type="file"
            onChange={(e) => {
              fileToDataUrl(e.target.files[0])
                .then((result) => setThumbnail(result))
                .catch((error) => {
                  e.target.value = null;
                  setThumbnail('');
                  toast.error(error.message);
                });
            }}
            required={thumbnailRequired}
          />
            )
          : (
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
              https://youtube.com/v?=
            </InputGroup.Text>
            <Form.Control id="basic-url" aria-describedby="basic-addon3" />
          </InputGroup>
            )}
      </Form.Group>

      <h4 className="mt-4">Location</h4>

      {/* Street field */}
      <FloatingLabel className="mb-2" controlId="street" label="Street address">
        <Form.Control
          type="text"
          placeholder="Street address"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          required
        />
      </FloatingLabel>

      <Row className="g-2 mb-2">
        {/* City field */}
        <Col md>
          <FloatingLabel controlId="city" label="City">
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            />
          </FloatingLabel>
        </Col>

        {/* State field */}
        <Col md>
          <FloatingLabel controlId="state" label="State">
            <Form.Control
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="g-2 mb-4">
        {/* Postcode field */}
        <Col md>
          <FloatingLabel controlId="postcode" label="Postcode">
            <Form.Control
              type="number"
              step="1"
              min="0"
              pattern="\d+"
              placeholder="Postcode"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
              }}
              required
            />
          </FloatingLabel>
        </Col>

        {/* Country field */}
        <Col md>
          <FloatingLabel controlId="country" label="Country">
            <Form.Control
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <h4>Details</h4>

      {/* Price per night field */}
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <FloatingLabel controlId="pricePerNight" label="Price per night">
          <Form.Control
            type="number"
            min="0"
            step="0.01"
            placeholder="Price per night"
            value={pricePerNight}
            onChange={(e) => {
              setPricePerNight(e.target.valueAsNumber);
            }}
            required
          />
        </FloatingLabel>
      </InputGroup>

      {/* Property type buttons */}
      <h5>Property type</h5>
      {/* <div className="d-flex gap-3 mb-3"> */}
      <Row xs={2} sm={2} md={2} lg={4} className="g-3 h-100 mb-3">
        <Col>
          <Button
            variant="outline-dark"
            className="d-flex flex-column fw-bold w-100"
            active={activePropertyTypeBtn === 'House'}
            onClick={(_) => setActivePropertyTypeBtn('House')}
          >
            <HiOutlineHome size={30} className="mb-3" />
            House
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            className="d-flex flex-column fw-bold w-100"
            active={activePropertyTypeBtn === 'Apartment'}
            onClick={(_) => setActivePropertyTypeBtn('Apartment')}
          >
            <BsBuilding size={30} className="mb-3" />
            Apartment
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            className="d-flex flex-column fw-bold w-100"
            active={activePropertyTypeBtn === 'Guesthouse'}
            onClick={(_) => setActivePropertyTypeBtn('Guesthouse')}
          >
            <FaHouseUser size={30} className="mb-3" />
            Guesthouse
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            className="d-flex flex-column fw-bold w-100"
            active={activePropertyTypeBtn === 'Hotel'}
            onClick={(_) => setActivePropertyTypeBtn('Hotel')}
          >
            <HiOutlineOfficeBuilding size={30} className="mb-3" />
            Hotel
          </Button>
        </Col>
      </Row>
      {/* </div> */}

      {/* Number of bathrooms field */}
      <h5>Number of bathrooms</h5>
      <PlusMinusField
        onMinus={(_) => setNumBathrooms(Math.max(1, numBathrooms - 1))}
        num={numBathrooms}
        onPlus={(_) => setNumBathrooms(numBathrooms + 1)}
        fs={4}
      />

      {/* Bedrooms field */}
      <h5>Bedrooms</h5>
      <div className="d-flex flex-column align-items-start justify-content-center gap-2 mb-3">
        {bedrooms.map((bedroom, idx) => {
          return (
            <div key={idx} className="d-flex align-items-center w-100">
              {/* Bedroom number */}
              <span className="text-center">Room {idx + 1}</span>

              {/* Stretched separator */}
              <hr className="mx-3 flex-fill" />

              {/* Setting the number of beds for this bedroom */}
              <PlusMinusField
                onMinus={() =>
                  setBedrooms((curr) =>
                    curr.map((b, i) => {
                      return i === idx ? Math.max(1, b - 1) : b;
                    })
                  )
                }
                num={`${bedroom} bed${bedroom === 1 ? '' : 's'}`}
                onPlus={() =>
                  setBedrooms((curr) =>
                    curr.map((b, i) => {
                      return i === idx ? b + 1 : b;
                    })
                  )
                }
                fs={6}
              />

              {/* Stretched separator */}
              <hr className="mx-3 flex-fill" />

              {/* Remove bedroom button */}
              <Button
                disabled={idx === 0}
                variant="outline-dark"
                onClick={() =>
                  setBedrooms((curr) => curr.filter((_, i) => i !== idx))
                }
              >
                Remove
              </Button>
            </div>
          );
        })}

        {/* Add bedroom button */}
        <Button
          variant="dark"
          onClick={() => setBedrooms((curr) => [...curr, 1])}
        >
          Add bedroom
        </Button>
      </div>

      {/* Amenities field */}
      <h5>Amenities</h5>
      {/* Essentials amenities */}
      <h6>Essentials</h6>
      <Row className="mb-3">
        <Col>
          <AmenityCheck type="essentials" amenity="Wi-Fi" />
          <AmenityCheck type="essentials" amenity="Washing machine" />
          <AmenityCheck type="essentials" amenity="Air conditioning" />
          <AmenityCheck type="essentials" amenity="Dedicated workspace" />
          <AmenityCheck type="essentials" amenity="Hair dryer" />
        </Col>
        <Col>
          <AmenityCheck type="essentials" amenity="Kitchen" />
          <AmenityCheck type="essentials" amenity="Dryer" />
          <AmenityCheck type="essentials" amenity="Heating" />
          <AmenityCheck type="essentials" amenity="TV" />
          <AmenityCheck type="essentials" amenity="Iron" />
        </Col>
      </Row>

      {showMoreAmenitiesActive && (
        <>
          {/* Features amenities */}
          <h6>Features</h6>
          <Row className="mb-3">
            <Col>
              <AmenityCheck type="features" amenity="Pool" />
              <AmenityCheck
                type="features"
                amenity="Free parking on premises"
              />
              <AmenityCheck type="features" amenity="Cot" />
              <AmenityCheck type="features" amenity="BBQ grill" />
              <AmenityCheck type="features" amenity="Indoor fireplace" />
            </Col>
            <Col>
              <AmenityCheck type="features" amenity="Hot tub" />
              <AmenityCheck type="features" amenity="EV charger" />
              <AmenityCheck type="features" amenity="Gym" />
              <AmenityCheck type="features" amenity="Breakfast" />
              <AmenityCheck type="features" amenity="Smoking allowed" />
            </Col>
          </Row>

          {/* Location amenities */}
          <h6>Location</h6>
          <Row className="mb-3">
            <Col>
              <AmenityCheck type="location" amenity="Beachfront" />
            </Col>
            <Col>
              <AmenityCheck type="location" amenity="Waterfront" />
            </Col>
          </Row>

          {/* Safety amenities */}
          <h6>Safety</h6>
          <Row className="mb-3">
            <Col>
              <AmenityCheck type="safety" amenity="Smoke alarm" />
            </Col>
            <Col>
              <AmenityCheck type="safety" amenity="Carbon monoxide alarm" />
            </Col>
          </Row>
        </>
      )}

      <Button
        variant="outline-dark"
        className="py-1 px-2"
        onClick={() => setShowMoreAmenitiesActive(!showMoreAmenitiesActive)}
      >
        Show {showMoreAmenitiesActive ? 'less' : 'more'}
      </Button>
    </>
  );
};

export default MyListingFormModalBody;
