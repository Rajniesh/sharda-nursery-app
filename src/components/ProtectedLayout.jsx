import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedLayout = () => {
  const user = auth.currentUser;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;