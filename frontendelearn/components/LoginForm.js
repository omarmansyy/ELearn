import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Attempting login with:', formData);
        try {
            const response = await axios.post('/api/auth/login', formData);
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
