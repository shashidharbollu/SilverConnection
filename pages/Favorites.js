// pages/favorites.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/Favorites.module.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Update the path

export const Favorites = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesRef = collection(db, 'favorites');
        const favoritesQuery = query(favoritesRef, where('userId', '==', 'user123'));

        const querySnapshot = await getDocs(favoritesQuery);
        const favoritesList = [];

        querySnapshot.forEach((doc) => {
          favoritesList.push(doc.data());
        });

        setFavorites(favoritesList);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchFavorites();
  }, []); // Fetch favorites when the component mounts

  return (
    <div className="page-container">
      <Head>
        <title>Favorite Articles</title>
      </Head>
      <div className={styles.main}>
        <h1>Your Favorite Articles</h1>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((favorite, index) => (
              <li key={index} className={styles.post}>
                <h1 onClick={() => (window.location.href = favorite.url)}>{favorite.title}</h1>
                {!!favorite.urlToImage && <img src={favorite.urlToImage} />}
                <p>{favorite.description}</p>
                {/* Add more details if needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
