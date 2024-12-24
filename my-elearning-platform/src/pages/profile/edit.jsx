import { useState } from 'react';
import styles from '../../styles/EditProfile.module.css'; // Ensure the path is correct

const EditProfile = ({ userId }) => {
    const [learningPreferences, setLearningPreferences] = useState([]);
    const [subjectsOfInterest, setSubjectsOfInterest] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { name, learningPreferences, subjectsOfInterest };

        const apiUrl = `http://localhost:3000/user/update-student/${userId}`; // Using template literals to insert the user ID into the URL

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log("Profile updated successfully");
                // Handle successful update here, such as redirecting the user
            } else {
                throw new Error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    




    const handleLearningPreferencesChange = (event) => {
        setLearningPreferences([...event.target.selectedOptions].map(o => o.value));
    };

    const handleSubjectsOfInterestChange = (event) => {
        setSubjectsOfInterest([...event.target.selectedOptions].map(o => o.value));
    };

    return (
        <div className={styles.container}>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <label className={styles.label}>
                    Learning Preferences:
                    <select multiple value={learningPreferences} onChange={handleLearningPreferencesChange} className={styles.input}>
                        {/* Placeholder options, replace with actual data */}
                        <option value="online">Online</option>
                        <option value="in-person">In-person</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </label>
                <label className={styles.label}>
                    Subjects of Interest:
                    <select multiple value={subjectsOfInterest} onChange={handleSubjectsOfInterestChange} className={styles.input}>
                        {/* Placeholder options, replace with actual data */}
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="engineering">Engineering</option>
                    </select>
                </label>
                <button type="submit" className={styles.submitButton}>Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;
