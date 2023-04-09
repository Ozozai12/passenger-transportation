import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

export const AdminRoute = ({ component: Component, redirectTo = '/' }) => {
  const isAdmin = useSelector(state => state.user.email === adminEmail);

  return !isAdmin ? <Navigate to={redirectTo} /> : <Component />;
};
