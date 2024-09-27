import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import studentsData from "../../Api/Student.json"; // Import the student JSON data
import "../styles/StudentList.css"; // Assuming you have a CSS file for styles

const StudentList = () => {
  const location = useLocation();
  const { className } = location.state || {};
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Define the class progression map
  const classProgression = {
    "Primary 1": "Primary 2",
    "Primary 2": "Primary 3",
    "Primary 3": "Primary 4",
    "Primary 4": "Primary 5",
    "Primary 5": "Primary 6",
    "Primary 6": "JSS 1",
    "JSS 1": "JSS 2",
    "JSS 2": "JSS 3",
    "JSS 3": "SS 1",
    "SS 1": "SS 2",
    "SS 2": "SS 3",
    "SS 3": "Graduated",
  };

  // Filter students based on the selected class
  const filteredStudents = studentsData.filter(
    (student) => student.class === className
  );

  // Handle individual student selection
  const handleStudentSelection = (studentName) => {
    if (selectedStudents.includes(studentName)) {
      setSelectedStudents(
        selectedStudents.filter((name) => name !== studentName)
      );
    } else {
      setSelectedStudents([...selectedStudents, studentName]);
    }
  };

  // Select or deselect all students
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      const allStudentNames = filteredStudents.map(
        (student) => `${student.firstName} ${student.lastName}`
      );
      setSelectedStudents(allStudentNames);
    }
  };

  // Function to simulate sending data to the backend
  const sendToBackend = async (updatedStudents) => {
    try {
      const response = await fetch(
        "https://your-backend-api.com/promote-students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudents),
        }
      );
      if (response.ok) {
        alert("Students promoted successfully");
      } else {
        alert("Error promoting students");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert("Failed to promote students.");
    }
  };

  // Handle promotion of selected students
  const handlePromotion = () => {
    if (selectedStudents.length === 0) {
      alert("No students selected for promotion");
      return;
    }

    const promotedStudents = filteredStudents
      .filter((student) =>
        selectedStudents.includes(`${student.firstName} ${student.lastName}`)
      )
      .map((student) => ({
        ...student,
        nextClass: classProgression[student.class],
      }));

    // Show the alert with students and the class they are promoted to
    const studentPromotions = promotedStudents
      .map((student) => `students has been promoted to ${student.nextClass}`)
      .join("\n");

    alert(studentPromotions);

    // Send the updated students data to the backend
    sendToBackend(promotedStudents);
  };

  return (
    <div className="student-list-page">
      <h2>Promote Students in {className}</h2>
      <button onClick={handleSelectAll}>
        {selectedStudents.length === filteredStudents.length
          ? "Deselect All"
          : "Select All"}
      </button>
      <ul className="student-list">
        {filteredStudents.map((student, index) => (
          <li key={index} className="student-item">
            <input
              type="checkbox"
              checked={selectedStudents.includes(
                `${student.firstName} ${student.lastName}`
              )}
              onChange={() =>
                handleStudentSelection(
                  `${student.firstName} ${student.lastName}`
                )
              }
            />
            <img
              src={student.picture}
              alt={`${student.firstName} ${student.lastName}`}
              className="student-profile-pic"
            />
            <span className="student-name">
              {`${student.firstName} ${student.lastName}`}
            </span>
          </li>
        ))}
      </ul>
      <button className="promote-btn" onClick={handlePromotion}>
        Promote Selected Students
      </button>
    </div>
  );
};

export default StudentList;
