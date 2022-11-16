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
  const [isListingsLoading, setIsListingsLoading] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const render = async () => {
    // get date search params
    const searchGetDate = searchParams.get('date');

    // get bookings if logged in
    let bookings = [];
    if (token) {
      bookings = await getBookings()
        .then((response) => response.data.bookings)
        .catch((error) => console.error(error));
    }

    getListings()
      .then((response) => {
        const promises = [];
        response.data.listings.forEach((listing) => {
          // check if logged in user owns this listing
          promises.push(
            getListing(listing.id).then((response) => [response, listing.id])
          );
        });

        // temporary list
        let newListings = [];

        Promise.all(promises)
          .then((responses) => {
            responses.forEach(([response, id]) => {
              // prepend to list if listing is published
              const listing = response.data.listing;
              // console.log('raw listings', listing);
              if (listing.published) {
                newListings = [
                  <Col key={id}>
                    <ListingCard
                      listingId={id}
                      title={listing.title}
                      street={listing.address.street}
                      city={listing.address.city}
                      state={listing.address.state}
                      country={listing.address.country}
                      pricePerNight={listing.price}
                      pricePerStay={listing.price}
                      searchByDate={!!searchGetDate}
                      reviews={listing.reviews}
                      numReviews={listing.reviews.length}
                      avgRating={(listing.reviews.length === 0
                        ? 0
                        : listing.reviews.reduce((a, b) => a + b.rating, 0) /
                          listing.reviews.length
                      ).toFixed(1)}
                      thumbnail={listing.thumbnail}
                      numBedrooms={listing.metadata.bedrooms.length}
                      numBeds={listing.metadata.bedrooms.reduce(
                        (a, b) => a + b,
                        0
                      )}
                      numBathrooms={listing.metadata.numBathrooms}
                      bookings={bookings.filter(
                        (booking) =>
                          booking.owner === email &&
                          booking.listingId === id.toString()
                      )}
                      availability={listing.availability}
                      owner={listing.owner}
                      email={email}
                    />
                  </Col>,
                  ...newListings,
                ];
              }
            });

            // sort by num accepted bookings, then num pending bookings, then alphabetically (note: titles cannot be =)
            newListings = newListings.sort((a, b) => {
              const numAcceptedA = a.props.children.props.bookings.filter(
                (booking) => booking.status === 'accepted'
              ).length;
              const numAcceptedB = b.props.children.props.bookings.filter(
                (booking) => booking.status === 'accepted'
              ).length;
              const numPendingA = a.props.children.props.bookings.filter(
                (booking) => booking.status === 'pending'
              ).length;
              const numPendingB = b.props.children.props.bookings.filter(
                (booking) => booking.status === 'pending'
              ).length;

              if (numAcceptedA > numAcceptedB) return -1;
              if (numAcceptedA < numAcceptedB) return 1;
              if (numPendingA > numPendingB) return -1;
              if (numPendingA < numPendingB) return 1;

              // note: had to lowercase it, if not it will sort the capitalised letter first (i.e., A, B, a, b)
              return a.props.children.props.title.toLowerCase() >
                b.props.children.props.title.toLowerCase()
                ? 1
                : -1;
            });

            if ([...searchParams].length) {
              // filter by search
              const searchTitleCity = searchParams.get('title_city');
              const searchGetBedrooms = parseInt(searchParams.get('bedrooms'));
              const searchGetPrice = searchParams.get('price');
              const searchGetRatings = searchParams.get('ratings');

              // search title/city
              if (searchTitleCity) {
                const titleCityList = searchTitleCity
                  .split(/[ ,;+]/g)
                  .map((titleCity) => titleCity.trim().toLowerCase());

                newListings = newListings.filter((x) =>
                  [
                    ...x.props.children.props.title
                      .toLowerCase()
                      .split(/[ ,;+]/g),
                    ...x.props.children.props.city
                      .toLowerCase()
                      .split(/[ ,;+]/g),
                  ].some((titleCity) => titleCityList.includes(titleCity))
                );
              }

              // filter bedrooms
              searchGetBedrooms &&
                (searchGetBedrooms === 8
                  ? (newListings = newListings.filter(
                      (x) =>
                        x.props.children.props.numBedrooms >= searchGetBedrooms
                    ))
                  : (newListings = newListings.filter(
                      (x) =>
                        x.props.children.props.numBedrooms === searchGetBedrooms
                    )));

              // filter price range min/max
              if (searchGetPrice) {
                // filter price range min
                searchGetPrice.split('to')[0] !== '0' &&
                  (newListings = newListings.filter(
                    (x) =>
                      x.props.children.props.pricePerNight >=
                      searchGetPrice.split('to')[0]
                  ));

                // filter price range max
                searchGetPrice.split('to')[1] !== '0' &&
                  (newListings = newListings.filter(
                    (x) =>
                      x.props.children.props.pricePerNight <=
                      searchGetPrice.split('to')[1]
                  ));
              }

              // filter date range min/max
              if (searchGetDate) {
                // filter date range min
                searchGetDate.split('to')[0] !== '' &&
                  (newListings = newListings.filter((x) =>
                    x.props.children.props.availability.every(
                      (y) => y.start >= searchGetDate.split('to')[0]
                    )
                  ));

                // filter date range max
                searchGetDate.split('to')[1] !== '' &&
                  (newListings = newListings.filter((x) =>
                    x.props.children.props.availability.every(
                      (y) => y.end <= searchGetDate.split('to')[1]
                    )
                  ));
              }

              // sort by ratings highest/lowest
              searchGetRatings && searchGetRatings === 'lowest'
                ? (newListings = newListings.sort(
                    (a, b) =>
                      a.props.children.props.avgRating -
                      b.props.children.props.avgRating
                  ))
                : (newListings = newListings.sort(
                    (a, b) =>
                      b.props.children.props.avgRating -
                      a.props.children.props.avgRating
                  ));
            }

            setIsListingsLoading(false);
            setListings(newListings);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    setIsListingsLoading(true);
  }, []);
  React.useEffect(render, [searchParams]);
  React.useEffect(render, [email]);

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
          {/* Placeholders when loading */}
          {isListingsLoading &&
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
          {!isListingsLoading && listings.length === 0 && (
            <h5 className="text-muted w-100 fw-normal">
              {/* There are no bookable listings yet! */}
              No listings found!
            </h5>
          )}

          {!isListingsLoading && listings}
        </Row>
      </Container>

      <SearchForm
        show={show}
        closeAction={handleClose}
        setSearchParams={setSearchParams}
        setIsLoading={setIsListingsLoading}
      />
      <Outlet />
    </>
  );
};

export default Landing;
