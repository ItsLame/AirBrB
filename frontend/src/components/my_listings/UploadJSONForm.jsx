import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { fileToText } from '../../helpers';

const UploadJSONForm = () => {
  const [jsonData, setJsonData] = React.useState([]);
  const [validateDisabled, setValidateDisabled] = React.useState(true);
  const [uploadDisabled, setUploadDisabled] = React.useState(true);
  // const [uploadDisabled] = React.useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/my_listings');
  };

  React.useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>Upload listings</Modal.Header>
      <Modal.Body>
        Upload a JSON file
        <Form.Control
          type="file"
          accept=".json"
          className="mb-3"
          onChange={(event) => {
            fileToText(event.target.files[0])
              .then((result) => {
                const temp = JSON.parse(result);
                setJsonData(temp);
                setValidateDisabled(false);
              })
              .catch((error) => {
                event.target.value = null;
                toast.error(error.message);
              });
          }}
        ></Form.Control>
        <Button
          variant="success"
          disabled={validateDisabled}
          onClick={() => {
            const temp = jsonData;
            const mainKeysString =
              '["title","address","price","thumbnail","metadata","availability"]';
            // const availabilityKeysString = '["start","end"]';
            const addressKeysString =
              '["street","city","state","postcode","country"]';
            const metadataKeysString =
              '["propertyType","numBathrooms","bedrooms","amenities"]';
            // const amenitiesKeysString = '["essentials","features","location","safety"]'

            const mainKeys = temp.map(
              (x) => JSON.stringify(Object.keys(x)) === mainKeysString
            );

            // const availabilityKeys = temp.map(
            //   (x) =>
            //     JSON.stringify(Object.keys(x.availability)) ===
            //     availabilityKeysString
            // );

            const addressKeys = temp.map(
              (x) =>
                JSON.stringify(Object.keys(x.address)) === addressKeysString
            );

            const metadataKeys = temp.map(
              (x) =>
                JSON.stringify(Object.keys(x.metadata)) === metadataKeysString
            );

            console.log('mainK', mainKeys);
            console.log('addressK', addressKeys);
            console.log('metadataK', metadataKeys);

            const allKeys = [...mainKeys, ...addressKeys, ...metadataKeys];

            if (allKeys.every((x) => x)) {
              toast.success('All keys are valid!');
              setUploadDisabled(false);
            } else {
              toast.error('Some invalid keys, please check your JSON file');
              setUploadDisabled(true);
            }
          }}
        >
          Validate
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={uploadDisabled}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadJSONForm;
