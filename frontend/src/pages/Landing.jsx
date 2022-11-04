import React from 'react';
import Navbar from '../components/Navbar';

import Button from 'react-bootstrap/Button';

import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogin = () => {
    routeChange('/login');
  };

  const handleRegister = () => {
    routeChange('/register');
  };

  return (
    <>
      <Navbar />
      {/* For some reason I need to call this first so that the modals will show */}
      <LoginForm show={false} />
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleRegister}>Register</Button>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
    </>
  );
};
