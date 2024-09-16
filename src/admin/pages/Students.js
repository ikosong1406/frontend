import React, { useState } from "react";
import "../styles/Students.css";

// Dummy backend data for students
const students = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    className: "Math 101",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    className: "English 202",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Sam Wilson",
    gender: "Male",
    className: "Science 101",
    email: "sam@example.com",
  },
];

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="all-students-page">
      <div className="students-list">
        <h2>All Students</h2>
        <ul>
          {students.map((student) => (
            <li key={student.id} onClick={() => setSelectedStudent(student)}>
              {student.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="student-details">
        {selectedStudent ? (
          <div>
            <h3>Student Details</h3>
            <p>
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.gender}
            </p>
            <p>
              <strong>Class:</strong> {selectedStudent.className}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
          </div>
        ) : (
          <p>Please select a student from the list</p>
        )}
      </div>
    </div>
  );
};

export default Students;
