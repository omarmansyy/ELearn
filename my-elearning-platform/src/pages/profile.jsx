import Link from 'next/link';
import styles from '../styles/Profile.module.css'; // Ensure to create or link the appropriate CSS

const ProfilePage = () => {
    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <Link href="/profile/userinfo">
                <button className={styles.button}>User Info</button>
            </Link>
            <Link href="/profile/edit">
                <button className={styles.button}>Edit Profile</button>
            </Link>
        </div>
    );
};

export default ProfilePage;
