// pages/feed/[slug].js
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../components/toolbar';
import { useState, useEffect } from 'react';

export const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    setLoading(false); // Set loading to false when articles are fetched
  }, [articles]);

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
            className={pageNumber === 6 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 6) {
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
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&page=${pageNumber}`,
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
