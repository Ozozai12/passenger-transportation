import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { removeUser } from 'redux/userSlice';

export const Header = () => {
  const user = useSelector(state => state.user.name);
  const admin = useSelector(
    state => state.user.email === 'dante120591@gmail.com'
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <header>
      {!user && (
        <>
          <Link to="register">Register</Link>
          <Link to="login">Login</Link>
        </>
      )}
      {user && (
        <>
          <Link to="dashboard">Dashboard</Link>
          <Link to="user">My account</Link>
        </>
      )}
      {admin && <Link to="admin">Editing users</Link>}
      {user ? (
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      ) : (
        ''
      )}
    </header>
  );
};
