// --- Imports ---
// React
import React from 'react';
import { login } from '../services/auth';
import { Outlet } from 'react-router-dom';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Custom
import PropTypes from 'prop-types';
// --- End Imports ---

const emailField = (email, setEmail) => {
  return (
    <FloatingLabel className="mb-3" controlId="email" label="Email">
      <Form.Control
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </FloatingLabel>
  );
};

const passwordField = (email, setEmail) => {
  return (
    <FloatingLabel className="mb-3" controlId="password" label="Password">
      <Form.Control
        type="password"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </FloatingLabel>
  );
};

const loginButton = (email, password) => {
  return (
    <Button
      onClick={() => {
        onLoginHandler(email, password);
      }}
    >
      Login
    </Button>
  );
};

const onLoginHandler = (email, password) => {
  login(email, password)
    .then((response) => {
      toast.success('Login Success!');
    })
    .catch((error) => toast.error(error.message));
};

export const LoginForm = ({ show, handleClose }) => {
  LoginForm.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emailField(email, setEmail)}
          {passwordField(password, setPassword)}
          <p>
            {"Don't"} have an account? <Button>Register now</Button>
          </p>
        </Modal.Body>
        <Modal.Footer>{loginButton(email, password)}</Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" />
      <Outlet />
    </>
  );
};
