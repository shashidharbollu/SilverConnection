// pages/feed/[slug].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../components/toolbar';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Update the path

export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesRef = collection(db, 'favorites');
        const favoritesQuery = query(favoritesRef, where('userId', '==', 'user123'));

        const querySnapshot = await getDocs(favoritesQuery);
        const favoritesList = [];

        querySnapshot.forEach((doc) => {
          favoritesList.push({ ...doc.data(), id: doc.id });
        });

        setFavorites(favoritesList);

        // Initialize the favorite status for each article
        const status = {};
        articles.forEach((article) => {
          status[article.title] = !!favoritesList.find((fav) => fav.title === article.title);
        });
        setFavoriteStatus(status);

        setLoading(false); // Set loading to false when favorites are fetched
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchFavorites();
  }, [articles]);

  const updateLocalStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  useEffect(() => {
    // Load favorites from localStorage on mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Initialize the favorite status for each article from localStorage
    const status = {};
    articles.forEach((article) => {
      status[article.title] = !!storedFavorites.find((fav) => fav.title === article.title);
    });
    setFavoriteStatus(status);

    setLoading(false); // Set loading to false when favorites are loaded from localStorage
  }, [articles]);

  const handleFavorite = async (article) => {
    try {
      const favoritesRef = collection(db, 'favorites');
      const existingFavorite = favorites.find((fav) => fav.title === article.title);

      if (existingFavorite) {
        const favoriteDoc = query(favoritesRef, where('id', '==', existingFavorite.id));
        const snapshot = await getDocs(favoriteDoc);

        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });

        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.title !== article.title));
        updateLocalStorage(favorites.filter((fav) => fav.title !== article.title));

        setFavoriteStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          newStatus[article.title] = false;
          return newStatus;
        });

        alert('Removed from favorites!');
      } else {
        const newFavorite = { ...article, userId: 'user123' };
        const docRef = await addDoc(favoritesRef, newFavorite);

        setFavorites((prevFavorites) => [...prevFavorites, { ...newFavorite, id: docRef.id }]);
        updateLocalStorage([...favorites, { ...newFavorite, id: docRef.id }]);

        setFavoriteStatus((prevStatus) => {
          const newStatus = { ...prevStatus };
          newStatus[article.title] = true;
          return newStatus;
        });

        alert('Added to favorites!');
      }
    } catch (error) {
      console.error('Error handling favorites:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return articles.length ? (
    <>
      <Head>
        <meta property="og:image" content={articles[0]?.urlToImage} />
        <meta property="og:description" content={articles[0]?.description} />
        <meta property="og:title" content={articles[0]?.title + ' and more!'} />
      </Head>
      <div className="page-container">
        <Toolbar />

        <div className={styles.main}>
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
              <button
                onClick={() => handleFavorite(article)}
                className={styles.favoriteButton}
              >
                {favoriteStatus[article.title] ? '❌ Remove' : '❤️ Favorite'}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.paginator}>
          <div
            className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber > 1) {
                router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Previous Page
          </div>

          <div>#{pageNumber}</div>

          <div
            className={pageNumber === 5 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 5) {
                router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Next Page
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Oops! No articles for this page</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = parseInt(pageContext.query.slug, 10);

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  try {
    const apiResponse = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
        },
      }
    ).then((res) => res.json());

    const { articles } = apiResponse;

    return {
      props: {
        articles: articles || [],
        pageNumber,
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error.message);

    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
};

export default Feed;
