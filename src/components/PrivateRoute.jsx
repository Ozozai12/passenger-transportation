import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(state => state.user.email);

  return !isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};
