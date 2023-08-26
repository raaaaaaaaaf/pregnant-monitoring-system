import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { auth } from './firebase/firebaseConfig';


const user = auth.currentUser;

console.log(user);

const ProtectedRoute = ({ children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children
};

export default ProtectedRoute;