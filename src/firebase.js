// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'pass-trans.firebaseapp.com',
  projectId: 'pass-trans',
  storageBucket: 'pass-trans.appspot.com',
  messagingSenderId: '155885616536',
  appId: '1:155885616536:web:2fa26a2751f48bae207fed',
  measurementId: 'G-B3XCHK1VC3',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
