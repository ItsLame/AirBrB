// --- Imports ---
// React
import React from 'react';
import { register } from '../services/auth';
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

const nameField = (name, setName) => {
  return (
    <FloatingLabel className="mb-3" controlId="text" label="Name">
      <Form.Control
        type="text"
        placeholder="exampleName"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </FloatingLabel>
  );
};

const passwordField = (password, setPassword) => {
  return (
    <FloatingLabel className="mb-3" controlId="password" label="Password">
      <Form.Control
        type="password"
        placeholder="examplePassword"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </FloatingLabel>
  );
};

const passwordConfirmField = (passwordConfirm, setPasswordConfirm) => {
  return (
    <FloatingLabel
      className="mb-3"
      controlId="passwordConfirm"
      label="Confirm Password"
    >
      <Form.Control
        type="password"
        placeholder="examplePassword"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
    </FloatingLabel>
  );
};

const registerButton = (email, name, password, passwordConfirm) => {
  return (
    <Button
      onClick={() => {
        onRegisterHandler(email, name, password, passwordConfirm);
      }}
    >
      Register
    </Button>
  );
};

const onRegisterHandler = (email, name, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    toast.error("Password doesn't match!");
  } else {
    register(email, name, password)
      .then((response) => {
        toast.success('Register Success!');
      })
      .catch((error) => toast.error(error.message));
  }
};

export const RegisterForm = ({ show, handleClose }) => {
  RegisterForm.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
  };

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emailField(email, setEmail)}
          {nameField(name, setName)}
          {passwordField(password, setPassword)}
          {passwordConfirmField(passwordConfirm, setPasswordConfirm)}
          <p>
            Already registered? <Button>Login Now</Button>
          </p>
        </Modal.Body>
        <Modal.Footer>
          {registerButton(email, name, password, passwordConfirm)}
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" />
      <Outlet />
    </>
  );
};
