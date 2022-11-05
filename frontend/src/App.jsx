import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import appConfig from './config.json';
import Landing from './pages/Landing';
import MyListings from './pages/MyListings';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [token, setToken] = React.useState(
    localStorage.getItem(appConfig.LS_ACCESS_TOKEN)
  );

  React.useEffect(() => {
    localStorage.setItem(appConfig.LS_ACCESS_TOKEN, token);
  }, [token]);

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
          <Route path="login" element={<LoginForm setToken={setToken} />} />
          <Route
            path="register"
            element={<RegisterForm setToken={setToken} />}
          />
        </Route>
        <Route
          path="/my_listings"
          element={<MyListings token={token} setToken={setToken} />}
        >
          <Route path="login" element={<LoginForm setToken={setToken} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
