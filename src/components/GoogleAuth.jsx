import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { setUser } from 'redux/userSlice';
import { db } from '../firebase';

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUserByEmail = async (email, name, token, id) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    const emailNotExists = querySnapshot._snapshot.docChanges.length === 0;

    if (emailNotExists) {
      await setDoc(doc(db, 'users', id), {
        name,
        email,
        sex: 'not specified',
        role: 'not specified',
      });

      dispatch(
        setUser({
          name,
          email,
          id,
          token,
        })
      );
    } else {
      for (const doc of querySnapshot.docs) {
        dispatch(
          setUser({
            name: doc.data().name,
            email,
            id,
            token,
          })
        );
      }
    }

    navigate('/');
  };

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(async result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        await checkUserByEmail(user.email, user.displayName, token, user.uid);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <Button type="button" onClick={() => handleGoogleAuth()}>
      Sign in with Google
    </Button>
  );
};
