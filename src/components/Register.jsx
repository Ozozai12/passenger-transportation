import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

import { GoogleAuth } from 'components/GoogleAuth';
import { FacebookAuth } from './FacebookAuth';
import { PhoneAuth } from './PhoneAuth';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [sex, setSex] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (name, email, pass, sex, role, event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            name: name,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
      })
      .catch(error => {
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
    await addDoc(collection(db, 'users'), {
      name,
      email,
      sex,
      role,
    });
    navigate('/');
  };

  return (
    <div>
      <h1>For using the passenger transporter, you should register first</h1>
      <form
        onSubmit={event => handleSubmit(name, email, pass, sex, role, event)}
      >
        <label>
          Type your name
          <input
            type="text"
            value={name}
            required
            onChange={e => setName(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Type your email
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Choose password
          <input
            type="password"
            value={pass}
            required
            onChange={e => setPass(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Choose your sex
          <input
            type="text"
            value={sex}
            required
            onChange={e => setSex(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Choose your role
          <input
            type="text"
            value={role}
            required
            onChange={e => setRole(e.currentTarget.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link> then!
      </p>
      <GoogleAuth />
      <FacebookAuth />
      <PhoneAuth />
    </div>
  );
};
