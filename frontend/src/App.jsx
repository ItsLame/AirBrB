// React Import
import React from 'react';

// Bootstrap Import
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/custom.scss';

// React Router DOM Import
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import { Landing } from './pages/Landing';
import { MyListings } from './pages/MyListings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App () {
  return (
    // Page Routes
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my_listings" element={<MyListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
