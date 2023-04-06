import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from 'redux/userSlice';

export const Header = () => {
  const user = useSelector(state => state.user.email);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <header>
      <Link to="register">Register</Link>
      <Link to="login">Login</Link>
      <Link to="dashboard">Dashboard</Link>
      {user ? (
        <p>
          {user}
          <button type="button" onClick={() => handleLogout()}>
            Logout
          </button>
        </p>
      ) : (
        ''
      )}
    </header>
  );
};
