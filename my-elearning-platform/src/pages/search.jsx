// pages/search.js
import { useState } from 'react';

export default function SearchPage() {
  const [category, setCategory] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [courses, setCourses] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/courses/search?category=${encodeURIComponent(category)}&instructorName=${encodeURIComponent(instructorName)}`);
    const data = await response.json();
    setCourses(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructor Name"
          value={instructorName}
          onChange={(e) => setInstructorName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.title} - {course.category} - Taught by {course.createdBy?.name || 'Unknown'}</li>
        ))}
      </ul>
    </div>
  );
}
