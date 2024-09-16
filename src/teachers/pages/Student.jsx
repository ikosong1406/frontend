import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Student.css"; // Import CSS for styling

const students = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    picture: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    picture: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Alex Johnson",
    gender: "Male",
    picture: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Alex Johnson",
    gender: "Male",
    picture: "https://via.placeholder.com/50",
  },
  // Add more student objects as needed
];

const Student = () => {
  const navigate = useNavigate();

  const handleViewClick = (id) => {
    navigate(`/student/${id}`);
  };

  return (
    <div className="student-page">
      <h1>Student List</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <img
              src={student.picture}
              alt={student.name}
              className="student-pic"
            />
            <div className="student-info">
              <h3>{student.name}</h3>
              <p>{student.gender}</p>
            </div>
            <button
              className="view-button"
              onClick={() => handleViewClick(student.id)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
