import { useEffect, useState } from 'react';
import styles from '../styles/Courses.module.css'; // Make sure to create this CSS module
import Navbar from './navbar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load courses: ' + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses: {error}</p>;

  return (
    <div className={styles.container}>
      <Navbar/>
      <h1 className={styles.heading}>Available Courses</h1>
      <div className={styles.courseList}>
        {courses.map(course => (
          <div key={course.id} className={styles.courseCard}>
            <h2 className={styles.courseTitle}>{course.title}</h2>
            <p>{course.description}</p>
            <span className={styles.courseStatus}>Status: {course.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
