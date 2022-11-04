import React from 'react';
import { CustomForm } from '../components/Form';

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
        // input: key, label
        ['register-button', 'Register'],
      ]}
    />
  );
};
