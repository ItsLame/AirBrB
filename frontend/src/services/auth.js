import api from './api';

export const register = (email, password, name) => {
  return api.post('user/auth/register', {
    email,
    password,
    name,
  });
};

export const login = (email, password) => {
  return api.post('user/auth/login', {
    email,
    password,
  });
};

export const logout = () => {
  return api.post('user/auth/logout');
};
