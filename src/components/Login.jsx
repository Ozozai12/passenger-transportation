import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SignGroup } from './SignGroup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { setUser } from 'redux/userSlice';
import { db } from '../firebase';

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
    <div
      style={{
        width: 600,

        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>
        For using the PT, you should login first
      </h1>
      <Form onSubmit={event => handleSubmit(email, pass, event)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="youremail@mail.com"
            value={email}
            required
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="der_parol"
            value={pass}
            required
            onChange={e => setPass(e.currentTarget.value)}
          />
        </Form.Group>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 60,
          }}
        >
          <Button variant="primary" type="submit" style={{ width: 300 }}>
            Login
          </Button>
        </div>
      </Form>
      <p style={{ textAlign: 'center', marginTop: 20 }}>
        You don't have an account? <Link to="/register">Register</Link> then!
      </p>
      <SignGroup />
    </div>
  );
};
