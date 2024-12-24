import { useState, useEffect } from 'react';
import styles from '../styles/notes.module.css';
import Navbar from './navbar';
const NotesPage = () => {
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Function to fetch existing notes
    useEffect(() => {
        fetchNotes();
    }, []);
const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/notes');
            const data = await response.json();
            setNotes(data.map(note => ({
                ...note,
                createdAt: new Date(note.createdAt).toLocaleDateString("en-US", {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })  // Formatting the date
            })));
        } catch (error) {
            console.error('Failed to fetch notes:', error);
        }
        setLoading(false);
    };

    // Function to submit a new note
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                console.log("Note created successfully");
                fetchNotes();  // Refresh the list of notes
                setContent(''); // Clear the form
            } else {
                throw new Error('Failed to create note');
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Navbar/>
            <h1>User's Notes</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                    className={styles.textarea}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Write a new note..."
                />
                <button type="submit" className={styles.button}>Submit Note</button>
            </form>
            
            {/* Display notes logic here */}
            {loading ? (
                <p>Loading notes...</p>
            ) : (
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <p>{note.content}</p>
                            <small>Created at: {note.createdAt}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotesPage;
