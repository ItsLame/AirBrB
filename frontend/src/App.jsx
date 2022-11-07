import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import appConfig from './config.json';
import Landing from './pages/Landing';
import MyListings from './pages/MyListings';
import NotFound from './pages/NotFound';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

const App = () => {
  const [token, setToken] = React.useState(
    localStorage.getItem(appConfig.LS_ACCESS_TOKEN) ?? ''
  );
  const [email, setEmail] = React.useState(
    localStorage.getItem(appConfig.LS_EMAIL) ?? ''
  );

  React.useEffect(() => {
    localStorage.setItem(appConfig.LS_ACCESS_TOKEN, token);
  }, [token]);

  React.useEffect(() => {
    localStorage.setItem(appConfig.LS_EMAIL, email);
  }, [email]);

  return (
    <BrowserRouter>
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Landing token={token} setToken={setToken} />}>
          <Route
            path="login"
            element={<LoginForm setToken={setToken} setAppEmail={setEmail} />}
          />
          <Route
            path="register"
            element={
              <RegisterForm setToken={setToken} setAppEmail={setEmail} />
            }
          />
        </Route>

        {/* Only define /my_listings route if token exists */}
        {token && (
          <Route
            path="/my_listings/*"
            element={
              <MyListings token={token} setToken={setToken} email={email} />
            }
          />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
