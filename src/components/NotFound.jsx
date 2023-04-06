import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <p>
        Oops! Something went wrong. Click <Link to="/">here</Link> to go the
        dashboard
      </p>
    </>
  );
};
