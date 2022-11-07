import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { updateListing, getListing } from '../../services/listings';
import MyListingFormModalBody from './MyListingFormModalBody';

const EditListingForm = ({ myListings, setMyListings }) => {
  EditListingForm.propTypes = {
    myListings: PropTypes.array,
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
  const { listingId } = useParams();

  React.useEffect(() => {
    // check if listing exists (only fails if user manually navigates to url)
    if (
      myListings.filter((listing) => listing.id === parseInt(listingId, 10))
        .length === 0
    ) {
      handleClose();
      toast.error('That listing does not exist!');
      return;
    }

    getListing(listingId)
      .then((response) => {
        const listing = response.data.listing;
        setTitle(listing.title);
        setThumbnail(listing.thumbnail);
        setStreet(listing.address.street);
        setCity(listing.address.city);
        setState(listing.address.state);
        setPostcode(listing.address.street);
        setCountry(listing.address.street);
        setPricePerNight(listing.price);
        setActivePropertyTypeBtn(listing.metadata.propertyType);
        setNumBathrooms(listing.metadata.numBathrooms);
        setBedrooms(listing.metadata.bedrooms);
        setAmenities(listing.metadata.amenities);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      const lastUpdatedAt = new Date().toISOString();
      updateListing(
        listingId,
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
        .then((_) => {
          handleClose();
          setMyListings((curr) => {
            // get old listing
            const oldListing = curr.find(
              (listing) => listing.id === parseInt(listingId, 10)
            );

            // remove edited listings
            const newListings = curr.filter(
              (listing) => listing.id !== oldListing.id
            );

            // append edited listing to start (since it is most recently updated)
            return [
              {
                id: oldListing.id,
                thumbnail,
                title,
                avgRating: oldListing.avgRating,
                propertyType: activePropertyTypeBtn,
                pricePerNight,
                numBeds: bedrooms.reduce((a, b) => a + b, 0),
                numBathrooms,
                numReviews: oldListing.numReviews,
                lastUpdatedAt,
                published: oldListing.published,
              },
              ...newListings,
            ];
          });
          toast.success(`Updated listing: ${title}!`);
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
          <Modal.Title>Edit your listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MyListingFormModalBody
            title={title}
            setTitle={setTitle}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
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
            thumbnailRequired={false}
          />

          {/* <Form.Group controlId="thumbnail">
            <Form.Label>Thumbnail</Form.Label>
            <Form.Control
              type="file"
              //   onChange={(e) => {
              //     fileToDataUrl(e.target.files[0])
              //       .then((result) => setThumbnail(result))
              //       .catch((error) => {
              //         e.target.value = null;
              //         setThumbnail('');
              //         toast.error(error.message);
              //       });
              //   }}
              //   required={thumbnailRequired}
            />
          </Form.Group> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditListingForm;
