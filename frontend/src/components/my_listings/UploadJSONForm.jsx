import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fileToText } from '../../helpers';
import { createListing } from '../../services/listings';

const UploadJSONForm = ({ setMyListings }) => {
  UploadJSONForm.propTypes = {
    setMyListings: PropTypes.func,
  };

  const [jsonData, setJsonData] = React.useState([]);
  const [uploadDisabled, setUploadDisabled] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('..');
  };

  const handleValidate = (temp) => {
    const mainKeysString =
      '["title","address","price","thumbnail","metadata","availability"]';
    const availabilityKeysString = '["start","end"]';
    const addressKeysString = '["street","city","state","postcode","country"]';
    const metadataKeysString =
      '["propertyType","numBathrooms","bedrooms","amenities"]';
    const amenitiesKeysString = '["essentials","features","location","safety"]';

    const mainKeys = temp.map(
      (x) => JSON.stringify(Object.keys(x)) === mainKeysString
    );

    let availabilityKeys = [];
    temp
      .map((x) =>
        x.availability.map(
          (y) => JSON.stringify(Object.keys(y)) === availabilityKeysString
        )
      )
      .forEach((x) => {
        x.forEach((y) => {
          availabilityKeys = [...availabilityKeys, y];
        });
      });

    const addressKeys = temp.map(
      (x) => JSON.stringify(Object.keys(x.address)) === addressKeysString
    );

    const metadataKeys = temp.map(
      (x) => JSON.stringify(Object.keys(x.metadata)) === metadataKeysString
    );

    const amenitiesKeys = temp.map(
      (x) =>
        JSON.stringify(Object.keys(x.metadata.amenities)) ===
        amenitiesKeysString
    );

    const allKeys = [
      ...mainKeys,
      ...availabilityKeys,
      ...addressKeys,
      ...metadataKeys,
      ...amenitiesKeys,
    ];

    if (allKeys.every((x) => x)) {
      toast.success('All keys are valid!');

      temp.forEach((x) =>
        x.thumbnail.split('.')[1] === 'youtube'
          ? console.log('youtube')
          : (x.thumbnail = require(`../../../public/listings/${x.thumbnail}`))
      );

      setJsonData(temp);
      setUploadDisabled(false);
    } else {
      toast.error('Some invalid keys, please check your JSON file');
      setUploadDisabled(true);
    }
  };

  const handleUpload = () => {
    const latestDate = new Date().toISOString();

    jsonData.forEach((x) => {
      createListing(x.title, x.address, x.price, x.thumbnail, {
        propertyType: x.metadata.propertyType,
        numBathrooms: x.metadata.numBathrooms,
        bedrooms: x.metadata.bedrooms,
        amenities: x.metadata.amenities,
        lastUpdatedAt: latestDate,
      })
        .then((response) => {
          handleClose();
          setMyListings((curr) => [
            {
              id: parseInt(response.data.listingId, 10),
              thumbnail: x.thumbnail,
              title: x.title,
              avgRating: 0,
              propertyType: x.metadata.propertyType,
              pricePerNight: x.price,
              numBeds: x.metadata.bedrooms.reduce((a, b) => a + b, 0),
              numBathrooms: x.metadata.numBathrooms,
              numReviews: 0,
              reviews: [],
              lastUpdatedAt: x.latestDate,
              published: false,
            },
            ...curr,
          ]);
          toast.success(`Imported listing: ${x.title}!`);
        })
        .catch((error) => toast.error(error.response.data.error));
    });
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload listings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Choose a JSON file to import...
        <Form.Control
          type="file"
          accept=".json"
          className="mb-3"
          onChange={(event) => {
            setUploadDisabled(true);

            fileToText(event.target.files[0])
              .then((result) => {
                const temp = JSON.parse(result);
                handleValidate(temp);
              })
              .catch((error) => {
                event.target.value = null;
                toast.error(error.message);
              });
          }}
        ></Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={uploadDisabled} onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadJSONForm;
