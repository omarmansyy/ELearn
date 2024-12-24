import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Ensure this file exists or create your own CSS module

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>EduLearn</h1>
            <p className={styles.description}>
                Welcome to EduLearn, your portal to learning and growth. Discover new opportunities to enhance your skills and knowledge in a diverse range of subjects.
            </p>
            <div className={styles.buttonContainer}>
                <Link href="/login">
                    <button className={styles.button}>Login</button>
                </Link>
                <Link href="/register">
                    <button className={styles.button}>Register</button>
                </Link>
            </div>
        </div>
    );
}
