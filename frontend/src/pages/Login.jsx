import React from 'react';
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    // go back to previous page
    navigate(-1);
  };

  return <LoginForm show={true} handleClose={handleClose} />;
};
