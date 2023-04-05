import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Link to="register">Register</Link>
      <Link to="login">Login</Link>
      <Link to="dashboard">Dashboard</Link>
    </header>
  );
};
