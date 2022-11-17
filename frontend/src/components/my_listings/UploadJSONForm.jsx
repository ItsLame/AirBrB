import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Ajv from 'ajv';

import { fileToText } from '../../helpers';
import { createListing } from '../../services/listings';

const UploadJSONForm = ({ setMyListings }) => {
  UploadJSONForm.propTypes = {
    setMyListings: PropTypes.func,
  };

  const [fileInput, setFileInput] = React.useState('');
  const [jsonData, setJsonData] = React.useState({});
  const navigate = useNavigate();

  // json schema validation
  const ajv = new Ajv();
  const schema = {
    type: 'object',
    required: ['title', 'address', 'price', 'thumbnail', 'metadata'],
    properties: {
      title: {
        type: 'string',
        minLength: 1,
      },
      address: {
        type: 'object',
        required: ['street', 'city', 'state', 'postcode', 'country'],
        properties: {
          street: { type: 'string', minLength: 1 },
          city: { type: 'string', minLength: 1 },
          state: { type: 'string', minLength: 1 },
          postcode: { type: 'string', minLength: 1 },
          country: { type: 'string', minLength: 1 },
        },
      },
      price: {
        type: 'number',
        minimum: 0,
      },
      thumbnail: {
        type: 'string',
        minLength: 1,
      },
      metadata: {
        type: 'object',
        required: [
          'propertyType',
          'numBathrooms',
          'bedrooms',
          'amenities',
          'propertyImages',
        ],
        properties: {
          propertyType: {
            enum: ['House', 'Apartment', 'Guesthouse', 'Hotel'],
          },
          numBathrooms: {
            type: 'integer',
            minimum: 1,
          },
          bedrooms: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'integer',
              minimum: 1,
            },
          },
          amenities: {
            type: 'object',
            required: ['essentials', 'features', 'location', 'safety'],
            properties: {
              essentials: {
                type: 'array',
                items: {
                  enum: [
                    'Wi-Fi',
                    'Washing machine',
                    'Air conditioning',
                    'Dedicated workspace',
                    'Hair dryer',
                    'Kitchen',
                    'Dryer',
                    'Heating',
                    'TV',
                    'Iron',
                  ],
                },
              },
              features: {
                type: 'array',
                items: {
                  enum: [
                    'Pool',
                    'Free parking on premises',
                    'Cot',
                    'BBQ grill',
                    'Indoor fireplace',
                    'Hot tub',
                    'EV charger',
                    'Gym',
                    'Breakfast',
                    'Smoking allowed',
                  ],
                },
              },
              location: {
                type: 'array',
                items: {
                  enum: ['Beachfront', 'Waterfront'],
                },
              },
              safety: {
                type: 'array',
                items: {
                  enum: ['Smoke alarm', 'Carbon monoxide alarm'],
                },
              },
            },
          },
          propertyImages: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1,
            },
          },
        },
      },
    },
  };
  const jsonSchemaValidator = ajv.compile(schema);

  const handleClose = () => {
    navigate('..');
  };

  const handleValidate = (json) => {
    const valid = jsonSchemaValidator(json);
    if (valid) {
      if (
        !/^(https:\/\/)?www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$/.test(
          json.thumbnail
        )
      ) {
        const img = new Image();
        img.src = json.thumbnail;

        // check thumbnail is an image if it is not a youtube url
        if (!img.complete || !img.naturalWidth) {
          toast.error('Thumbnail is not a valid image or YouTube url');
          setJsonData({});
          setFileInput('');
          return;
        }
      }

      toast.success('JSON schema is valid! Ready to upload');
      setJsonData(json);
    } else {
      toast.error(ajv.errorsText(jsonSchemaValidator.errors));
      setJsonData({});
      setFileInput('');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (Object.keys(jsonData).length === 0) {
      toast.error('Please upload a valid .json file!');
      return;
    }

    const latestDate = new Date().toISOString();

    createListing(
      jsonData.title,
      jsonData.address,
      jsonData.price,
      jsonData.thumbnail,
      {
        propertyType: jsonData.metadata.propertyType,
        numBathrooms: jsonData.metadata.numBathrooms,
        bedrooms: jsonData.metadata.bedrooms,
        amenities: jsonData.metadata.amenities,
        lastUpdatedAt: latestDate,
        propertyImages: jsonData.metadata.propertyImages,
      }
    )
      .then((response) => {
        handleClose();
        setMyListings((curr) => [
          {
            id: parseInt(response.data.listingId, 10),
            thumbnail: jsonData.thumbnail,
            title: jsonData.title,
            avgRating: 0,
            propertyType: jsonData.metadata.propertyType,
            pricePerNight: jsonData.price,
            numBeds: jsonData.metadata.bedrooms.reduce((a, b) => a + b, 0),
            numBathrooms: jsonData.metadata.numBathrooms,
            numReviews: 0,
            reviews: [],
            lastUpdatedAt: latestDate,
            published: false,
          },
          ...curr,
        ]);
        toast.success(`Uploaded listing: ${jsonData.title}!`);
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  return (
    <Modal show={true} onHide={handleClose} centered size="lg">
      <Form onSubmit={handleUpload}>
        <Modal.Header closeButton>
          <Modal.Title>Upload a listing</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h6 className="mb-0">Upload a JSON file</h6>
          <p className="text-muted fst-italic">
            Must have the following format
          </p>

          <Form.Control
            type="file"
            accept=".json"
            className="mb-3"
            value={fileInput}
            onChange={(event) => {
              setFileInput(event.target.value);
              fileToText(event.target.files[0])
                .then((result) => {
                  const json = JSON.parse(result);
                  handleValidate(json);
                })
                .catch((error) => {
                  event.target.value = null;
                  toast.error(error.message);
                });
            }}
          ></Form.Control>

          <pre
            className="pre-scrollable p-3"
            style={{ backgroundColor: '#eee' }}
          >
            <code>
              {JSON.stringify(
                {
                  title: 'Beach House',
                  address: {
                    street: '1 Sydney St',
                    city: 'Sydney',
                    state: 'NSW',
                    postcode: '2000',
                    country: 'Australia',
                  },
                  price: 450,
                  thumbnail:
                    'data:image/jpeg;base64,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',
                  metadata: {
                    propertyType: 'House',
                    numBathrooms: 2,
                    bedrooms: [2, 2, 1],
                    amenities: {
                      essentials: ['Wi-Fi', 'Kitchen', 'TV'],
                      features: ['Pool', 'Gym'],
                      location: ['Beachfront'],
                      safety: ['Smoke alarm'],
                    },
                    propertyImages: [
                      'data:image/jpeg;base64,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',
                    ],
                  },
                },
                null,
                4
              )}
            </code>
          </pre>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Upload</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UploadJSONForm;
