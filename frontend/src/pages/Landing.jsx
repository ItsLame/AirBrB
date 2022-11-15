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
              return a.props.children.props.title > b.props.children.props.title
                ? 1
                : -1;
            });

            // filter by search
            const searchTitleCity = searchParams.get('title_city');
            const searchGetBedrooms = searchParams.get('bedrooms');
            const searchGetPrice = searchParams.get('price');
            const searchGetDate = searchParams.get('date');

            // console.log('- FILTER -');
            // console.log('bedrooms', searchParams.get('bedrooms'));
            // console.log('price', searchParams.get('price'));
            // console.log('date', searchParams.get('date'));
            // console.log('ratings', searchParams.get('ratings'));

            // search title/city
            if (searchTitleCity) {
              const titleCityList = searchTitleCity
                .split(/[ ,;+]/g)
                .map((titleCity) => titleCity.trim().toLowerCase());

              titleCityList.some(
                (titleCity) =>
                  (newListings = newListings.filter(
                    (x) =>
                      x.props.children.props.title
                        .toLowerCase()
                        .includes(titleCity) ||
                      x.props.children.props.city
                        .toLowerCase()
                        .includes(titleCity)
                  ))
              );
            }

            // filter bedrooms
            searchGetBedrooms &&
              (newListings = newListings.filter(
                (x) => x.props.children.props.numBedrooms >= searchGetBedrooms
              ));

            // filter price range min
            searchGetPrice &&
              searchGetPrice.split('to')[0] !== '0' &&
              (newListings = newListings.filter(
                (x) =>
                  x.props.children.props.pricePerNight >=
                  searchGetPrice.split('to')[0]
              ));

            // filter price range max
            searchGetPrice &&
              searchGetPrice.split('to')[1] !== '0' &&
              (newListings = newListings.filter(
                (x) =>
                  x.props.children.props.pricePerNight <=
                  searchGetPrice.split('to')[1]
              ));

            // filter date range min
            searchGetDate &&
              searchGetDate.split('to')[0] !== '' &&
              (newListings = newListings.filter((x) =>
                x.props.children.props.availability.every(
                  (y) => y.start >= searchGetDate.split('to')[0]
                )
              ));

            // filter date range max
            searchGetDate &&
              searchGetDate.split('to')[1] !== '' &&
              (newListings = newListings.filter((x) =>
                x.props.children.props.availability.every(
                  (y) => y.end <= searchGetDate.split('to')[1]
                )
              ));

            // sort by ratings highest/lowest

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
              There are no bookable listings yet!
            </h5>
          )}

          {listings}
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
