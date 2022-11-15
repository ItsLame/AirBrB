import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BiCalendarCheck } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { BsCalendarDay } from 'react-icons/bs';

import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import { StarRating } from '../components/StyledComponents';
import { getListing } from '../services/listings';
import {
  acceptBooking,
  declineBooking,
  getBookings,
} from '../services/bookings';
import AmenityList from '../components/AmenityList';
import { currencyFormatter } from '../helpers';
import Reviews from '../components/Reviews';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MyListing = ({ token, setToken, email, setAppEmail }) => {
  MyListing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    email: PropTypes.string,
    setAppEmail: PropTypes.func,
  };

  const { listingId } = useParams();
  const [title, setTitle] = React.useState(null);
  const [street, setStreet] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [postcode, setPostcode] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [availability, setAvailability] = React.useState(null);
  const [owner, setOwner] = React.useState(null);
  const [pricePerNight, setPricePerNight] = React.useState(null);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [propertyType, setPropertyType] = React.useState(null);
  const [bedrooms, setBedrooms] = React.useState(null);
  const [numBathrooms, setNumBathrooms] = React.useState(null);
  const [essentialsAmenities, setEssentialsAmenities] = React.useState(null);
  const [featuresAmenities, setFeaturesAmenities] = React.useState(null);
  const [locationAmenities, setLocationAmenities] = React.useState(null);
  const [safetyAmenities, setSafetyAmenities] = React.useState(null);
  const [avgRating, setAvgRating] = React.useState(null);
  const [numReviews, setNumReviews] = React.useState(null);
  const [reviews, setReviews] = React.useState(null);
  const [showAllAmenitiesActive, setShowAllAmenitiesActive] =
    React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);
  const [published, setPublished] = React.useState(null);
  const [postedOn, setPostedOn] = React.useState(null);
  const [monthlyBookings, setMonthlyBookings] = React.useState([]);
  const [monthlyProfits, setMonthlyProfits] = React.useState([]);
  const [yearlyBookings, setYearlyBookings] = React.useState(0);
  const [yearlyProfit, setYearlyProfit] = React.useState(0);
  const [yearlyDaysBooked, setYearlyDaysBooked] = React.useState(0);

  React.useEffect(() => {
    const newMonthlyBookings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const newMonthlyProfits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let newYearlyDaysBooked = 0;

    bookings.forEach((booking) => {
      if (booking.status === 'accepted') {
        const bookingYear = new Date(booking.dateRange.start).getFullYear();
        const nowYear = new Date().getFullYear();
        if (bookingYear === nowYear) {
          const bookingMonth = new Date(booking.dateRange.start).getMonth();
          newMonthlyBookings[bookingMonth]++;
          newMonthlyProfits[bookingMonth] += booking.totalPrice;
          newYearlyDaysBooked += Math.round(
            (new Date(booking.dateRange.end) -
              new Date(booking.dateRange.start)) /
              (1000 * 60 * 60 * 24)
          );
        }
      }
    });

    setMonthlyBookings(newMonthlyBookings);
    setMonthlyProfits(newMonthlyProfits);
    setYearlyBookings(newMonthlyBookings.reduce((a, b) => a + b, 0));
    setYearlyProfit(newMonthlyProfits.reduce((a, b) => a + b, 0));
    setYearlyDaysBooked(newYearlyDaysBooked);
  }, [bookings]);

  React.useEffect(() => {
    getBookings()
      .then((response) =>
        setBookings(
          response.data.bookings.filter(
            (booking) => booking.listingId === listingId
          )
        )
      )
      .catch((error) => console.error(error));

    getListing(listingId)
      .then((response) => {
        const listing = response.data.listing;

        // the getListing route always succeeds even if
        // listingId isnt a valid listing
        // so we do this check here to check for invalid listings
        if (Object.keys(listing).length === 0 || listing.owner !== email) {
          setNotFound(true);
          return;
        }

        setTitle(listing.title);
        setStreet(listing.address.street);
        setState(listing.address.state);
        setPostcode(listing.address.postcode);
        setCountry(listing.address.country);
        setCity(listing.address.city);
        setAvailability(listing.availability);
        setOwner(listing.owner);
        setPricePerNight(listing.price);
        setPropertyType(listing.metadata.propertyType);
        setBedrooms(listing.metadata.bedrooms);
        setNumBathrooms(listing.metadata.numBathrooms);
        setEssentialsAmenities(listing.metadata.amenities.essentials);
        setFeaturesAmenities(listing.metadata.amenities.features);
        setLocationAmenities(listing.metadata.amenities.location);
        setSafetyAmenities(listing.metadata.amenities.safety);
        setReviews(listing.reviews);
        setThumbnail(listing.thumbnail);
        setPublished(listing.published);
        setPostedOn(listing.postedOn);
      })
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    if (reviews) {
      setAvgRating(
        (reviews.length === 0
          ? 0
          : reviews.reduce((a, b) => a + b.rating, 0) / reviews.length
        ).toFixed(1)
      );
      setNumReviews(reviews.length);
    }
  }, [reviews]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar
        token={token}
        setToken={setToken}
        email={email}
        setAppEmail={setAppEmail}
      />

      {/* Main content */}
      <Container className="my-5">
        <Row xs={1} sm={1} md={1} lg={2}>
          <Col>
            {/* Published status badge */}
            {published !== null
              ? (
              <>
                <Badge className="me-1" bg={published ? 'success' : 'danger'}>
                  {published ? 'Published' : 'Not published'}
                </Badge>
                {published &&
                  (() => {
                    const daysSince = Math.ceil(
                      (new Date() - new Date(postedOn).setHours(0, 0, 0, 0)) /
                        (1000 * 60 * 60 * 24)
                    );
                    return (
                      <Badge bg="secondary" className="fw-normal">
                        since {new Date(postedOn).toLocaleDateString()} (
                        {daysSince} day{daysSince === 1 ? '' : 's'})
                      </Badge>
                    );
                  })()}
              </>
                )
              : (
              <span className="placeholder-glow">
                <span className="placeholder col-2 placeholder-md"></span>
              </span>
                )}

            {/* Title */}
            {title !== null
              ? (
              <h1 style={{ overflowWrap: 'break-word' }}>{title}</h1>
                )
              : (
              <h1 className="placeholder-glow">
                <span className="placeholder col-10"></span>
              </h1>
                )}

            {/* Property type and owner */}
            {propertyType !== null && owner !== null
              ? (
              <h4 className="mb-0">
                {propertyType} hosted by {owner}
              </h4>
                )
              : (
              <h4 className="placeholder-glow mb-0">
                <span className="placeholder col-7"></span>
              </h4>
                )}

            {/* Address */}
            {street !== null &&
            city !== null &&
            state !== null &&
            postcode !== null &&
            country !== null
              ? (
              <h6 className="fst-italic fw-normal">
                {street}, {city}, {state} {postcode}, {country}
              </h6>
                )
              : (
              <h6 className="placeholder-glow">
                <span className="placeholder col-5"></span>
              </h6>
                )}

            {/* Reviews, beds, bathrooms */}
            {avgRating !== null &&
            numReviews !== null &&
            bedrooms !== null &&
            numBathrooms !== null
              ? (
              <div className="d-flex align-items-start gap-1">
                <StarRating avgRating={avgRating} numReviews={numReviews} />
                <span>
                  — {bedrooms.length} bedrooms,{' '}
                  {bedrooms.reduce((a, b) => a + b, 0)} beds, {numBathrooms}{' '}
                  bathrooms
                </span>
              </div>
                )
              : (
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </div>
                )}

            {/* Price per night */}
            {pricePerNight
              ? (
              <div className="fst-italic mb-2">
                <u>{currencyFormatter.format(pricePerNight)} per night</u>
              </div>
                )
              : (
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-3"></span>
              </div>
                )}
            <hr />

            {/* Amenities */}
            {/* eslint-disable-next-line multiline-ternary */}
            {essentialsAmenities !== null &&
            featuresAmenities !== null &&
            locationAmenities !== null &&
            // eslint-disable-next-line multiline-ternary
            safetyAmenities !== null ? (
              <>
                <h5>Amenities</h5>

                {/* If no amenities show a message */}
                {!essentialsAmenities?.length &&
                  !featuresAmenities?.length &&
                  !locationAmenities?.length &&
                  !safetyAmenities?.length && (
                    <p className="text-muted fst-italic">
                      Nothing to see here!
                    </p>
                )}

                {/* Always show essentials if any */}
                {!!essentialsAmenities?.length && (
                  <>
                    <h6 className="mb-0">Essentials</h6>
                    <AmenityList amenities={essentialsAmenities} />
                  </>
                )}

                {/* More amenities that can be shown */}
                {showAllAmenitiesActive && (
                  <>
                    {!!featuresAmenities?.length && (
                      <>
                        <h6 className="mb-0">Features</h6>
                        <AmenityList amenities={featuresAmenities} />
                      </>
                    )}

                    {!!locationAmenities?.length && (
                      <>
                        <h6 className="mb-0">Location</h6>
                        <AmenityList amenities={locationAmenities} />
                      </>
                    )}

                    {!!safetyAmenities?.length && (
                      <>
                        <h6 className="mb-0">Safety</h6>
                        <AmenityList amenities={safetyAmenities} />
                      </>
                    )}
                  </>
                )}

                {/* If there are more amenities prompt to show them with a button */}
                {(!!featuresAmenities?.length ||
                  !!locationAmenities?.length ||
                  !!safetyAmenities?.length) && (
                  <Button
                    variant="outline-dark px-2 py-1 mb-2"
                    onClick={() =>
                      setShowAllAmenitiesActive(!showAllAmenitiesActive)
                    }
                  >
                    Show{' '}
                    {showAllAmenitiesActive
                      ? 'less'
                      : `${
                          (featuresAmenities ? featuresAmenities.length : 0) +
                          (locationAmenities ? locationAmenities.length : 0) +
                          (safetyAmenities ? safetyAmenities.length : 0)
                        } more`}
                  </Button>
                )}
              </>
                ) : (
              <>
                <h5 className="placeholder-glow">
                  <span className="placeholder col-4"></span>
                </h5>

                <h6 className="mb-0 placeholder-glow">
                  <span className="placeholder col-2"></span>
                </h6>
                <Row xs={1} sm={1} md={2} className="mb-3">
                  <Col>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="placeholder-glow">
                        <span className="placeholder col-5"></span>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="placeholder-glow">
                        <span className="placeholder col-5"></span>
                      </div>
                    ))}
                  </Col>
                </Row>
                <a
                  href="#"
                  tabIndex="-1"
                  className="btn btn-dark disabled placeholder col-2 px-2 py-1 mb-2"
                ></a>
              </>
                )}
          </Col>

          {/* TODO: Property image carousel */}
          <Col>
            {!thumbnail
              ? (
              <div style={{ height: '400px' }} className="placeholder-glow">
                <span className="placeholder w-100 h-100"></span>
              </div>
                )
              : (
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
                )}
          </Col>
        </Row>
        <hr />

        {/* Only show availabilities, booking requests, booking history, performance and reviews if published */}
        {published && (
          <>
            {/* Availabilities */}
            <h5>Availabilities</h5>
            <ul>
              {availability.map((dateRange, idx) => {
                return (
                  <li key={idx}>
                    {new Date(dateRange.start).toLocaleDateString('default', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    —{' '}
                    {new Date(dateRange.end).toLocaleDateString('default', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </li>
                );
              })}
            </ul>
            <hr />

            {/* Booking requests */}
            <h5>Booking requests</h5>
            <h6 className="text-muted mb-3">
              Bookings with status <Badge bg="primary">Pending</Badge>
            </h6>
            {bookings.filter((booking) => booking.status === 'pending')
              .length === 0
              ? (
              <p className="text-muted fst-italic">No booking requests yet!</p>
                )
              : (
              <Table hover striped size="sm">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Nights</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((booking) => booking.status === 'pending')
                    .sort((a, b) => {
                      if (
                        new Date(a.dateRange.start) <
                        new Date(b.dateRange.start)
                      ) {
                        return -1;
                      }
                      if (
                        new Date(a.dateRange.start) >
                        new Date(b.dateRange.start)
                      ) {
                        return 1;
                      }
                      if (
                        new Date(a.dateRange.end) < new Date(b.dateRange.end)
                      ) {
                        return -1;
                      }
                      if (
                        new Date(a.dateRange.end) > new Date(b.dateRange.end)
                      ) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((booking, idx) => {
                      return (
                        <tr
                          key={idx}
                          style={
                            idx === bookings.length - 1
                              ? { borderBottom: 'hidden ' }
                              : {}
                          }
                        >
                          <td>{booking.owner}</td>
                          <td>
                            {Math.round(
                              (new Date(booking.dateRange.end) -
                                new Date(booking.dateRange.start)) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </td>
                          <td>
                            {new Date(
                              booking.dateRange.start
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(
                              booking.dateRange.end
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {currencyFormatter.format(booking.totalPrice)}
                          </td>
                          <td style={{ width: '175px' }}>
                            <div className="d-flex flex-nowrap gap-1">
                              <Button
                                style={{ fontSize: '10pt', width: '65px' }}
                                className="px-2 py-0 fw-bold"
                                variant="outline-success"
                                onClick={() => {
                                  acceptBooking(booking.id)
                                    .then((_) => {
                                      setBookings((bookings) =>
                                        bookings.map((b) => {
                                          if (b.id === booking.id) {
                                            b.status = 'accepted';
                                          }
                                          return b;
                                        })
                                      );
                                      toast.success(
                                        `Accepted booking request from ${
                                          booking.owner
                                        } for ${currencyFormatter.format(
                                          booking.totalPrice
                                        )}`
                                      );
                                    })
                                    .catch((error) => console.error(error));
                                }}
                              >
                                Accept
                              </Button>
                              <Button
                                style={{ fontSize: '10pt', width: '65px' }}
                                className="px-2 py-0 fw-bold"
                                variant="outline-danger"
                                onClick={() => {
                                  declineBooking(booking.id)
                                    .then((_) => {
                                      setBookings((bookings) =>
                                        bookings.map((b) => {
                                          if (b.id === booking.id) {
                                            b.status = 'declined';
                                          }
                                          return b;
                                        })
                                      );
                                      toast.success(
                                        `Declined booking request from ${booking.owner}`
                                      );
                                    })
                                    .catch((error) => console.error(error));
                                }}
                              >
                                Deny
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
                )}

            {/* Booking history */}
            <h5>Booking history</h5>
            <h6 className="text-muted mb-3">
              Bookings with status <Badge bg="success">Accepted</Badge> or{' '}
              <Badge bg="danger">Declined</Badge>
            </h6>
            {bookings.filter((booking) => booking.status !== 'pending')
              .length === 0
              ? (
              <p className="text-muted fst-italic">No booking history yet!</p>
                )
              : (
              <Table hover striped size="sm">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Nights</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((booking) => booking.status !== 'pending')
                    .sort((a, b) => {
                      if (
                        new Date(a.dateRange.start) <
                        new Date(b.dateRange.start)
                      ) {
                        return 1;
                      }
                      if (
                        new Date(a.dateRange.start) >
                        new Date(b.dateRange.start)
                      ) {
                        return -1;
                      }
                      if (
                        new Date(a.dateRange.end) < new Date(b.dateRange.end)
                      ) {
                        return 1;
                      }
                      if (
                        new Date(a.dateRange.end) > new Date(b.dateRange.end)
                      ) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((booking, idx) => {
                      return (
                        <tr
                          key={idx}
                          style={
                            idx === bookings.length - 1
                              ? { borderBottom: 'hidden ' }
                              : {}
                          }
                        >
                          <td>{booking.owner}</td>
                          <td>
                            {Math.round(
                              (new Date(booking.dateRange.end) -
                                new Date(booking.dateRange.start)) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </td>
                          <td>
                            {new Date(
                              booking.dateRange.start
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(
                              booking.dateRange.end
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            {currencyFormatter.format(booking.totalPrice)}
                          </td>
                          <td style={{ width: '175px' }}>
                            <Badge
                              bg={
                                booking.status === 'accepted'
                                  ? 'success'
                                  : 'danger'
                              }
                            >
                              {booking.status === 'accepted'
                                ? 'Accepted'
                                : 'Declined'}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
                )}

            {/* Yearly profits and stats */}
            <h5 className="mt-4">Performance in {new Date().getFullYear()}</h5>
            <div className="ms-2 d-flex gap-3 mb-3 w-100 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <GiReceiveMoney size={45} />
                <div className="d-flex flex-column justify-content-center">
                  <span className="fs-4 text-muted lh-1">
                    {currencyFormatter.format(yearlyProfit)}
                  </span>
                  <span
                    className="fst-italic lh-1"
                    style={{ fontSize: '10pt' }}
                  >
                    IN PROFIT
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BiCalendarCheck size={45} />
                <div className="d-flex flex-column justify-content-center">
                  <span className="fs-4 text-muted lh-1">{yearlyBookings}</span>
                  <span
                    className="fst-italic lh-1"
                    style={{ fontSize: '10pt' }}
                  >
                    BOOKINGS
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <BsCalendarDay size={40} />
                <div className="d-flex flex-column justify-content-center">
                  <span className="fs-4 text-muted lh-1">
                    {yearlyDaysBooked}
                  </span>
                  <span
                    className="fst-italic lh-1"
                    style={{ fontSize: '10pt' }}
                  >
                    NIGHTS
                  </span>
                </div>
              </div>
            </div>

            {/* Graphs */}
            <Row>
              <Col>
                <Bar
                  style={{ width: '0' }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                  data={{
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ],
                    datasets: [
                      {
                        label: 'Monthly bookings',
                        data: monthlyBookings,
                        backgroundColor: 'rgba(100, 235, 100, 0.5)',
                      },
                    ],
                  }}
                />
              </Col>
              <Col>
                <Bar
                  style={{ width: '0' }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                  data={{
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ],
                    datasets: [
                      {
                        label: 'Monthly profits ($)',
                        data: monthlyProfits,
                        backgroundColor: 'rgba(235, 235, 100, 0.5)',
                      },
                    ],
                  }}
                />
              </Col>
            </Row>
            <hr />
          </>
        )}

        {/* Reviews */}
        <Reviews
          reviews={reviews}
          avgRating={avgRating}
          numReviews={numReviews}
        />
      </Container>
    </>
  );
};

export default MyListing;
