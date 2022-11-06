import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';
import { HiOutlineOfficeBuilding, HiOutlineHome } from 'react-icons/hi';
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { BsBuilding } from 'react-icons/bs';
import PropTypes from 'prop-types';

import { createListing } from '../services/listings';
import { fileToDataUrl } from '../helpers';
import PlusMinusField from './PlusMinusField';

const CreateListingForm = ({ setMyListings }) => {
  CreateListingForm.propTypes = {
    setMyListings: PropTypes.func,
  };

  const [validated, setValidated] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [pricePerNight, setPricePerNight] = React.useState('');
  const [activePropertyTypeBtn, setActivePropertyTypeBtn] =
    React.useState('House');
  const [numBathrooms, setNumBathrooms] = React.useState(1);
  const [bedrooms, setBedrooms] = React.useState([1]);
  const [amenities, setAmenities] = React.useState({
    essentials: [],
    features: [],
    location: [],
    safety: [],
  });
  const [showMoreAmenitiesActive, setShowMoreAmenitiesActive] =
    React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      createListing(
        title,
        {
          street,
          city,
          state,
          postcode,
          country,
        },
        pricePerNight,
        thumbnail,
        {
          propertyType: activePropertyTypeBtn,
          numBathrooms,
          bedrooms,
          amenities,
        }
      )
        .then((response) => {
          // console.log(response.data.listingId);
          handleClose();
          setMyListings((curr) => [
            {
              thumbnail,
              title,
              avgRating: 0,
              propertyType: activePropertyTypeBtn,
              pricePerNight,
              numBeds: bedrooms.reduce((a, b) => a + b, 0),
              numBathrooms,
              numReviews: 0,
            },
            ...curr,
          ]);
          toast.success(`Created listing: ${title}!`);
        })
        .catch((error) => toast.error(error.response.data.error));
    } else {
      toast.error('Please fill in all required fields');
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate('..');
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
    <Modal show={true} onHide={handleClose} size="lg" centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Thumbnail preview */}
          {thumbnail && (
            <div className="mb-3 text-center">
              <img
                src={thumbnail}
                alt="Listing thumbnail preview"
                className="w-50 h-100"
              />
            </div>
          )}

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
          <Form.Group controlId="thumbnail">
            <Form.Label>Thumbnail</Form.Label>
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
              required
            />
          </Form.Group>

          <h4 className="mt-4">Location</h4>

          {/* Street field */}
          <FloatingLabel
            className="mb-2"
            controlId="street"
            label="Street address"
          >
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
                placeholder="Price per night"
                value={pricePerNight}
                onChange={(e) => {
                  setPricePerNight(e.target.value);
                }}
                required
              />
            </FloatingLabel>
          </InputGroup>

          {/* Property type buttons */}
          <h5>Property type</h5>
          <div className="d-flex gap-3 mb-3">
            <Button
              variant="outline-dark"
              className="d-flex flex-column fw-bold"
              style={{ width: '25%' }}
              active={activePropertyTypeBtn === 'House'}
              onClick={(_) => setActivePropertyTypeBtn('House')}
            >
              <HiOutlineHome size={30} className="mb-3" />
              House
            </Button>
            <Button
              variant="outline-dark"
              className="d-flex flex-column fw-bold"
              style={{ width: '25%' }}
              active={activePropertyTypeBtn === 'Apartment'}
              onClick={(_) => setActivePropertyTypeBtn('Apartment')}
            >
              <BsBuilding size={30} className="mb-3" />
              Apartment
            </Button>
            <Button
              variant="outline-dark"
              className="d-flex flex-column fw-bold"
              style={{ width: '25%' }}
              active={activePropertyTypeBtn === 'Guesthouse'}
              onClick={(_) => setActivePropertyTypeBtn('Guesthouse')}
            >
              <HiOutlineHomeModern size={30} className="mb-3" />
              Guesthouse
            </Button>
            <Button
              variant="outline-dark"
              className="d-flex flex-column fw-bold"
              style={{ width: '25%' }}
              active={activePropertyTypeBtn === 'Hotel'}
              onClick={(_) => setActivePropertyTypeBtn('Hotel')}
            >
              <HiOutlineOfficeBuilding size={30} className="mb-3" />
              Hotel
            </Button>
          </div>

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
                  <span>Bedroom {idx + 1}</span>

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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateListingForm;
