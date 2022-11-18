import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from '../components/Navbar';
import ListingCard from '../components/listings/ListingCard';
import { getListing, getListings } from '../services/listings';
import SearchToggle from '../components/listings/SearchToggle';
import SearchForm from '../components/listings/SearchForm';
import { getBookings } from '../services/bookings';

const Landing = ({ token, setToken, email, setAppEmail }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    email: PropTypes.string,
    setAppEmail: PropTypes.func,
  };

  const [listings, setListings] = React.useState([]);
  const [numListingsLoading, setNumListingsLoading] = React.useState(4);
  const [showSearchForm, setShowSearchForm] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});

  const handleClose = () => setShowSearchForm(false);
  const handleShow = () => setShowSearchForm(true);

  const render = async () => {
    // get search params
    const searchTitleCity = searchParams.get('titleCity');
    const searchRatings = searchParams.get('ratings');
    // const searchBedrooms = searchParams.get('bedrooms');
    const searchMinBedrooms = searchParams.get('minBedrooms');
    const searchMaxBedrooms = searchParams.get('maxBedrooms');
    const searchMinPrice = searchParams.get('minPrice');
    const searchMaxPrice = searchParams.get('maxPrice');
    const searchStartDate = searchParams.get('startDate');
    const searchEndDate = searchParams.get('endDate');

    // if date params exist, set multiplier
    let stayMultiplier = 0;
    searchStartDate &&
      searchEndDate &&
      (stayMultiplier =
        (new Date(searchEndDate) - new Date(searchStartDate)) /
        (1000 * 60 * 60 * 24));

    // get bookings if logged in
    let bookings = [];
    if (token) {
      bookings = await getBookings()
        .then((response) => response.data.bookings)
        .catch((error) => console.error(error));
    }

    getListings()
      .then((response) => {
        setNumListingsLoading(response.data.listings.length);
        setListings([]);

        response.data.listings.forEach((listing, idx) => {
          getListing(listing.id)
            .then((r) => {
              const l = r.data.listing;
              if (l.published) {
                // if search params then check them
                let shouldStay = true;

                // search title/city
                if (searchTitleCity) {
                  // eg 'syd per Beach' -> ['syd', 'per', 'beach']
                  const needleList = searchTitleCity
                    .split(/[ ,;+]/g)
                    .map((needle) => needle.trim().toLowerCase());

                  // ['sydney', 'beach house']
                  // ['syd', 'per', 'beach'].some(needle => 'sydney'.includes(needle))
                  if (
                    ![
                      ...l.title.toLowerCase().split(/[ ,;+]/g),
                      ...l.address.city.toLowerCase().split(/[ ,;+]/g),
                    ].some((haystack) =>
                      needleList.some((needle) => haystack.includes(needle))
                    )
                  ) {
                    shouldStay = false;
                  }
                }

                // filter min bedrooms
                if (searchMinBedrooms) {
                  const requiredBedrooms = parseInt(searchMinBedrooms, 10);
                  if (requiredBedrooms !== 0) {
                    if (l.metadata.bedrooms.length < requiredBedrooms) {
                      shouldStay = false;
                    }
                  }
                }

                // filter max bedrooms
                if (searchMaxBedrooms) {
                  const requiredBedrooms = parseInt(searchMaxBedrooms, 10);
                  if (requiredBedrooms !== 0) {
                    if (l.metadata.bedrooms.length > requiredBedrooms) {
                      shouldStay = false;
                    }
                  }
                }

                // filter min price
                if (searchMinPrice) {
                  const requiredMinPrice = parseInt(searchMinPrice, 10);
                  if (l.price < requiredMinPrice) {
                    shouldStay = false;
                  }
                }

                // filter max price
                if (searchMaxPrice) {
                  const requiredMaxPrice = parseInt(searchMaxPrice, 10);
                  if (l.price > requiredMaxPrice) {
                    shouldStay = false;
                  }
                }

                // filter dates
                if (searchStartDate && searchEndDate) {
                  const startDate = new Date(searchStartDate);
                  const endDate = new Date(searchEndDate);
                  if (
                    !l.availability.some((avail) => {
                      const availStart = new Date(avail.start);
                      const availEnd = new Date(avail.end);
                      return availStart <= startDate && endDate <= availEnd;
                    })
                  ) {
                    shouldStay = false;
                  }
                } else if (searchStartDate) {
                  const date = new Date(searchStartDate);
                  if (
                    !l.availability.some((avail) => {
                      const availStart = new Date(avail.start);
                      const availEnd = new Date(avail.end);
                      return availStart <= date && date < availEnd;
                    })
                  ) {
                    shouldStay = false;
                  }
                } else if (searchEndDate) {
                  const date = new Date(searchEndDate);
                  if (
                    !l.availability.some((avail) => {
                      const availStart = new Date(avail.start);
                      const availEnd = new Date(avail.end);
                      return availStart < date && date <= availEnd;
                    })
                  ) {
                    shouldStay = false;
                  }
                }

                // add to listings if all filters satisfied
                if (shouldStay) {
                  setListings((curr) =>
                    [
                      ...curr,
                      <Col key={listing.id}>
                        <ListingCard
                          listingId={listing.id}
                          id={`${idx}`}
                          title={l.title}
                          street={l.address.street}
                          city={l.address.city}
                          state={l.address.state}
                          country={l.address.country}
                          pricePerNight={l.price}
                          pricePerStay={l.price * stayMultiplier}
                          stayDays={stayMultiplier}
                          searchByDate={stayMultiplier > 0}
                          reviews={l.reviews}
                          numReviews={l.reviews.length}
                          avgRating={(l.reviews.length === 0
                            ? 0
                            : l.reviews.reduce((a, b) => a + b.rating, 0) /
                              l.reviews.length
                          ).toFixed(1)}
                          thumbnail={l.thumbnail}
                          numBedrooms={l.metadata.bedrooms.length}
                          numBeds={l.metadata.bedrooms.reduce(
                            (a, b) => a + b,
                            0
                          )}
                          numBathrooms={l.metadata.numBathrooms}
                          bookings={bookings.filter(
                            (booking) =>
                              booking.owner === email &&
                              booking.listingId === listing.id.toString()
                          )}
                          availability={l.availability}
                          owner={l.owner}
                          email={email}
                        />
                      </Col>,
                    ].sort((a, b) => {
                      const numAcceptedA =
                        a.props.children.props.bookings.filter(
                          (booking) => booking.status === 'accepted'
                        ).length;
                      const numAcceptedB =
                        b.props.children.props.bookings.filter(
                          (booking) => booking.status === 'accepted'
                        ).length;
                      const numPendingA =
                        a.props.children.props.bookings.filter(
                          (booking) => booking.status === 'pending'
                        ).length;
                      const numPendingB =
                        b.props.children.props.bookings.filter(
                          (booking) => booking.status === 'pending'
                        ).length;

                      // sort by number of accepted bookings then number of pending bookings
                      if (numAcceptedA > numAcceptedB) return -1;
                      if (numAcceptedA < numAcceptedB) return 1;
                      if (numPendingA > numPendingB) return -1;
                      if (numPendingA < numPendingB) return 1;

                      // sort by ratings highest/lowest
                      if (searchRatings) {
                        if (searchRatings === 'lowest') {
                          if (
                            a.props.children.props.avgRating <
                            b.props.children.props.avgRating
                          ) {
                            return -1;
                          }
                          if (
                            a.props.children.props.avgRating >
                            b.props.children.props.avgRating
                          ) {
                            return 1;
                          }
                        } else {
                          if (
                            a.props.children.props.avgRating <
                            b.props.children.props.avgRating
                          ) {
                            return 1;
                          }
                          if (
                            a.props.children.props.avgRating >
                            b.props.children.props.avgRating
                          ) {
                            return -1;
                          }
                        }
                      }

                      // note: had to lowercase it, if not it will sort the capitalised letter first (i.e., A, B, a, b)
                      return a.props.children.props.title.trim().toLowerCase() >
                        b.props.children.props.title.trim().toLowerCase()
                        ? 1
                        : -1;
                    })
                  );
                }
              }

              setNumListingsLoading((curr) => curr - 1); // hide placeholders
            })
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // React.useEffect(render, []);
  React.useEffect(render, [searchParams, email]);

  return (
    <>
      {/* Navbar */}
      <Navbar
        token={token}
        setToken={setToken}
        middleElement={
          <SearchToggle
            onClickHandler={() => {
              handleShow();
            }}
          />
        }
        email={email}
        setAppEmail={setAppEmail}
      />

      {/* Main content */}
      <Container className="my-5">
        <h1 className="mb-4">All listings</h1>
        <Row xs={1} md={2} lg={3} xxl={4} className="g-4 h-100">
          {listings}

          {/* Placeholders when loading */}
          {numListingsLoading !== 0 &&
            [...Array(4)].map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img
                    variant="top"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPEhUQDxAQDw8PEhUPDw8PFRIPDw8PFRIWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKCg0LEA8FGisZExkrLSsrKysrLSsrKysrLS0rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAHhABAQEAAQQDAAAAAAAAAAAAAAERgQIScZEhQfD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AOvxbUVUAAVDTQKUoBiKgLENIAqACpFAEIC4hKASrUgBV1KAqWgBVqVNBrgZ0BVSraAi6AJqmgQhKSgcBABJVARQ0EFNBCUWAkqpDQUxIvAAQlARQEhigGAAmiqDIoBSgBAASEAAWEBIEiggYuAkWEgCGrEgEqmGAmqABRNBQ00DQAIIoBEiyABAFQkKAi1AaKmlABAWAmgsVJQCUEBYrOrARYiwAADU0igKmgJqooIsCUBUiwGdFARZBICosAMSEAVJSAC6igFSlAiooIShKCrEANEUEEAWqAFMACBAEVIoCShAUIQEgKAioAsSEBbDEUEWRP30ugGAC4Q0BNIkUAYAb0TQFD2AaACQJGpAZpIpAMJFSAiwAAgAi1AFQA1UKCrrKgaekxcAis4sgILgCEXUBRNUDEUBFiAKYJAWQhAEVIAqYsQCkAChQDQAURQVABLFSgLgmAAsARd8BoAQBBo0GYRpIACAYqasoBE1QMTFSgKgCoLASqmKC4IAogAIAEUAqKAkFhQAMAwLDAIQkATVRQAwASrE0FsRUgKkUBBSQEwxbCgCEgGB8ANYmACKhoEU0AJAwAgAqEAAAAMARUwFQgCxUAWiAGGCAEAFwTQFDTQSCgCKgEVMUExYJAWBhgAAGBhAEVABSgYKmgI1qAgFBQSAgoChImAEIQAAFELAFDAEphgGKkigIKBPKEAFCgogCoQACFgIqGAdwyA1AhoLCIsACGAYYAKIaCxDUBcEigCKAgAogCxKQAkWJSA1iYFBMWIoGCdwBAAWpABSgARQFQAZIAEUAWJABKACwoAkABnqWADXSUABQGQAf//Z"
                    alt="Loading listing placeholder"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                      <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                      <Placeholder xs={8} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          {/* If no listings */}
          {numListingsLoading === 0 && listings.length === 0 && (
            <h5 className="text-muted w-100 fw-normal">
              {/* There are no bookable listings yet! */}
              No listings found!
            </h5>
          )}
        </Row>
      </Container>

      <SearchForm
        show={showSearchForm}
        closeAction={handleClose}
        setSearchParams={setSearchParams}
      />
      <Outlet />
    </>
  );
};

export default Landing;
