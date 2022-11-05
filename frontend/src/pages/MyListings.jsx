import React from 'react';
import { Outlet } from 'react-router-dom';

const MyListings = () => {
  return (
    <div>
      MyListings <Outlet />
    </div>
  );
};

export default MyListings;
