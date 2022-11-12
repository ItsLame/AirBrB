import React from 'react';
import { useParams, Route, Routes, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {
  MdLocalLaundryService,
  MdIron,
  MdDryCleaning,
  MdAir,
  MdOutlineDesktopMac,
  MdOutlineBreakfastDining,
  MdElectricalServices,
  MdPool,
  MdOutdoorGrill,
  MdFireplace,
  MdFaceRetouchingNatural,
} from 'react-icons/md';
import { HiWifi } from 'react-icons/hi';
import { RiTvFill } from 'react-icons/ri';
import {
  FaHotjar,
  FaSmoking,
  FaHotTub,
  FaParking,
  FaBabyCarriage,
  FaWater,
  FaUmbrellaBeach,
  FaCalendarCheck,
} from 'react-icons/fa';
import { TbToolsKitchen2 } from 'react-icons/tb';
import { CgGym } from 'react-icons/cg';
import { ImFire } from 'react-icons/im';
import { BsAlarm } from 'react-icons/bs';

import NotFound from '../pages/NotFound';
import Navbar from '../components/Navbar';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { StarRating } from '../components/StyledComponents';
import MakeBookingForm from '../components/bookings/MakeBookingForm';
import { getListing } from '../services/listings';

const Listing = ({ token, setToken, setAppEmail }) => {
  Listing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const navigate = useNavigate();
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
  const [showAllAmenitiesActive, setShowAllAmenitiesActive] =
    React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    getListing(listingId)
      .then((response) => {
        const listing = response.data.listing;

        // the getListing route always succeeds even if
        // listingId isnt a valid listing
        // so we do this check here to check for invalid listings
        if (Object.keys(listing).length === 0) {
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
        setAvgRating(0); // TODO
        setNumReviews(listing.reviews.length);
        setThumbnail(listing.thumbnail);
      })
      .catch((error) => console.error(error));
  }, []);

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'Washing machine':
        return <MdLocalLaundryService />;
      case 'Wi-Fi':
        return <HiWifi />;
      case 'Iron':
        return <MdIron />;
      case 'TV':
        return <RiTvFill />;
      case 'Heating':
        return <FaHotjar />;
      case 'Dryer':
        return <MdDryCleaning />;
      case 'Kitchen':
        return <TbToolsKitchen2 />;
      case 'Air conditioning':
        return <MdAir />;
      case 'Dedicated workspace':
        return <MdOutlineDesktopMac />;
      case 'Hair dryer':
        return <MdFaceRetouchingNatural />;
      case 'Smoking allowed':
        return <FaSmoking />;
      case 'Breakfast':
        return <MdOutlineBreakfastDining />;
      case 'Gym':
        return <CgGym />;
      case 'EV charger':
        return <MdElectricalServices />;
      case 'Hot tub':
        return <FaHotTub />;
      case 'Pool':
        return <MdPool />;
      case 'Free parking on premises':
        return <FaParking />;
      case 'Cot':
        return <FaBabyCarriage />;
      case 'BBQ grill':
        return <MdOutdoorGrill />;
      case 'Indoor fireplace':
        return <MdFireplace />;
      case 'Waterfront':
        return <FaWater />;
      case 'Beachfront':
        return <FaUmbrellaBeach />;
      case 'Smoke alarm':
        return <ImFire />;
      case 'Carbon monoxide alarm':
        return <BsAlarm />;
    }
  };

  const getAmenitiesList = (amenities) => (
    <Row xs={1} sm={1} md={2} className="mb-3">
      <Col>
        {amenities.slice(0, Math.ceil(amenities.length / 2)).map((amenity) => (
          <div
            key={amenity}
            className="d-flex gap-2 align-items-center flex-nowrap"
          >
            {getAmenityIcon(amenity)} {amenity}
          </div>
        ))}
      </Col>
      <Col>
        {amenities.slice(Math.ceil(amenities.length / 2)).map((amenity) => (
          <div
            key={amenity}
            className="d-flex gap-2 align-items-center flex-nowrap"
          >
            {getAmenityIcon(amenity)} {amenity}
          </div>
        ))}
      </Col>
    </Row>
  );

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      {/* Sub routes */}
      <Routes>
        {/* Define login and register routes if user is not logged in */}
        {!token && (
          <>
            <Route
              path="login"
              element={
                <LoginForm setToken={setToken} setAppEmail={setAppEmail} />
              }
            />
            <Route
              path="register"
              element={
                <RegisterForm setToken={setToken} setAppEmail={setAppEmail} />
              }
            />
          </>
        )}

        {/* Route book to booking form if logged in, otherwise route to login page */}
        {token
          ? (
          <Route
            path="book"
            element={
              <MakeBookingForm
                listingId={listingId}
                availability={availability}
              />
            }
          />
            )
          : (
          <Route
            path="book"
            element={
              <LoginForm setToken={setToken} setAppEmail={setAppEmail} />
            }
          />
            )}
      </Routes>

      {/* Navbar */}
      <Navbar token={token} setToken={setToken} setAppEmail={setAppEmail} />

      {/* Main content */}
      <Container className="my-5">
        <Row xs={1} sm={1} md={1} lg={2}>
          <Col>
            {/* Title */}
            {title !== null
              ? (
              <div className="d-flex gap-3 mb-2 align-items-center">
                <h1 style={{ overflowWrap: 'break-word' }}>{title}</h1>
                <Button
                  variant="dark"
                  className="d-flex gap-2 align-items-center"
                  onClick={() => navigate('book')}
                >
                  <Card.Title>Book now</Card.Title>
                  <FaCalendarCheck size={20} />
                </Button>
              </div>
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
              <div className="fst-italic">
                <u>${pricePerNight} per night</u>
              </div>
                )
              : (
              <div className="placeholder-glow">
                <span className="placeholder col-3"></span>
              </div>
                )}
            <hr />

            {/* Amenities */}
            {essentialsAmenities !== null &&
            featuresAmenities !== null &&
            locationAmenities !== null &&
            safetyAmenities !== null
              ? (
              <>
                <h5>What this place offers</h5>

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
                    {getAmenitiesList(essentialsAmenities)}
                  </>
                )}

                {/* More amenities that can be shown */}
                {showAllAmenitiesActive && (
                  <>
                    {!!featuresAmenities?.length && (
                      <>
                        <h6 className="mb-0">Features</h6>
                        {getAmenitiesList(featuresAmenities)}
                      </>
                    )}

                    {!!locationAmenities?.length && (
                      <>
                        <h6 className="mb-0">Location</h6>
                        {getAmenitiesList(locationAmenities)}
                      </>
                    )}

                    {!!safetyAmenities?.length && (
                      <>
                        <h6 className="mb-0">Safety</h6>
                        {getAmenitiesList(safetyAmenities)}
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
                )
              : (
              <>
                <h5 className="placeholder-glow">
                  <span className="placeholder col-4"></span>
                </h5>

                <h6 className="mb-0 placeholder-glow">
                  <span className="placeholder col-2"></span>
                </h6>
                <Row xs={1} sm={1} md={2} className="mb-3">
                  <Col>
                    {[...Array(5)].map((i) => (
                      <div key={i} className="placeholder-glow">
                        <span className="placeholder col-5"></span>
                      </div>
                    ))}
                  </Col>
                  <Col>
                    {[...Array(5)].map((i) => (
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

        <h4>Reviews</h4>

        {console.log('avail + ' + availability)}
      </Container>
    </>
  );
};

export default Listing;
