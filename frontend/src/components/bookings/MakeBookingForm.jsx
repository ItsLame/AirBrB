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
import {
  formatDate,
  addOneDay,
  minusOneDay,
  currencyFormatter,
} from '../../helpers';

const MakeBookingForm = ({
  listingId,
  pricePerNight,
  availability,
  setBookings,
  email,
  owner,
}) => {
  MakeBookingForm.propTypes = {
    listingId: PropTypes.string,
    pricePerNight: PropTypes.number,
    availability: PropTypes.array,
    setBookings: PropTypes.func,
    email: PropTypes.string,
    owner: PropTypes.string,
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

    if (owner === email) {
      handleClose();
      toast.error("You can't book your own listing!");
      return;
    }

    if (event.currentTarget.checkValidity()) {
      createBooking(listingId, { start: startDate, end: endDate }, totalPrice)
        .then((response) => {
          // console.log(response);
          handleClose();
          setBookings((bookings) => [
            ...bookings,
            {
              id: response.data.bookingId,
              owner: email,
              dateRange: { start: startDate, end: endDate },
              totalPrice,
              listingId,
              status: 'pending',
            },
          ]);
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
            Price per night: {currencyFormatter.format(pricePerNight)}
          </h6>
          {!!totalPrice && (
            <h6 className="text-primary mb-3">
              <u>
                Total price: {currencyFormatter.format(totalPrice)} (for{' '}
                {numNights} night
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
                  aria-controls={`make-booking-availability-${idx}`}
                  required
                  label={`${new Date(dateRange.start).toLocaleDateString(
                    'default',
                    {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }
                  )} — ${new Date(dateRange.end).toLocaleDateString('default', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}`}
                  id={`booking-availaibility-${idx}`}
                  name="booking-availability"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStartDate('');
                      setEndDate('');
                      setSelectedAvailability(idx);
                    }
                  }}
                />

                {/* If this radio is selected, and the availability is a date range, then render date inputs */}
                {selectedAvailability === idx && (
                  <Row
                    id={`make-booking-availability-${idx}`}
                    className="g-2 mt-1 mb-3 mx-1 d-flex align-items-center justify-content-center"
                  >
                    <Col md>
                      <FloatingLabel
                        controlId={`booking-start-${idx}`}
                        label="Start date"
                      >
                        <Form.Control
                          id={`booking-start-${idx}-date-field`}
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
                          id={`booking-start-${idx}-date-field`}
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
