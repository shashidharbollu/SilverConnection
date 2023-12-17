// pages/about.js
import React from 'react';
import { Toolbar } from '../components/toolbar';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1 className={styles['about-heading']}>About Our App</h1>
        <p className={styles['about-paragraph']}>
          Welcome to our application "SilverConnection", designed with love and care for the older generation.
          In this fast-paced world, we understand that spending quality time with our elders
          is precious but not always easy. That's why we've created an app tailored to their
          needs and interests.
        </p>

        <h2 className={styles['about-subheading']}>Features</h2>
        <ul className={styles['about-list']}>
        <li>
            <strong>News: </strong> Stay updated with the latest news tailored just for you.
          </li>
          <br></br>
          <li>
            <strong>Joke Generator: </strong> Lift up your mood with a touch of humor. Laughter
            is the best medicine!
          </li>
          <br></br>
          <li>
            <strong>Twitter Integration: </strong> Connect with others and socialize through
            our integrated Twitter feature. Share your thoughts and stay connected with loved ones.
          </li>
        </ul>

        <h2 className={styles['about-subheading']}>Our Mission</h2>
        <p className={styles['about-paragraph']}>
          Our mission is to provide a delightful experience for the older generation by
          offering a platform that combines news, humor, and social interaction. We hope
          our app brings joy, information, and connection to the lives of our users.
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default About;
