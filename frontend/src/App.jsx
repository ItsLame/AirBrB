import React from 'react';
import './App.css';

// Bootstrap Import
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const Home = () => {
  return <div>Home</div>
};

const About = () => {
  return <div>About</div>
};

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
