import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';
import { HiPlusCircle } from 'react-icons/hi';

import Navbar from '../components/Navbar';
import MyListingCard from '../components/my_listings/MyListingCard';
import CreateListingForm from '../components/my_listings/CreateListingForm';
import PublishListingForm from '../components/my_listings/PublishListingForm';
import EditListingForm from '../components/my_listings/EditListingForm';
import { getListing, getListings } from '../services/listings';

const MyListings = ({ token, setToken, email, setAppEmail }) => {
  MyListings.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    email: PropTypes.string,
    setAppEmail: PropTypes.func,
  };

  const navigate = useNavigate();
  const [myListings, setMyListings] = React.useState([]);
  const [isListingsLoading, setIsListingsLoading] = React.useState(true);

  // set my listings on load
  React.useEffect(() => {
    getListings()
      .then((response) => {
        const promises = [];
        response.data.listings.forEach((listing) => {
          // check if logged in user owns this listing
          if (listing.owner === email) {
            promises.push(
              getListing(listing.id).then((response) => [response, listing.id])
            );
          }
        });

        Promise.all(promises)
          .then((responses) => {
            const listings = [];
            responses.forEach(([response, id]) => {
              // add listing then sort listings by last updated
              const listing = response.data.listing;
              listings.push({
                id,
                thumbnail: listing.thumbnail,
                title: listing.title,
                avgRating: 0, // TODO
                propertyType: listing.metadata.propertyType,
                pricePerNight: listing.price,
                numBeds: listing.metadata.bedrooms.reduce((a, b) => a + b, 0),
                numBathrooms: listing.metadata.numBathrooms,
                numReviews: listing.reviews.length,
                lastUpdatedAt: listing.metadata.lastUpdatedAt,
                published: listing.published,
              });
            });

            listings.sort((a, b) => {
              const dateA = new Date(a.lastUpdatedAt);
              const dateB = new Date(b.lastUpdatedAt);
              if (dateA > dateB) return -1;
              if (dateA < dateB) return 1;
              return 0;
            });

            setIsListingsLoading(false); // hide placeholders
            setMyListings(listings);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* Define these routes here so we can pass the setMyListings function as a prop */}
      {/* So that we can immediately re-render */}
      <Routes>
        <Route
          path="create"
          element={<CreateListingForm setMyListings={setMyListings} />}
        />
        <Route
          path="edit/:listingId"
          element={
            <EditListingForm
              myListings={myListings}
              setMyListings={setMyListings}
            />
          }
        />
        <Route
          path="publish/:listingId"
          element={
            <PublishListingForm
              myListings={myListings}
              setMyListings={setMyListings}
            />
          }
        />
      </Routes>

      {/* Navbar */}
      <Navbar token={token} setToken={setToken} setAppEmail={setAppEmail} />

      {/* Main content */}
      <Container className="my-5">
        <div className="d-flex gap-3 mb-4 align-items-center">
          <h1>My listings</h1>

          {/* Add listing button */}
          <Button
            variant="outline-dark"
            className="d-flex gap-2 align-items-center"
            onClick={() => navigate('create')}
          >
            <Card.Title>Add a listing</Card.Title>
            <HiPlusCircle size={30} />
          </Button>
        </div>

        <Row xs={1} md={2} lg={3} xxl={4} className="g-4 h-100">
          {/* Add listing button */}
          {/* <Col>
            <Card
              className="w-100 h-100"
              border="light"
              onClick={() => navigate('create')}
            >
              <Button variant="outline-dark" className="w-100 h-100 py-4">
                <Card.Title>Add a listing</Card.Title>
                <HiPlusCircle size={30} />
              </Button>
            </Card>
          </Col> */}

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
          {!isListingsLoading && myListings.length === 0 && (
            <h5 className="text-muted w-100 fw-normal">
              You have not created any listings yet!
            </h5>
          )}

          {/* My listings */}
          {myListings.map((listing, idx) => (
            <Col key={idx}>
              <MyListingCard
                listingId={listing.id}
                thumbnail={listing.thumbnail}
                title={listing.title}
                avgRating={listing.avgRating}
                propertyType={listing.propertyType}
                pricePerNight={listing.pricePerNight}
                numBeds={listing.numBeds}
                numBathrooms={listing.numBathrooms}
                numReviews={listing.numReviews}
                lastUpdatedAt={listing.lastUpdatedAt}
                published={listing.published}
                setMyListings={setMyListings}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Outlet />
    </>
  );
};

export default MyListings;
