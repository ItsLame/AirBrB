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

const SearchForm = ({ show, closeAction, setSearchParams, setIsLoading }) => {
  SearchForm.propTypes = {
    show: PropTypes.bool,
    closeAction: PropTypes.func,
    setSearchParams: PropTypes.func,
    setIsLoading: PropTypes.func,
  };

  const [titleCity, setTitleCity] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [city, setCity] = React.useState('');

  const [filterToggle, setFilterToggle] = React.useState(false);
  const [ratingsToggle, setRatingsToggle] = React.useState('');
  const [bedrooms, setBedrooms] = React.useState(0);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [filterCount, setFilterCount] = React.useState(0);
  const [filterActive, setFilterActive] = React.useState([
    false, // ratings
    false, // bedrooms
    false, // min max price
    false, // start end date
  ]);

  React.useEffect(() => {
    const tempFilterActive = filterActive;

    tempFilterActive[0] = ratingsToggle !== '';
    tempFilterActive[1] = bedrooms > 0;
    tempFilterActive[2] = minPrice > 0 || maxPrice > 0;
    tempFilterActive[3] = startDate !== '' || endDate !== '';

    const fCount = tempFilterActive.filter((x) => x === true).length;

    setFilterActive(tempFilterActive);
    setFilterCount(fCount);
  }, [bedrooms, minPrice, maxPrice, ratingsToggle, startDate, endDate]);

  const handleClear = () => {
    setTitleCity('');
    setTitle('');
    setCity('');
    setBedrooms(0);
    setStartDate('');
    setEndDate('');
    setMinPrice(0);
    setMaxPrice(0);
    setRatingsToggle('');
  };

  const handleSearch = () => {
    const temp = {};

    filterActive[0] && (temp.ratings = ratingsToggle);
    filterActive[1] && (temp.bedrooms = bedrooms);
    filterActive[2] && (temp.price = `${minPrice}to${maxPrice}`);
    filterActive[3] && (temp.date = `${startDate}to${endDate}`);

    setSearchParams(temp);
    setIsLoading(true);
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
      <Modal.Header closeButton>
        <Modal.Title>Search Listings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          {/* Search field and filter toggle */}
          <Form className="d-flex gap-2">
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
                  const searchValues = event.target.value.split(',', 2);
                  searchValues[0]
                    ? setTitle(searchValues[0].trim())
                    : setTitle('');
                  searchValues[1]
                    ? setCity(searchValues[1].trim())
                    : setCity('');

                  console.log(`title:'${title}'\tcity:'${city}'`);
                }}
                autoFocus
              />
            </FloatingLabel>
            {/* filter toggle button */}
            <Button
              variant="outline-dark"
              // type="submit"
              className="d-flex align-items-center"
              active={filterToggle}
              onClick={() => setFilterToggle(!filterToggle)}
            >
              <BsSliders size={20} />
            </Button>
          </Form>

          {/* Filter active collapsible contents */}
          <Collapse className="mt-3" in={filterToggle}>
            <Container className="p-0">
              <h4>Filters</h4>

              {/* Number of bedrooms */}
              <h5 className="text-secondary">Number of Bedrooms</h5>
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
              <h5 className="text-secondary">Date</h5>

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
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="date" label="End date">
                    <Form.Control
                      type="date"
                      placeholder="01/01/2022"
                      onChange={(event) => {
                        setEndDate(event.target.value);
                      }}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              {/* Price range fields */}
              <h5 className="text-secondary">Price</h5>

              <Row xs={1} sm={2} className="g-3 h-100 mb-3">
                {/* Minimum price field */}
                <Col>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <FloatingLabel controlId="number" label="Minimum price">
                      <Form.Control
                        type="number"
                        placeholder="01/01/2022"
                        min="0"
                        step="1"
                        value={minPrice}
                        onChange={(event) => {
                          event.target.valueAsNumber > minPrice &&
                            minPrice >= maxPrice &&
                            maxPrice > 0 &&
                            setMaxPrice(event.target.valueAsNumber);

                          setMinPrice(event.target.valueAsNumber);
                        }}
                        required
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
                        min="0"
                        step="1"
                        value={maxPrice}
                        onChange={(event) => {
                          event.target.valueAsNumber < maxPrice &&
                            maxPrice <= minPrice &&
                            setMinPrice(event.target.valueAsNumber);

                          setMaxPrice(event.target.valueAsNumber);

                          event.target.valueAsNumber > 0 &&
                            minPrice > event.target.valueAsNumber &&
                            setMaxPrice(minPrice);
                        }}
                        required
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
          Clear All
        </Button>
        {/* Search / search with filter button */}
        {filterCount > 0
          ? (
          <Button variant="primary" type="submit" onClick={handleSearch}>
            Search with {filterCount} filter{filterCount > 1 && 's'}
          </Button>
            )
          : (
          <Button variant="primary" type="submit" onClick={handleSearch}>
            Search
          </Button>
            )}
      </Modal.Footer>
    </Modal>
  );
};

export default SearchForm;
