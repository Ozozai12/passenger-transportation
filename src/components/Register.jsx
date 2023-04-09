import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { setUser } from 'redux/userSlice';
import { db } from '../firebase';

import { SignGroup } from './SignGroup';

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (name, email, pass, role, event) => {
    event.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async ({ user }) => {
        dispatch(
          setUser({
            name: name,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          role,
        });
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

    navigate('/');
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
        For using the PT, you should register first
      </h1>
      <div>
        <Form onSubmit={event => handleSubmit(name, email, pass, role, event)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="For example, Vova"
              value={name}
              required
              onChange={e => setName(e.currentTarget.value)}
            />
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Choose your role</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={role}
              required
              onChange={e => setRole(e.currentTarget.value)}
            >
              <option selected value="driver">
                Driver
              </option>
              <option value="passenger">Passenger</option>
              <option value="manager">Manager</option>
            </Form.Select>
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
              Register
            </Button>
          </div>
        </Form>

        <p style={{ textAlign: 'center', marginTop: 20 }}>
          Already have an account? <Link to="/login">Login</Link> then!
        </p>
        <SignGroup />
      </div>
    </div>
  );
};
