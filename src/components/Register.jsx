import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleAuth } from 'components/GoogleAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (email, pass, event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
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
        console.log(error.message);
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          alert('User with this email already exists');
        }
        if (
          error.message ===
          'Firebase: Password should be at least 6 characters (auth/weak-password).'
        ) {
          alert('Password should be at least 6 characters');
        }
      });
  };

  return (
    <div>
      <h1>For using the passenger transporter, you should register first</h1>
      <form onSubmit={event => handleSubmit(email, pass, event)}>
        {/* <label>
          Type your name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.currentTarget.value)}
          />
        </label> */}
        <br />
        <label>
          Type your email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Choose password
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.currentTarget.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link> then!
      </p>
      <GoogleAuth />
    </div>
  );
};
