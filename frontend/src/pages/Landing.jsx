import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';

import Navbar from '../components/Navbar';
import ListingCard from '../components/listings/ListingCard';
import { getListing, getListings } from '../services/listings';
import SearchToggle from '../components/listings/SearchToggle';
import SearchForm from '../components/listings/SearchForm';
// import { getListing, getListings } from '../services/listings';

const Landing = ({ token, setToken, setAppEmail }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const [listings, setListings] = React.useState([]);
  const [isListingsLoading, setIsListingsLoading] = React.useState(true);

  React.useEffect(() => {
    getListings()
      .then((response) => {
        let promises = [];
        promises = response.data.listings.map((listing) =>
          getListing(listing.id).then((response) => [response, listing.id])
        );

        // temporary list
        let newListings = [];

        Promise.all(promises)
          .then((responses) => {
            responses.forEach(([response, id]) => {
              // prepend to list
              const listing = response.data.listing;
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
                    avgRating={0} // TODO
                    thumbnail={listing.thumbnail}
                    numBeds={listing.metadata.bedrooms.reduce(
                      (a, b) => a + b,
                      0
                    )}
                    numBathrooms={listing.metadata.numBathrooms}
                    // TODO: get accepted/pending/none status
                    // true if accepted, false if pending, null if none
                    accepted={true}
                  />
                </Col>,
                ...newListings,
              ];

              // sort alphabetically (note: titles cannot be =)
              newListings = newListings.sort((a, b) =>
                a.props.children.props.title > b.props.children.props.title
                  ? 1
                  : -1
              );

              setIsListingsLoading(false);
              setListings(newListings);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Navbar */}
      <Navbar
        token={token}
        setToken={setToken}
        search={false}
        searchAction={handleShow}
        middleElement={
          <SearchToggle
            onSearchToggle={() => {
              handleShow();
            }}
          />
        }
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

          {listings}
        </Row>
      </Container>

      <SearchForm show={show} closeAction={handleClose} />
      <Outlet />
    </>
  );
};

export default Landing;
