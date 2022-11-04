// React and CSS Import
import React from 'react';
import './App.css';

// Bootstrap Import
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

// React Router DOM Import
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Import Pages
import { Landing } from './pages/Landing';
import { Listings } from './pages/Listings';

function App () {
  return (
    // Page Routes
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
