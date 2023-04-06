import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app, googleAuthProvider } from './firebase';

export const AuthProvider = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(potentialUser => {
      if (potentialUser != null) {
        return setUser(potentialUser);
      }
      signInWithPopup(auth, googleAuthProvider).then(credentials =>
        setUser(credentials.user).catch(err => console.error(err))
      );
    });

    return unsub;
  }, [auth]);

  return user != null ? <>{user.displayName}</> : <>loading</>;
};
