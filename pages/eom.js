import Head from 'next/head';
import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';
import avatar from '.././components/images/avatar.jpeg'
import Image from 'next/image';

export const EOM = () => {
  return (
    <>
      <Head>
        <title>Employee Of The Month</title>
        <meta
          name="description"
          content={`This month's employee of the month is shashidhar`}
        />

        <meta property="og:image" content={avatar} /> {/* Provide a valid image URL */}
        <meta property="og:title" content="Employee Of The Month" />
        <meta
          property="og:description"
          content={`This month's employee of the month is shashidhar`}
        />

        <meta property="twitter:image" content={avatar} />
        <meta property="twitter:title" content="Employee Of The Month" />
        <meta
          property="twitter:description"
          content={`This month's employee of the month is Shashidhar Bollu`}
        />
      </Head>

      <div className="page-container">
        <Toolbar />

        <div className={styles.main}>
          <h1>Employee Of The Month</h1>

          <div className={styles.employeeOfTheMonth}>
            <h3>Shashidhar Bollu</h3>
            <h6>Software Engineer</h6>
            <Image src={avatar} alt="employee"  />
            <p>Software Developer and CEO</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EOM;
