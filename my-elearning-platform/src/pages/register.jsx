import { useState } from 'react';
import styles from '../styles/register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');  // Default role
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const registerData = { name, email, password, role };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to login or dashboard after successful registration
        window.location.href = '/login';  // Or navigate programmatically
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create an Account</h1>
        <p className={styles.subtitle}>Join us and start learning today!</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="role" className={styles.label}>Role</label>
          <select
            id="role"
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.footer}>
          Already have an account? <a href="/login" className={styles.link}>Log In</a>.
        </p>
      </div>
    </div>
  );
};

export default Register;
