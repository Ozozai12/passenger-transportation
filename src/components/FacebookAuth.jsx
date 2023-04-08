import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/userSlice';

import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

export const FacebookAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userByEmail;
  let userName;

  const searchUserByEmail = async email => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      userByEmail = doc.data().email;
      userName = doc.data().name;
    });
    return userByEmail;
  };

  const searchUsersName = async email => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      userName = doc.data().name;
    });
    return userName;
  };

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
            name: userByEmail === user.email ? userName : user.displayName,
            email: user.email,
            id: user.uid,
            token,
          })
        );
        // navigate('/');
        console.log(userByEmail);
        console.log(userName);
        searchUserByEmail(user.email);
        searchUsersName(user.email);
        if (userByEmail !== user.email) {
          addDoc(collection(db, 'users'), {
            name: user.displayName,
            email: user.email,
            sex: 'not specified',
            role: 'not specified',
          });
        }
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
