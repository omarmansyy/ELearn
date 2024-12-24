import { useEffect, useState } from 'react';
import styles from '../styles/courses.module.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Courses</h1>
      <div className={styles.courseList}>
        {courses.length === 0 ? (
          <p>No courses available</p>
        ) : (
          courses.map((course) => (
            <div key={course._id} className={styles.courseCard}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Difficulty Level:</strong> {course.difficultyLevel}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
