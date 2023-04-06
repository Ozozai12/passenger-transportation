import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { AuthProvider } from 'auth';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';


export const Register = () => {
  const dispatch = useDispatch();

  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (email, pass) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        // Signed in
        // const user = userCredential.user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
 
        );

        // ...
      })
      .catch(error => {
        // const errorMessage = error.message;
        // const errorCode = error.code;
        console.error(error);
      });
  };

  return (
    <div>
      <h1>For using the passenger transporter, you should register first</h1>
      <form onSubmit={() => handleSubmit(email, pass)}>
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
      {/* <AuthProvider /> */}
    </div>
  );
};
