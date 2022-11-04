import React from 'react';

// Bootstrap Import
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';

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

const registerButton = (password, passwordConfirm) => {
  return (
    <Button
      onClick={() => {
        onRegisterHandler(password, passwordConfirm);
      }}
    >
      Register
    </Button>
  );
};

const onRegisterHandler = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    console.log('NO');
  }
};

export const RegisterForm = () => {
  const [email, setEmail] = React.useState([]);
  const [name, setName] = React.useState([]);
  const [password, setPassword] = React.useState([]);
  const [passwordConfirm, setPasswordConfirm] = React.useState([]);

  return (
    <Card>
      <Card.Header as="h5">Register</Card.Header>
      <Card.Body>
        {emailField(email, setEmail)}
        {nameField(name, setName)}
        {passwordField(password, setPassword)}
        {passwordConfirmField(passwordConfirm, setPasswordConfirm)}
        {registerButton(password, passwordConfirm)}
      </Card.Body>
    </Card>
  );
};
