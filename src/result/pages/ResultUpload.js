import React from "react";
import { useNavigate } from "react-router-dom";

const ResultUpload = () => {
  const navigate = useNavigate();

  const classes = [
    "Junior Secondary 1",
    "Junior Secondary 2",
    "Junior Secondary 3",
    "Senior Secondary 1",
    "Senior Secondary 2",
    "Senior Secondary 3",
  ]; // Replace with data from backend

  const handleClassClick = (className) => {
    navigate("/resultUpload/classDetail", { state: { className } }); // Pass the class name using state
  };

  return (
    <div className="result-upload-page">
      <h2>Select a Class</h2>
      <div className="class-list">
        {classes.map((className, index) => (
          <div
            key={index}
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

export default ResultUpload;
