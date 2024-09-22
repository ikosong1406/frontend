import React from "react";
import { useLocation } from "react-router-dom";

const TeachersDetails = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Retrieve the student data

  if (!student) {
    return <p>No student data found.</p>;
  }

  return (
    <div className="student-details-page">
      <h2>Student Details</h2>
      <div>
        <h3>
          {student.firstName} {student.lastName}
        </h3>
        <p>ID: {student.id}</p>
        <p>Section: {student.section}</p>
        <p>Class: {student.class}</p>
        <p>Gender: {student.gender}</p>
        <p>Date of Birth: {student.dateOfBirth}</p>
        <p>Age: {calculateAge(student.dateOfBirth)}</p>
        <p>Residential Address: {student.residentialAddress}</p>
        <p>State of Origin: {student.stateOfOrigin}</p>
        <p>Parent Name: {student.parentName}</p>
        <p>Parent Contact: {student.parentNumber}</p>
      </div>
    </div>
  );
};

// Function to calculate age from DOB
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export default TeachersDetails;
