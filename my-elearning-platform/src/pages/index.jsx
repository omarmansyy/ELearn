import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Welcome to EduLearn</h1>
        <p>
          Discover a new way of learning with EduLearn, your portal to
          enhancing skills through expert courses and materials.
        </p>
        <div>
          <Link href="/login">
            <button className={styles.button} style={{ marginRight: '10px' }}>Login</button>
          </Link>
          <Link href="/register">
            <button className={styles.button}>Sign Up</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
