import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Add this import

const firebaseConfig = {
    apiKey: "AIzaSyCJj_lThoO96LjjjGz0W04mwAqM0HB_t_I",
    authDomain: "news-66498.firebaseapp.com",
    projectId: "news-66498",
    storageBucket: "news-66498.appspot.com",
    messagingSenderId: "888885086627",
    appId: "1:888885086627:web:cb337013127c62125bb216"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore and export

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };
export default auth;