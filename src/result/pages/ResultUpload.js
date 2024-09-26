import React from "react";
import { useNavigate } from "react-router-dom";

const ResultUpload = () => {
  const navigate = useNavigate();

  const classes = ["Class 1", "Class 2", "Class 3"]; // Replace with data from backend

  return (
    <div className="result-upload-page">
      <h2>Select a Class</h2>
      <div className="class-list">
        {classes.map((className, index) => (
          <div
            key={index}
            className="class-card"
            onClick={() => navigate(`/result/classDetail`)}
          >
            {className}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultUpload;
