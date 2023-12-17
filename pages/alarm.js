// pages/jokes.js
import { useEffect, useState } from 'react';
import { Toolbar } from '../components/toolbar';
import styles from '../styles/Jokes.module.css';

const Jokes = () => {
  const [joke, setJoke] = useState('');

  const getJoke = async () => {
    const jokeData = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    });
    const jokeObj = await jokeData.json();
    setJoke(jokeObj.joke);
  };

  useEffect(() => {
    getJoke();
  }, []);

  return (
    <div className={styles.container}>
      <Toolbar />
      <section>
        <h1 className={styles.title}>Random Dad Jokes Generator</h1>
        <p >Laughter is the heartbeat of a healthy soul and Body.</p>
        <div className={styles.content}>
          <div className={styles.joke}>
            <p>{joke}</p>
          </div>
          <button className={styles.button} onClick={getJoke}>
            Get a Dad Joke
          </button>
        </div>
      </section>
    </div>
  );
};

export default Jokes;
