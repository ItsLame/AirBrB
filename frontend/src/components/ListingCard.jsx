import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { BsFillStarFill } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';

const ListingCard = () => {
  // ListingCard.propTypes = {
  //   token: PropTypes.string,
  //   setToken: PropTypes.func,
  // };

  // const navigate = useNavigate();

  return (
    <>
      <Button variant="outline-dark" className="mb-4 p-0 border-0 text-start">
        <Card style={{ width: '300px' }} className="bg-transparent">
          <Card.Img
            variant="top"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-54380902/original/9dc52173-f50d-47e5-b5d9-3c072ad7d40c.jpeg?im_w=960"
            alt="place"
          />
          <Card.Body>
            <Container className="d-flex p-0">
              <Card.Title className="mt-2 flex-grow-1">Title</Card.Title>
              <Card.Text className="d-flex gap-1 align-items-center">
                <BsFillStarFill />
                <span>{'1.23 (45)'}</span>
              </Card.Text>
            </Container>
            <Card.Text className="d-flex flex-column">
              <span>UNSW Sydney High St</span>
              <span>Kensington, NSW, Australia</span>
              <span>$20 per night</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Button>
    </>
  );
};

export default ListingCard;
