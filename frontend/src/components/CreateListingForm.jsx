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

// import { createListing } from '../services/listings';
import { fileToDataUrl } from '../helpers';

const CreateListingForm = () => {
  const [validated, setValidated] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [pricePerNight, setPricePerNight] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      //
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate('..');
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add a listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Thumbnail preview */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Listing thumbnail preview"
              className="mb-3 w-100 h-100"
            />
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
          <Form.Group controlId="thumbnail" className="mb-4">
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

          <h5>Location</h5>

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

          <h5>Details</h5>

          {/* Price per night field */}
          <InputGroup>
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
