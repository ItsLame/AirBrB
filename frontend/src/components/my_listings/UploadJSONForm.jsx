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
  // const [uploadDisabled, setUploadDisabled] = React.useState(true);
  const [uploadDisabled] = React.useState(true);
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
          onClick={handleClose}
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
