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
import { AiOutlineClose } from 'react-icons/ai';

import { publishListing } from '../../services/listings';
import { getTodayDate, formatDate, addOneDay } from '../../helpers';

const PublishListingForm = ({ myListings, setMyListings }) => {
  PublishListingForm.propTypes = {
    myListings: PropTypes.array,
    setMyListings: PropTypes.func,
  };

  const navigate = useNavigate();
  const { listingId } = useParams();
  const [validated, setValidated] = React.useState(false);

  const [availability, setAvailability] = React.useState([
    {
      start: getTodayDate(),
      end: formatDate(addOneDay(new Date(getTodayDate()))),
    },
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
      console.log('valid');
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
              <Row
                key={idx}
                className="g-2 mb-2 mx-1 d-flex align-items-center justify-content-center"
              >
                <Col md>
                  <FloatingLabel controlId={`start-${idx}`} label="Start date">
                    <Form.Control
                      type="date"
                      placeholder="Start date"
                      value={dateRange.start}
                      min={
                        idx === 0
                          ? getTodayDate()
                          : formatDate(
                            addOneDay(new Date(availability[idx - 1].end))
                          )
                      }
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
                      min={formatDate(addOneDay(new Date(dateRange.start)))}
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
                    className="rounded-circle d-flex align-items-center justify-content-center p-2"
                    onClick={() => {
                      setAvailability((curr) =>
                        curr.filter((_, i) => i !== idx)
                      );
                    }}
                  >
                    <AiOutlineClose />
                  </Button>
                </Col>
              </Row>
            );
          })}

          {/* Add availability button */}
          <div className="text-center mt-3">
            <Button
              variant="dark"
              onClick={() =>
                setAvailability((curr) => [
                  ...curr,
                  {
                    start: formatDate(
                      addOneDay(new Date(availability.at(-1).end))
                    ),
                    end: formatDate(
                      addOneDay(addOneDay(new Date(availability.at(-1).end)))
                    ),
                  },
                ])
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
