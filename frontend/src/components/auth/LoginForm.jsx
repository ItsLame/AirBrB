import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { login } from '../../services/auth';

const LoginForm = ({ setToken, setAppEmail }) => {
  LoginForm.propTypes = {
    setToken: PropTypes.func,
    setAppEmail: PropTypes.func,
  };

  const [validated, setValidated] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      login(email, password)
        .then((response) => {
          setToken(response.data.token);
          setAppEmail(email);
          handleClose();
          toast.success('Logged in!');
        })
        .catch((error) => toast.error(error.response.data.error));
    }

    setValidated(true);
  };

  const handleClose = () => {
    navigate('..');
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Email address field */}
          <FloatingLabel
            className="mb-3"
            controlId="email"
            label="Email address"
          >
            <Form.Control
              name="login-email"
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

          {/* Password field */}
          <FloatingLabel className="mb-3" controlId="password" label="Password">
            <Form.Control
              name="login-password"
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

          <p>
            {"Don't"} have an account?
            <Button
              variant="dark"
              className="ms-1"
              onClick={() => navigate('../register')}
            >
              Register now
            </Button>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" name="login-submit" type="submit">
            Log in
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginForm;
