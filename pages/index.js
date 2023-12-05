// index.js

import { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import styles from '../styles/Home.module.css';
import { Toolbar } from '../components/toolbar';

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setError(null); // Clear any previous error messages
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, onAuthStateChanged will update the user state
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // If successful, onAuthStateChanged will update the user state
      setShowLogin(true); // Redirect to the login form after a successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const inputStyles = {
    margin: '10px 0',
    padding: '8px',
    fontSize: '16px',
    width: '30%',
  };

  const buttonStyles = {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const linkStyles = {
    color: 'black',
    cursor: 'pointer',
    textDecoration: 'underline',
  };

  const errorStyles = {
    color: 'red',
    marginTop: '10px',
  };

  const renderLoginForm = () => (
    <>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Next.js News App</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyles}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyles}
      />
      <button onClick={handleLogin} style={buttonStyles}>
        Login
      </button>
      <p style={{ marginTop: '10px' }}>
        Don't have an account?{' '}
        <span onClick={toggleForm} style={linkStyles}>
          Sign up
        </span>
      </p>
      {error && <p style={{ ...errorStyles, fontSize: '14px' }}>{error}</p>}
    </>
  );

  const renderSignupForm = () => (
    <>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyles}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyles}
      />
      <button onClick={handleSignup} style={buttonStyles}>
        Sign Up
      </button>
      <p style={{ marginTop: '10px' }}>
        Already have an account?{' '}
        <span onClick={toggleForm} style={linkStyles}>
          Login
        </span>
      </p>
      {error && <p style={{ ...errorStyles, fontSize: '14px' }}>{error}</p>}
    </>
  );

  return (
    <div className="page-container">
      <div className={styles.main}>
        {user ? (
          <>
            <h1 style={{ fontSize: '24px' }}>Welcome, {user.email}!</h1>
            <button onClick={handleLogout} style={buttonStyles}>
              Logout
            </button>
            <Toolbar />
          </>
        ) : showLogin ? (
          renderLoginForm()
        ) : (
          renderSignupForm()
        )}
      </div>
    </div>
  );
}
