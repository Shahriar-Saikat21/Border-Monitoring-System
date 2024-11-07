import {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const {auth} = useContext(AuthContext)
  console.log(`from context ${auth}`)
  return auth ? children : <Navigate to="/" replace/>;
};

export default PrivateRoute;