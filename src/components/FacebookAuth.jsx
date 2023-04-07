import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';

export const FacebookAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFacebookAuth = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(result => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            token,
          })
        );
        navigate('/');
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  return (
    <button type="button" onClick={() => handleFacebookAuth()}>
      Facebook
    </button>
  );
};
