import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Dummy data for students
const studentsData = {
  "Class 1": [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ],
  "Class 2": [
    { id: 3, name: "James Brown" },
    { id: 4, name: "Emily White" },
  ],
  // Add more classes and students as needed
};

const StudentList = () => {
  const { className } = useParams(); // Get the class name from the URL
  const [selectedStudents, setSelectedStudents] = useState([]);

  const students = studentsData[className] || [];

  // Handle individual student selection
  const handleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Select or deselect all students
  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      const allStudentIds = students.map((student) => student.id);
      setSelectedStudents(allStudentIds);
    }
  };

  // Handle promotion of selected students
  const handlePromotion = () => {
    if (selectedStudents.length === 0) {
      alert("No students selected for promotion");
      return;
    }
    alert(`${selectedStudents.length} students promoted from ${className}`);
    // Update backend logic here if needed
  };

  return (
    <div className="student-list-page">
      <h2>Promote Students in {className}</h2>
      <button onClick={handleSelectAll}>
        {selectedStudents.length === students.length
          ? "Deselect All"
          : "Select All"}
      </button>
      <ul className="student-list">
        {students.map((student) => (
          <li key={student.id}>
            <input
              type="checkbox"
              checked={selectedStudents.includes(student.id)}
              onChange={() => handleStudentSelection(student.id)}
            />
            {student.name}
          </li>
        ))}
      </ul>
      <button onClick={handlePromotion}>Promote Selected Students</button>
    </div>
  );
};

export default StudentList;
