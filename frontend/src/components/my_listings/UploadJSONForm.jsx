import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { fileToText } from '../../helpers';

const UploadJSONForm = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/my_listings');
  };

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
              .then((result) => console.log(result))
              .catch((error) => {
                event.target.value = null;
                toast.error(error.message);
              });
          }}
        ></Form.Control>
        <Button variant="success" onClick={handleClose}>
          Validate
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={true}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadJSONForm;
