// --- Imports ---
// React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/custom.scss';
// Pages
import { Landing } from './pages/Landing';
import { MyListings } from './pages/MyListings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
// --- End Imports ---

const App = () => {
  return (
    // Page Routes
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/my_listings" element={<MyListings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
