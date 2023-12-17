// index.js

import { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import styles from '../styles/Home.module.css';
import { Toolbar } from '../components/toolbar';

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setError(null);
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
      alert('Login successful!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await createUserWithEmailAndPassword(auth, email, password, {
        displayName: name,
      });
      setShowLogin(true);
      alert('Signup successful! Please login.');
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
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        style={inputStyles}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyles}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
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

  const renderMotivationalQuote = () => {
    if (user) {
      return (
        <div className={styles.motivationContainer}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>
            Embrace the wisdom that comes with age, for it is a beautiful journey.
          </h2>
          <p>This app is your perfect companion on the beautiful journey of life.</p>
          <p>Cherish the moments and enjoy the stories.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="page-container">
      <div className={styles.main}>
        {user ? (
          <>
            <div className={styles.userContainer}>
              <h1 style={{ fontSize: '24px', marginRight: '20px' }}>Welcome, {user.displayName || user.email}! &nbsp; &nbsp; &nbsp; &nbsp; <button onClick={handleLogout} style={buttonStyles}>
                Logout
              </button></h1>
            </div>
            <span> <Toolbar /> </span>
            {renderMotivationalQuote()}
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
