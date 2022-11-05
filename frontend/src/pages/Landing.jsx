import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Navbar from '../components/Navbar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Button onClick={() => navigate('login')}>Login</Button>
      <Button onClick={() => navigate('login')}>Register</Button>
      <Outlet />
    </>
  );
};

export default Landing;
