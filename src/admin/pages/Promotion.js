import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Promotion.css"; // Assuming we are styling separately

// Dummy data for class list (Primary 1 to SS3)
const classes = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
  "JSS 1",
  "JSS 2",
  "JSS 3",
  "SS 1",
  "SS 2",
  "SS 3",
];

const Promotion = () => {
  const navigate = useNavigate();

  // When a class is clicked, navigate to the student list for that class
  const handleClassClick = (className) => {
    navigate("/admin/studentList", { state: { className } }); // Pass the class name using state
  };

  return (
    <div className="class-list-page">
      <h2>Select a Class to Promote Students</h2>
      <div className="class-list">
        {classes.map((className) => (
          <div
            key={className}
            className="class-card"
            onClick={() => handleClassClick(className)}
          >
            {className}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
