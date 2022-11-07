import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { publishListing } from '../services/listings';

const PublishListingForm = ({ myListings, setMyListings }) => {
  PublishListingForm.propTypes = {
    myListings: PropTypes.array,
    setMyListings: PropTypes.func,
  };

  const navigate = useNavigate();
  const { listingId } = useParams();
  const [availability, setAvailability] = React.useState([
    { start: '', end: '' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if listing exists (only fails if user manually navigates to url)
    if (
      myListings.filter((listing) => listing.id === parseInt(listingId, 10))
        .length === 0
    ) {
      handleClose();
      toast.error('That listing does not exist!');
      return;
    }

    // check if listing exists and is unpublished (only fails if user manually navigates to url)
    if (
      myListings.filter(
        (listing) =>
          !listing.published && listing.id === parseInt(listingId, 10)
      ).length === 0
    ) {
      handleClose();
      toast.error('That listing is already published!');
      return;
    }

    if (event.currentTarget.checkValidity()) {
      let prevEnd = null;

      for (const dateRange of availability) {
        // for all date ranges check if the date is in the past
        if (
          isDateInThePast(dateRange.start) ||
          isDateInThePast(dateRange.end)
        ) {
          toast.error('A listing cannot have availabilities in the past');
          return;
        }

        // for all date ranges check if start is after end
        if (new Date(dateRange.start) > new Date(dateRange.end)) {
          toast.error('Start dates cannot be after end dates');
          return;
        }

        // for all date ranges check if the end of the previous daterange is >= the start date of the current daterange
        if (
          prevEnd !== null &&
          new Date(prevEnd) >= new Date(dateRange.start)
        ) {
          toast.error(
            'Availabilities must be entered in chronological order with no overlaps'
          );
          return;
        }

        prevEnd = dateRange.end;
      }

      // publish the listing if no early returns
      publishListing(listingId, availability)
        .then((_) => {
          handleClose();
          setMyListings((curr) =>
            curr.map((listing) => {
              if (listing.id === parseInt(listingId, 10)) {
                listing.published = true;
              }
              return listing;
            })
          );
          toast.success('Published listing!');
        })
        .catch((error) => console.error(error));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleClose = () => {
    navigate('..');
  };

  // check if a given date is in the past
  const isDateInThePast = (date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj < now;
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Form noValidate onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Publish your listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Select availabilities</h5>
          <h6 className="mb-4 text-muted">
            Must be in the future and in chronological order
          </h6>

          {/* Availability input fields */}
          {availability.map((dateRange, idx) => {
            return (
              <div key={idx}>
                <Row className="g-2 mb-2 mx-1 d-flex align-items-center justify-content-center">
                  <Col md>
                    <FloatingLabel
                      controlId={`start-${idx}`}
                      label="Start date"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Start date"
                        value={dateRange.start}
                        onChange={(e) => {
                          const newAvailability = [...availability];
                          newAvailability[idx].start = e.target.value;
                          setAvailability(newAvailability);
                        }}
                        required
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md>
                    <FloatingLabel controlId={`end-${idx}`} label="End date">
                      <Form.Control
                        type="date"
                        placeholder="End date"
                        value={dateRange.end}
                        onChange={(e) => {
                          const newAvailability = [...availability];
                          newAvailability[idx].end = e.target.value;
                          setAvailability(newAvailability);
                        }}
                        required
                      />
                    </FloatingLabel>
                  </Col>

                  <Col xs="auto">
                    <Button
                      variant="outline-dark"
                      disabled={idx === 0}
                      className="px-2 py-1"
                      onClick={() => {
                        setAvailability((curr) =>
                          curr.filter((_, i) => i !== idx)
                        );
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>

                <div className="mb-3 text-center">
                  {/* Error message if dates are in the past */}
                  {(isDateInThePast(dateRange.start) ||
                    isDateInThePast(dateRange.end)) && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      Date(s) cannot be in the past
                    </Form.Control.Feedback>
                  )}

                  {/* Error message if start date is after end date */}
                  {new Date(dateRange.start) > new Date(dateRange.end) && (
                    <Form.Control.Feedback type="invalid" className="d-block">
                      Start date cannot be after end date
                    </Form.Control.Feedback>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add availability button */}
          <div className="text-center mt-3">
            <Button
              variant="dark"
              onClick={() =>
                setAvailability((curr) => [...curr, { start: '', end: '' }])
              }
            >
              Add more
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type="submit">
            Publish
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PublishListingForm;
