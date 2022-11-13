import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import appConfig from './config.json';
import Landing from './pages/Landing';
import Listing from './pages/Listing';
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
        {/* Landing page */}
        <Route
          path="/"
          element={
            <Landing
              token={token}
              setToken={setToken}
              email={email}
              setAppEmail={setEmail}
            />
          }
        >
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
        {/* My listings (dont need login/register here because these actions arent possible - to view this page login is required) */}
        {token && (
          <Route
            path="my_listings/*"
            element={
              <MyListings
                token={token}
                setToken={setToken}
                email={email}
                setAppEmail={setEmail}
              />
            }
          />
        )}

        {/* Single listing page */}
        <Route
          path="listing/:listingId/*"
          element={
            <Listing
              token={token}
              setToken={setToken}
              email={email}
              setAppEmail={setEmail}
            />
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
