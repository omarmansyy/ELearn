import { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Basics', status: 'In Progress' },
    { id: 2, title: 'Advanced JavaScript', status: 'Completed' },
    { id: 3, title: 'Node.js & Express', status: 'Not Started' },
  ]);

  useEffect(() => {
    // Here you could fetch user info and courses from an API
    // For now, we're using mock data.
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.profile}>
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Profile"
            className={styles.profileImage}
          />
          <h2 className={styles.profileName}>{user.name}</h2>
          <p className={styles.profileEmail}>{user.email}</p>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li><a href="/dashboard" className={styles.navLink}>Dashboard</a></li>
            <li><a href="/courses" className={styles.navLink}>My Courses</a></li>
            <li><a href="/assignments" className={styles.navLink}>Assignments</a></li>
            <li><a href="/resources" className={styles.navLink}>Resources</a></li>
            <li><a href="/profile" className={styles.navLink}>Profile</a></li>
            <li><a href="/logout" className={styles.navLink}>Logout</a></li>
          </ul>
        </nav>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Welcome to Your Dashboard</h1>
        <div className={styles.courses}>
          <h2>Your Courses</h2>
          <div className={styles.courseList}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseStatus}>Status: {course.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <div className={styles.linkCard}>
            <a href="/new-course" className={styles.linkButton}>Create a New Course</a>
          </div>
          <div className={styles.linkCard}>
            <a href="/forum" className={styles.linkButton}>Course Forum</a>
          </div>
          <div className={styles.linkCard}>
            <a href="/calendar" className={styles.linkButton}>Your Calendar</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
