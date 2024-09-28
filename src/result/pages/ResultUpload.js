import React from "react";
import { useNavigate } from "react-router-dom";

const ResultUpload = () => {
  const navigate = useNavigate();

  const classes = ["JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"]; // Replace with data from backend

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
