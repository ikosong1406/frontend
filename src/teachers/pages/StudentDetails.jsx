import React from "react";
import { useParams } from "react-router-dom";
// import "../styles/StudentDetails.css";

// Assuming this is the same student data from the Student page
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
    name: "Mary Adams",
    gender: "Female",
    picture: "https://via.placeholder.com/50",
  },
  // Add more student objects as needed
];

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const student = students.find((student) => student.id === parseInt(id)); // Find the student based on the ID

  if (!student) {
    return <div>Student not found</div>;
  }

  const handleUploadClick = () => {
    alert("Open result upload modal for " + student.name);
    // You can implement the modal for result upload here.
  };

  return (
    <div className="student-details-page">
      <div className="student-details-card">
        <img src={student.picture} alt={student.name} className="student-pic" />
        <div className="student-info">
          <h2>{student.name}</h2>
          <p>Gender: {student.gender}</p>
          <p>ID: {student.id}</p>
        </div>
      </div>
      <button className="upload-button" onClick={handleUploadClick}>
        Upload Result
      </button>
    </div>
  );
};

export default StudentDetails;
