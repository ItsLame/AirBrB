import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { createBooking } from '../../services/bookings';
import { formatDate, addOneDay, minusOneDay } from '../../helpers';
// import NotFound from '../../pages/NotFound';

const MakeBookingForm = ({ listingId, pricePerNight, availability }) => {
  MakeBookingForm.propTypes = {
    listingId: PropTypes.string,
    pricePerNight: PropTypes.number,
    availability: PropTypes.array,
  };

  const navigate = useNavigate();
  const [validated, setValidated] = React.useState(false);
  const [selectedAvailability, setSelectedAvailability] = React.useState(-1);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [numNights, setNumNights] = React.useState(0);

  React.useEffect(() => {
    setNumNights(getNumNights());
  }, [startDate, endDate]);

  React.useEffect(() => {
    setTotalPrice(pricePerNight * numNights);
  }, [numNights]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      createBooking(listingId, { start: startDate, end: endDate }, totalPrice)
        .then((response) => {
          // console.log(response);
          handleClose();
          toast.success('Requested booking!');
        })
        .catch((error) => console.error(error));
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate('..');
  };

  const differenceInDays = (firstDate, secondDate) => {
    return Math.round((secondDate - firstDate) / (1000 * 60 * 60 * 24));
  };

  const getNumNights = () =>
    differenceInDays(new Date(startDate), new Date(endDate));

  if (!availability) {
    return <></>;
  }

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Make a booking</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Select an availability that suits you</h5>
          <h6 className={`text-muted ${totalPrice ? 'mb-1' : 'mb-3'}`}>
            Price per night: ${pricePerNight.toFixed(2)}
          </h6>
          {!!totalPrice && (
            <h6 className="text-primary mb-3">
              <u>
                Total price: ${totalPrice.toFixed(2)} (for {numNights} night
                {numNights === 1 ? '' : 's'})
              </u>
            </h6>
          )}

          {/* Availability input fields */}
          {availability.map((dateRange, idx) => {
            return (
              <div key={idx}>
                <Form.Check
                  key={idx}
                  type="radio"
                  required
                  label={`${new Date(dateRange.start).toLocaleDateString(
                    'default',
                    {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }
                  )}${
                    dateRange.start !== dateRange.end
                      ? ' — ' +
                        new Date(dateRange.end).toLocaleDateString('default', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''
                  }`}
                  id={`booking-availaibility-${idx}`}
                  name="booking-availability"
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (dateRange.start === dateRange.end) {
                        // no further input
                        setStartDate(dateRange.start);
                        setEndDate(dateRange.end);
                      } else {
                        // further input required
                        setStartDate('');
                        setEndDate('');
                      }
                      setSelectedAvailability(idx);
                    }
                  }}
                />

                {/* If this radio is selected, and the availability is a date range, then render date inputs */}
                {selectedAvailability === idx &&
                  dateRange.start !== dateRange.end && (
                    <Row className="g-2 mt-1 mb-3 mx-1 d-flex align-items-center justify-content-center">
                      <Col md>
                        <FloatingLabel
                          controlId={`booking-start-${idx}`}
                          label="Start date"
                        >
                          <Form.Control
                            type="date"
                            placeholder="Start date"
                            min={dateRange.start}
                            max={formatDate(
                              minusOneDay(new Date(endDate || dateRange.end))
                            )}
                            onChange={(e) => {
                              setStartDate(e.target.value);
                            }}
                            required
                          />
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel
                          controlId={`booking-end-${idx}`}
                          label="End date"
                        >
                          <Form.Control
                            type="date"
                            placeholder="End date"
                            min={formatDate(
                              addOneDay(new Date(startDate || dateRange.start))
                            )}
                            max={dateRange.end}
                            onChange={(e) => {
                              setEndDate(e.target.value);
                            }}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                )}
              </div>
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Request booking
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MakeBookingForm;
