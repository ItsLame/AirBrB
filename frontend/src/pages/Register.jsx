import React from 'react';
import { CustomForm } from '../components/Form';

const handleOnRegister = () => {
  console.log('register!');
};

export const Register = () => {
  return (
    <CustomForm
      title="Register"
      fields={[
        // input: key, label, type, placeholder
        ['register-email', 'Email', 'email', 'name@example.com'],
        ['register-name', 'Name', 'text', 'exampleName'],
        ['register-password', 'Password', 'password', 'examplePassword'],
        [
          'register-confirm-password',
          'Confirm Password',
          'password',
          'examplePassword',
        ],
      ]}
      buttons={[
        // input: key, label, onClick
        ['register-button', 'Register', handleOnRegister],
      ]}
    />
  );
};
