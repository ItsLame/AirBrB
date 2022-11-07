import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCard';
import { getListing, getListings } from '../services/listings';
// import { getListing, getListings } from '../services/listings';

const Landing = ({ token, setToken }) => {
  Landing.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
  };

  const [listings, setListings] = React.useState([]);
  const [isListingsLoading, setIsListingsLoading] = React.useState(true);

  React.useEffect(() => {
    getListings()
      .then((response) => {
        // listing ids
        let listingIds = [];
        listingIds = response.data.listings.map((x) => getListing(x.id));

        // temporary list
        let tempList = [];

        Promise.all(listingIds)
          .then((ids) => {
            ids.forEach((id, idx) => {
              // append to list
              tempList = [
                <Col key={idx}>
                  <ListingCard
                    title={id.data.listing.title}
                    street={id.data.listing.address.street}
                    city={id.data.listing.address.city}
                    state={id.data.listing.address.state}
                    country={id.data.listing.address.country}
                    price={id.data.listing.price}
                    reviews={id.data.listing.reviews.length}
                    thumbnail={id.data.listing.thumbnail}
                    beds={id.data.listing.metadata.bedrooms.reduce(
                      (a, b) => a + b
                    )}
                    bathrooms={id.data.listing.metadata.numBathrooms}
                    // TODO: get accepted/pending/none status
                    // true if accepted, false if pending, null if none
                    accepted={null}
                  />
                </Col>,
                ...tempList,
              ];

              // sort alphabetically
              tempList = tempList.sort((a, b) =>
                a.props.children.props.title > b.props.children.props.title
                  ? 1
                  : -1
              );

              // set temporary list to listings
              setListings(tempList);

              // load done
              setIsListingsLoading(false);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} xxl={4} className="g-4 h-100">
          {/* Placeholders when loading */}
          {isListingsLoading &&
            [...Array(6)].map((_, idx) => (
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
      <Outlet />
    </>
  );
};

export default Landing;
