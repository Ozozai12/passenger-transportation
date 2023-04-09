import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import {
  collection,
  query,
  setDoc,
  doc,
  where,
  getDocs,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

export const FacebookAuth = () => {
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

  const handleFacebookAuth = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(async result => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        await checkUserByEmail(user.email, user.displayName, token, user.uid);
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
