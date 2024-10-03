import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import studentData from "../../Api/Student";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/StudentList.css"; // Assuming you have a CSS file for styles

const StudentList = () => {
  const location = useLocation();
  const { className } = location.state || {};
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Define the class progression map
  const classProgression = {
    "Primary 1": "Primary 2",
    "Primary 2": "Primary 3",
    "Primary 3": "Primary 4",
    "Primary 4": "Primary 5",
    "Primary 5": "Primary 6",
    "Primary 6": "Junior Secondary 1",
    "Junior Secondary 1": "Junior Secondary 2",
    "Junior Secondary 2": "Junior Secondary 3",
    "Junior Secondary 3": "Senior Secondary 1",
    "Senior Secondary 1": "Senior Secondary 2",
    "Senior Secondary 2": "Senior Secondary 3",
    "Senior Secondary 3": "Graduated",
  };

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentData(); // Fetch data from backend
        setStudent(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch students");
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Filter students based on the selected class
  const filteredStudents = student.filter(
    (students) => students.className === className
  );

  // Handle individual student selection by student.id
  const handleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Select or deselect all students
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      // Deselect all students
      setSelectedStudents([]);
    } else {
      // Select all students' IDs
      const allStudentIds = filteredStudents.map((student) => student.id);
      setSelectedStudents(allStudentIds);
    }
  };

  const sendToBackend = async (updatedStudents) => {
    const data = {
      students: updatedStudents,
    };
    try {
      const response = await axios.post(`${BackendApi}/promotion`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Students promoted successfully");
      } else {
        toast.error("Error promoting students");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      toast.error("Failed to promote students.");
    }
  };

  // Handle promotion of selected students
  const handlePromotion = () => {
    if (selectedStudents.length === 0) {
      toast.error("No students selected for promotion");
      return;
    }

    const promotedStudents = filteredStudents
      .filter((student) => selectedStudents.includes(student._id))
      .map((student) => ({
        id: student._id,
        firstName: student.firstname,
        lastName: student.lastname,
        currentClass: student.className,
        nextClass: classProgression[student.className],
      }));

    // Send the updated students data to the backend (simulated in this case)
    sendToBackend(promotedStudents);
  };

  return (
    <div className="student-list-page">
      <ToastContainer />
      <h2>Promote Students in {className}</h2>
      <button onClick={handleSelectAll}>
        {selectedStudents.length === filteredStudents.length
          ? "Deselect All"
          : "Select All"}
      </button>
      <ul className="student-list">
        {filteredStudents.map((student) => (
          <li key={student.id} className="student-item">
            <input
              type="checkbox"
              checked={selectedStudents.includes(student.id)}
              onChange={() => handleStudentSelection(student.id)}
            />
            <img
              src={student.picture}
              alt={`${student.firstname} ${student.lastname}`}
              className="student-profile-pic"
            />
            <span className="student-name">
              {`${student.firstname} ${student.lastname}`}
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
