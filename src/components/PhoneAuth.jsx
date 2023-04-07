import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';

export const PhoneAuth = () => {
  const countryCode = '+38063621392';
  const [number, setNumber] = useState(countryCode);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth();
  const userInfo = useSelector(state => state.user);

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
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch(error => {
          console.log(error);
          // Error; SMS not sent
          // ...
        });
    }
  };

  const handleOtpSubmit = e => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(result => {
        // User signed in successfully.
        const user = result.user;
        dispatch(
          setUser({
            name: user.phoneNumber,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const showUser = () => {
    console.log(userInfo);
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
          <button type="button" onClick={() => showUser()}>
            Show me
          </button>
          <div id="recapcha-container"></div>
        </>
      )}
    </>
  );
};
