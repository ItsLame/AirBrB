import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { register } from '../../services/auth';

const RegisterForm = ({ setToken, setAppEmail }) => {
  RegisterForm.propTypes = {
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const [validated, setValidated] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      if (password !== confirmPassword) {
        toast.error("Passwords don't match!");
      } else {
        register(email, password, name)
          .then((response) => {
            setToken(response.data.token);
            setAppEmail(email);
            handleClose();
            toast.success(`Registered account: ${name}!`);
          })
          .catch((error) => toast.error(error.response.data.error));
      }
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate('..');
  };

  return (
    <Modal id="register-modal" show={true} onHide={handleClose} centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Email address field */}
          <FloatingLabel
            className="mb-3"
            controlId="email"
            label="Email address"
          >
            <Form.Control
              name="register-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* Name field */}
          <FloatingLabel className="mb-3" controlId="name" label="Name">
            <Form.Control
              name="register-name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* Password field */}
          <FloatingLabel className="mb-3" controlId="password" label="Password">
            <Form.Control
              name="register-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* Confirm password field */}
          <FloatingLabel
            className="mb-3"
            controlId="confirmPassword"
            label="Confirm your password"
          >
            <Form.Control
              name="register-password-confirm"
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please confirm your password
            </Form.Control.Feedback>
          </FloatingLabel>

          <p>
            Already have an account?
            <Button
              variant="dark"
              aria-haspopup="dialog"
              className="ms-1"
              onClick={() => navigate('../login')}
            >
              Log in
            </Button>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button name="register-submit" variant="primary" type="submit">
            Register
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegisterForm;
