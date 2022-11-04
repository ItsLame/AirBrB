import React from 'react';
import { RegisterForm } from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    // go back to previous page
    navigate(-1);
  };

  return <RegisterForm show={true} handleClose={handleClose} />;
};
