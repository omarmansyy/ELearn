import { useState } from 'react';
import { useRouter } from 'next/router';  // Import the useRouter hook
import styles from '../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // Initialize router for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // Necessary to include cookies with the request
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login successful', result);  // Check if this is logged
        // On successful login, redirect to the dashboard
        router.push('/dashboard');  // Redirect to dashboard after successful login
      } else {
        console.log('Login failed:', result);  // Log error response
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);  // Log network error
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <h1 className={styles.brand}>EduLearn</h1>
        <p className={styles.tagline}>
          Unlock your learning potential with EduLearn—your gateway to online education.
        </p>
        <img
          src="/images/learning-illustration.svg"
          alt="Learning Illustration"
          className={styles.illustration}
        />
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Welcome Back!</h2>
          <p className={styles.subtitle}>
            Log in to continue learning and explore your courses.
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
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
            <button type="submit" className={styles.button}>Log In</button>
          </form> 
          {error && <p className={styles.error}>{error}</p>}  {/* Display error message if any */}
          <p className={styles.footer}>
            Don’t have an account? <a href="/register" className={styles.link}>Sign up here</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
