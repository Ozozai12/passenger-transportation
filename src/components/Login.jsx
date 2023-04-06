import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleAuth } from './GoogleAuth';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (email, pass, event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate('/');
      })
      .catch(error => {
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          alert('Wrong email or password');
        }
      });
  };

  return (
    <div>
      <h1>For using the passenger transporter, you should login first</h1>
      <form onSubmit={event => handleSubmit(email, pass, event)}>
        <label>
          Enter your email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Enter password
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.currentTarget.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        You don't have an account? <Link to="/register">Register</Link> then!
      </p>
      <GoogleAuth />
    </div>
  );
};
