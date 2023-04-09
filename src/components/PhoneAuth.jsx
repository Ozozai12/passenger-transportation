import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from 'redux/userSlice';
import { db } from '../firebase';

export const PhoneAuth = () => {
  const countryCode = '+38';
  const [number, setNumber] = useState(countryCode);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  useEffect(() => {
    if (number.length >= 13) {
      setIsActive(true);
    }
  }, [number.length]);

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recapcha-container',
      {
        size: 'invisible',
        callback: response => {},
      },
      auth
    );
  };

  const requestOtp = e => {
    e.preventDefault();
    if (number.length >= 13) {
      setShowOtp(true);
      generateRecapcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, number, appVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleOtpSubmit = e => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(result => {
        const user = result.user;
        dispatch(
          setUser({
            name: user.phoneNumber,
            id: user.uid,
            token: user.accessToken,
          })
        );
        setDoc(doc(db, 'users', user.uid), {
          name: user.phoneNumber,
          email: 'not specified',
          sex: 'not specified',
          role: 'not specified',
        });
        navigate('/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <>
      <button type="button" onClick={() => setShowPhoneAuth(true)}>
        Phone
      </button>
      {showPhoneAuth && (
        <>
          <form onSubmit={e => requestOtp(e)}>
            <label>
              Enter your phone number
              <input
                type="tel"
                value={number}
                onChange={e => setNumber(e.currentTarget.value)}
              />
            </label>
            <button type="submit" disabled={!isActive}>
              Send me a code
            </button>
          </form>
          {showOtp && number.length === 13 && (
            <form onSubmit={e => handleOtpSubmit(e)}>
              <label>
                <input
                  type="number"
                  value={otp}
                  onChange={e => setOtp(e.currentTarget.value)}
                />
              </label>
              <button type="submit">Sighn in</button>
            </form>
          )}
          <div id="recapcha-container"></div>
        </>
      )}
    </>
  );
};
