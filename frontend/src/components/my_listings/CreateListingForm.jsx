import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { createListing } from '../../services/listings';
import MyListingFormModalBody from './MyListingFormModalBody';

const CreateListingForm = ({ setMyListings }) => {
  CreateListingForm.propTypes = {
    setMyListings: PropTypes.func,
  };

  const [validated, setValidated] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [thumbnailToggle, setThumbnailToggle] =
    React.useState('thumbnailImage');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [pricePerNight, setPricePerNight] = React.useState(0);
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
      const lastUpdatedAt = new Date().toISOString();
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
          lastUpdatedAt,
        }
      )
        .then((response) => {
          handleClose();
          setMyListings((curr) => [
            {
              id: parseInt(response.data.listingId, 10),
              thumbnail,
              title,
              avgRating: 0,
              propertyType: activePropertyTypeBtn,
              pricePerNight,
              numBeds: bedrooms.reduce((a, b) => a + b, 0),
              numBathrooms,
              numReviews: 0,
              reviews: [],
              lastUpdatedAt,
              published: false,
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

  return (
    <Modal show={true} onHide={handleClose} size="lg" centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MyListingFormModalBody
            title={title}
            setTitle={setTitle}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            thumbnailToggle={[thumbnailToggle, setThumbnailToggle]}
            street={street}
            setStreet={setStreet}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            postcode={postcode}
            setPostcode={setPostcode}
            country={country}
            setCountry={setCountry}
            pricePerNight={pricePerNight}
            setPricePerNight={setPricePerNight}
            activePropertyTypeBtn={activePropertyTypeBtn}
            setActivePropertyTypeBtn={setActivePropertyTypeBtn}
            numBathrooms={numBathrooms}
            setNumBathrooms={setNumBathrooms}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            amenities={amenities}
            setAmenities={setAmenities}
            showMoreAmenitiesActive={showMoreAmenitiesActive}
            setShowMoreAmenitiesActive={setShowMoreAmenitiesActive}
            thumbnailRequired={true}
          />
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
