import { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [formData, setFormData] = useState({ email: '', password: '', role: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
