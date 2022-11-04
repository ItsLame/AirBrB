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
  console.log('LOGIN');
};

export const LoginForm = () => {
  const [email, setEmail] = React.useState([]);
  const [password, setPassword] = React.useState([]);

  return (
    <Card>
      <Card.Header as="h5">Login</Card.Header>
      <Card.Body>
        {emailField(email, setEmail)}
        {passwordField(password, setPassword)}
        {loginButton(email, password)}
      </Card.Body>
    </Card>
  );
};
