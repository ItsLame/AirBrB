import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { fileToText } from '../../helpers';
import { createListing } from '../../services/listings';

const UploadJSONForm = () => {
  const [jsonData, setJsonData] = React.useState([]);
  const [validateDisabled, setValidateDisabled] = React.useState(true);
  const [uploadDisabled, setUploadDisabled] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('..');
  };

  const handleValidate = () => {
    const temp = jsonData;
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

    temp.forEach(
      (x) => (x.thumbnail = require(`../../populate/${x.thumbnail}`))
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
      setUploadDisabled(false);
    } else {
      toast.error('Some invalid keys, please check your JSON file');
      setUploadDisabled(true);
    }
  };

  const handleUpload = () => {
    const latestDate = new Date().toISOString();

    jsonData.forEach((x) => {
      // console.log('title', x.title);
      // console.log('address', x.address);
      // console.log('street', x.address.street);
      // console.log('city', x.address.city);
      // console.log('state', x.address.state);
      // console.log('postcode', x.address.postcode);
      // console.log('country', x.address.country);
      // console.log('price', x.price);
      // console.log('thumbnail', x.thumbnail);
      // console.log('metadata', x.metadata);
      // console.log('propertyType', x.metadata.propertyType);
      // console.log('numBathrooms', x.metadata.numBathrooms);
      // console.log('bedrooms', x.metadata.bedrooms);
      // console.log('amenities', x.metadata.amenities);
      // console.log('lastUpdatedAt', latestDate);
      createListing(x.title, x.address, x.price, x.thumbnail, {
        propertyType: x.metadata.propertyType,
        numBathrooms: x.metadata.numBathrooms,
        bedrooms: x.metadata.bedrooms,
        amenities: x.metadata.amenities,
        lastUpdatedAt: latestDate,
      });
    });
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>Upload listings</Modal.Header>
      <Modal.Body>
        Upload a JSON file
        <Form.Control
          type="file"
          accept=".json"
          className="mb-3"
          onChange={(event) => {
            setUploadDisabled(true);

            fileToText(event.target.files[0])
              .then((result) => {
                const temp = JSON.parse(result);
                setJsonData(temp);
                setValidateDisabled(false);
              })
              .catch((error) => {
                event.target.value = null;
                toast.error(error.message);
                setValidateDisabled(true);
              });
          }}
        ></Form.Control>
        <Button
          variant="success"
          disabled={validateDisabled}
          onClick={handleValidate}
        >
          Validate
        </Button>
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
