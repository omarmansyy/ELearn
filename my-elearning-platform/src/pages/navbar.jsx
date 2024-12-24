import Link from 'next/link';
import styles from '../styles/navbar.module.css'; // Make sure this path is correct based on your project structure

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <span className={styles.brand}>EduLearn</span>
            <div className={styles.navLinks}>
                <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                <Link href="/courses" className={styles.navLink}>My Courses</Link>
                <Link href="/quizzes" className={styles.navLink}>Assignments</Link>
                <Link href="/notes" className={styles.navLink}>QuickNotes</Link>
                <Link href="/profile" className={styles.navLink}>Profile</Link>
                <Link href="/logout" className={styles.navLink}>Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;
