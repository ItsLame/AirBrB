import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import { BsSliders } from 'react-icons/bs';
import FormRange from 'react-bootstrap/esm/FormRange';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { addOneDay, formatDate } from '../../helpers';

const SearchForm = ({ show, closeAction, setSearchParams }) => {
  SearchForm.propTypes = {
    show: PropTypes.bool,
    closeAction: PropTypes.func,
    setSearchParams: PropTypes.func,
  };

  const [titleCity, setTitleCity] = React.useState('');
  const [filterToggle, setFilterToggle] = React.useState(false);
  const [ratingsToggle, setRatingsToggle] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [filterCount, setFilterCount] = React.useState(0);
  const [filterActive, setFilterActive] = React.useState([
    false, // ratings
    false, // bedrooms
    false, // min price
    false, // max price
    false, // start date
    false, // end date
  ]);

  React.useEffect(() => {
    const tempFilterActive = filterActive;

    tempFilterActive[0] = ratingsToggle !== '';
    tempFilterActive[1] = bedrooms !== 0;
    tempFilterActive[2] = minPrice !== '';
    tempFilterActive[3] = maxPrice !== '';
    tempFilterActive[4] = startDate !== '';
    tempFilterActive[5] = endDate !== '';

    const fCount = tempFilterActive.filter((x) => x).length;

    setFilterActive(tempFilterActive);
    setFilterCount(fCount);
  }, [bedrooms, minPrice, maxPrice, ratingsToggle, startDate, endDate]);

  const handleClear = () => {
    setTitleCity('');
    setBedrooms(0);
    setStartDate('');
    setEndDate('');
    setMinPrice('');
    setMaxPrice('');
    setRatingsToggle('');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const temp = {};

    titleCity.trim() !== '' && (temp.titleCity = titleCity);
    filterActive[0] && (temp.ratings = ratingsToggle);
    filterActive[1] && (temp.bedrooms = bedrooms);
    filterActive[2] && (temp.minPrice = minPrice);
    filterActive[3] && (temp.maxPrice = maxPrice);
    filterActive[4] && (temp.startDate = startDate);
    filterActive[5] && (temp.endDate = endDate);

    setSearchParams(temp);
    closeAction();
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        closeAction();
        handleClear();
        setFilterToggle(false);
      }}
      size="lg"
      scrollable
      centered
    >
      <Form onSubmit={handleSearch}>
        <Modal.Header closeButton>
          <Modal.Title>Search for listings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            {/* Search field and filter toggle */}
            <div className="d-flex gap-2">
              {/* search field */}
              <FloatingLabel
                className="flex-grow-1"
                controlId="number"
                label="Title / City"
              >
                <Form.Control
                  type="text"
                  value={titleCity}
                  placeholder="Title / City"
                  onInput={(event) => {
                    setTitleCity(event.target.value);
                  }}
                  autoFocus
                />
              </FloatingLabel>
              {/* filter toggle button */}
              <Button
                variant="outline-dark"
                className="d-flex align-items-center"
                active={filterToggle}
                onClick={() => setFilterToggle(!filterToggle)}
              >
                <BsSliders size={20} />
              </Button>
            </div>

            {/* Filter active collapsible contents */}
            <Collapse className="mt-3" in={filterToggle}>
              <Container className="p-0">
                <h4>Filters</h4>

                {/* Number of bedrooms */}
                <h5 className="text-secondary">Number of bedrooms</h5>
                <Container className="d-flex p-0 gap-3">
                  {bedrooms === 8 ? '8+' : bedrooms === 0 ? 'Any' : bedrooms}
                  <FormRange
                    variant="dark"
                    value={bedrooms}
                    min={0}
                    max={8}
                    onChange={(event) => {
                      setBedrooms(event.target.valueAsNumber);
                    }}
                    className="mb-3"
                  />
                </Container>

                {/* Date range */}
                <h5 className="text-secondary">Availability</h5>

                <Row xs={1} sm={2} className="g-3 h-100 mb-3">
                  <Col>
                    <FloatingLabel controlId="date" label="Start date">
                      <Form.Control
                        type="date"
                        placeholder="01/01/2022"
                        value={startDate}
                        onChange={(event) => {
                          setStartDate(event.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="date" label="End date">
                      <Form.Control
                        type="date"
                        placeholder="01/01/2022"
                        value={endDate}
                        min={
                          startDate
                            ? formatDate(addOneDay(new Date(startDate)))
                            : null
                        }
                        onChange={(event) => {
                          setEndDate(event.target.value);
                        }}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                {/* Price range fields */}
                <h5 className="text-secondary">Price per night</h5>

                <Row xs={1} sm={2} className="g-3 h-100 mb-3">
                  {/* Minimum price field */}
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <FloatingLabel controlId="number" label="Minimum price">
                        <Form.Control
                          type="number"
                          placeholder="Minimum price"
                          min="0"
                          step="1"
                          value={minPrice}
                          onChange={(event) => {
                            setMinPrice(
                              isNaN(event.target.valueAsNumber)
                                ? ''
                                : event.target.valueAsNumber
                            );
                          }}
                        />
                      </FloatingLabel>
                    </InputGroup>
                  </Col>
                  {/* Maximum price field */}
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <FloatingLabel controlId="number" label="Maximum price">
                        <Form.Control
                          type="number"
                          placeholder="01/01/2022"
                          min={minPrice || '0'}
                          step="1"
                          value={maxPrice}
                          onChange={(event) => {
                            setMaxPrice(
                              isNaN(event.target.valueAsNumber)
                                ? ''
                                : event.target.valueAsNumber
                            );
                          }}
                        />
                      </FloatingLabel>
                    </InputGroup>
                  </Col>
                </Row>

                {/* Ratings */}
                <h5 className="text-secondary">Ratings</h5>

                <Container className="p-0 d-flex flex-wrap gap-2 mb-3">
                  {/* Highest rating button */}
                  <Button
                    variant="outline-dark"
                    active={ratingsToggle === 'highest'}
                    onClick={() => {
                      ratingsToggle === 'highest'
                        ? setRatingsToggle('')
                        : setRatingsToggle('highest');
                    }}
                  >
                    Highest
                  </Button>
                  {/* Lowest rating button */}
                  <Button
                    variant="outline-dark"
                    active={ratingsToggle === 'lowest'}
                    onClick={() => {
                      ratingsToggle === 'lowest'
                        ? setRatingsToggle('')
                        : setRatingsToggle('lowest');
                    }}
                  >
                    Lowest
                  </Button>
                </Container>
              </Container>
            </Collapse>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          {/* Clear all button */}
          <Button
            variant="outline-secondary"
            onClick={() => {
              handleClear();
            }}
          >
            Clear all
          </Button>
          {/* Search / search with filter button */}
          {filterCount > 0
            ? (
            <Button variant="primary" type="submit">
              Search with {filterCount} filter{filterCount > 1 && 's'}
            </Button>
              )
            : (
            <Button variant="primary" type="submit">
              Search
            </Button>
              )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SearchForm;
