import React from 'react';
import { CustomForm } from '../components/Form';

const handleOnLogin = () => {
  console.log('login!');
};

export const Login = () => {
  return (
    <CustomForm
      title="Login"
      fields={[
        // input: key, label, type, placeholder
        ['login-email', 'Email', 'email', 'name@example.com'],
        ['login-password', 'Password', 'password', 'examplePassword'],
      ]}
      buttons={[
        // input: key, label, onClick
        ['login-button', 'Login', handleOnLogin],
      ]}
    />
  );
};
