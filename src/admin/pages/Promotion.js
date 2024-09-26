import React from "react";
import { useNavigate } from "react-router-dom";

// Dummy data for class list
const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];

const Promotion = () => {
  const navigate = useNavigate();

  // When a class is clicked, navigate to the student list for that class
  const handleClassClick = (className) => {
    navigate(`/admin/studentList`);
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
