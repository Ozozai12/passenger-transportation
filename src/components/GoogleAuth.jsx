import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token,
          })
        );
        navigate('/');
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(`${errorMessage}`);
      });
  };

  return (
    <button type="button" onClick={() => handleGoogleAuth()}>
      Google
    </button>
  );
};
