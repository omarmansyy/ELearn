import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.role !== 'student' && formData.role !== 'instructor' && formData.role !== 'admin') {
      alert('Invalid user role provided.');
      return;
    }
    try {
      const response = await axios.post('/api/register', formData);
      console.log('Registration successful', response.data);
      // Redirect or display success message
    } catch (error) {
      console.error('Registration error', error.response.data);
      // Display error message
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        /><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select><br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link href="/login">Login here</Link></p>
    </div>
  );
}

export default Register;
