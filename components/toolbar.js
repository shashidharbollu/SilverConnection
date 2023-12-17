// toolbar.js
import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';

export const Toolbar = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div onClick={() => router.push('/')}>Home</div>
      <div onClick={() => router.push('/alarm')}>Jokes</div>
      <div onClick={() => router.push('/health')}>Health</div>
      <div onClick={() => router.push('/feed/1')}>News</div>
      <div onClick={() => (window.location.href = 'https://twitter.com/')}>Twitter</div>
      <div onClick={() => router.push('/eom')}>Inspiration</div>
      <div onClick={() => router.push('/about')}>About</div>
      
    </div>
    
  );
};
