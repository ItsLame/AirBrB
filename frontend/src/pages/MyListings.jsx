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
import { VscJson } from 'react-icons/vsc';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import Navbar from '../components/Navbar';
import MyListingCard from '../components/my_listings/MyListingCard';
import CreateListingForm from '../components/my_listings/CreateListingForm';
import PublishListingForm from '../components/my_listings/PublishListingForm';
import EditListingForm from '../components/my_listings/EditListingForm';
import UploadJSONForm from '../components/my_listings/UploadJSONForm';
import { getListing, getListings } from '../services/listings';
import { getBookings } from '../services/bookings';
import { currencyFormatter } from '../helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MyListings = ({ token, setToken, email, setAppEmail }) => {
  MyListings.propTypes = {
    token: PropTypes.string,
    setToken: PropTypes.func,
    email: PropTypes.string,
    setAppEmail: PropTypes.func,
  };

  const navigate = useNavigate();
  const [myListings, setMyListings] = React.useState([]);
  const [numListingsLoading, setNumListingsLoading] = React.useState(4);
  const [bookings, setBookings] = React.useState([]);
  const [monthsProfit, setMonthsProfit] = React.useState([]);

  // set my listings on load
  React.useEffect(() => {
    getListings()
      .then((response) => {
        setNumListingsLoading(
          response.data.listings.filter((listing) => listing.owner === email)
            .length
        );
        setMyListings([]);

        response.data.listings.forEach((listing) => {
          // check if logged in user owns this listing
          if (listing.owner === email) {
            getListing(listing.id)
              .then((r) => {
                const l = r.data.listing;
                setMyListings((curr) =>
                  [
                    ...curr,
                    {
                      id: listing.id,
                      thumbnail: l.thumbnail,
                      title: l.title,
                      avgRating: (l.reviews.length === 0
                        ? 0
                        : l.reviews.reduce((a, b) => a + b.rating, 0) /
                          l.reviews.length
                      ).toFixed(1),
                      propertyType: l.metadata.propertyType,
                      pricePerNight: l.price,
                      numBeds: l.metadata.bedrooms.reduce((a, b) => a + b, 0),
                      numBathrooms: l.metadata.numBathrooms,
                      numReviews: l.reviews.length,
                      reviews: l.reviews,
                      lastUpdatedAt: l.metadata.lastUpdatedAt,
                      published: l.published,
                    },
                  ].sort((a, b) => {
                    const dateA = new Date(a.lastUpdatedAt);
                    const dateB = new Date(b.lastUpdatedAt);
                    if (dateA > dateB) return -1;
                    if (dateA < dateB) return 1;
                    return 0;
                  })
                );

                setNumListingsLoading((curr) => curr - 1); // hide placeholders
              })
              .catch((error) => console.error(error));
          }
        });
      })
      .catch((error) => console.error(error));
  }, []);

  // get accepted bookings for any listing that the user owns
  React.useEffect(() => {
    getBookings()
      .then((response) =>
        setBookings(
          response.data.bookings.filter((booking) => {
            return (
              booking.status === 'accepted' &&
              myListings.some(
                (listing) => parseInt(booking.listingId, 10) === listing.id
              )
            );
          })
        )
      )
      .catch((error) => console.error(error));
  }, [myListings]);

  // calculate months profit when bookings is found
  React.useEffect(() => {
    const newMonthsProfit = new Array(31).fill(0);
    bookings.forEach((booking) => {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const todayCopy = new Date(new Date().setHours(0, 0, 0, 0));
      const start = new Date(
        new Date(booking.dateRange.start).setHours(0, 0, 0, 0)
      );
      const end = new Date(
        new Date(booking.dateRange.end).setHours(0, 0, 0, 0)
      );

      const pricePerNight =
        booking.totalPrice / ((end - start) / (24 * 60 * 60 * 1000));

      for (
        let day = new Date(todayCopy.setDate(todayCopy.getDate() - 30)); // 30 days ago
        day <= today; // until today (0 days ago)
        day = new Date(day.setDate(day.getDate() + 1)) // increment 1 day
      ) {
        // check if this day is part of the booking
        if (start <= day && day < end) {
          const daysAgo = Math.round(
            Math.abs((day - today) / (24 * 60 * 60 * 1000))
          );
          newMonthsProfit[daysAgo] += pricePerNight;
        }
      }
    });
    setMonthsProfit(newMonthsProfit);
  }, [bookings]);

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
          path="upload"
          element={<UploadJSONForm setMyListings={setMyListings} />}
        />
        <Route
          path="edit/:listingId"
          element={
            <EditListingForm email={email} setMyListings={setMyListings} />
          }
        />
        <Route
          path="publish/:listingId"
          element={
            <PublishListingForm email={email} setMyListings={setMyListings} />
          }
        />
      </Routes>
      {/* Navbar */}
      <Navbar
        token={token}
        setToken={setToken}
        email={email}
        setAppEmail={setAppEmail}
      />

      {/* Main content */}
      <Container className="my-5">
        <h1>My listings</h1>
        <div className="d-flex flex-wrap gap-3 mb-4 mt-3 align-items-center">
          {/* Add listing button */}
          <Button
            id="add-listing"
            variant="dark"
            aria-haspopup="dialog"
            className="d-flex gap-2 align-items-center"
            onClick={() => navigate('create')}
          >
            <Card.Title>Add a listing</Card.Title>
            <HiPlusCircle aria-hidden="true" size={30} />
          </Button>

          {/* Add a listing (JSON) */}
          <Button
            variant="outline-dark"
            aria-haspopup="dialog"
            className="d-flex gap-2 align-items-center"
            onClick={() => navigate('upload')}
          >
            <Card.Title>Upload a listing</Card.Title>
            <VscJson aria-hidden="true" size={30} />
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
                reviews={listing.reviews}
                lastUpdatedAt={listing.lastUpdatedAt}
                published={listing.published}
                setMyListings={setMyListings}
              />
            </Col>
          ))}

          {/* Placeholders when loading */}
          {numListingsLoading !== 0 &&
            [...Array(numListingsLoading)].map((_, idx) => (
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
          {numListingsLoading === 0 && myListings.length === 0 && (
            <h5 className="text-muted w-100 fw-normal">
              You have not created any listings yet!
            </h5>
          )}
        </Row>

        {/* Last month profits */}
        <h1 className="mt-5">Last month{"'s"} profits</h1>
        <Bar
          style={{ width: '0' }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  title: (tooltipItems) =>
                    tooltipItems[0].parsed.x +
                    ' day' +
                    (tooltipItems[0].parsed.x === 1 ? '' : 's') +
                    ' ago',
                  label: (tooltipItem) =>
                    currencyFormatter.format(tooltipItem.parsed.y) +
                    ' in profit',
                },
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Profit ($)',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Days ago',
                },
              },
            },
          }}
          data={{
            labels: [...Array(31).keys()],
            datasets: [
              {
                label: 'Profit for the past 31 days',
                data: monthsProfit,
                backgroundColor: 'rgba(100, 235, 100, 0.5)',
              },
            ],
          }}
        />
      </Container>
      <Outlet />
    </>
  );
};

export default MyListings;
