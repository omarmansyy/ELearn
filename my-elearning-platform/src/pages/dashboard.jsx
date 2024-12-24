import { useEffect, useState } from 'react';
import Navbar from './navbar'; 
import styles from '../styles/dashboard.module.css'
const Dashboard = () => {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Basics', status: 'In Progress' },
    { id: 2, title: 'Advanced JavaScript', status: 'Completed' },
    { id: 3, title: 'Node.js & Express', status: 'Not Started' },
  ]);

  useEffect(() => {
    // Simulated API call
  }, []);

  return (
    <div className={styles.dashboardContainer}>
     <Navbar/>
    </div>
  );
};

export default Dashboard;
