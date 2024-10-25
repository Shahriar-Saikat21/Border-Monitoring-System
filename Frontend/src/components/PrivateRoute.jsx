import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('access_token');
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;