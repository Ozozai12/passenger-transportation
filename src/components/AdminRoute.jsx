import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ component: Component, redirectTo = '/' }) => {
  const isAdmin = useSelector(
    state => state.user.email === 'dante120591@gmail.com'
  );

  return !isAdmin ? <Navigate to={redirectTo} /> : <Component />;
};
