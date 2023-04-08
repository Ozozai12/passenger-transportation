import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'redux/userSlice';
import { db } from '../firebase';

import { GoogleAuth } from './GoogleAuth';
import { FacebookAuth } from './FacebookAuth';
import { PhoneAuth } from './PhoneAuth';

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  let nameByEmail;

  const searchNameByEmail = async email => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      nameByEmail = doc.data().name;
    });
    return nameByEmail;
  };

  const handleSubmit = (email, pass, event) => {
    event.preventDefault();
    const auth = getAuth();
    searchNameByEmail(email);
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            name: nameByEmail,
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
      <FacebookAuth />
      <PhoneAuth />
    </div>
  );
};
