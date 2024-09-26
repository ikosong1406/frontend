import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ResultModal from "../components/ResultModal";

const StudentResult = () => {
  const { studentId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const studentName = "John Doe"; // Replace with data from backend
  const results = null; // Fetch results from backend (null means no result)

  return (
    <div className="student-result-page">
      <h2>Results for {studentName}</h2>
      {results ? (
        <div className="result-details">{/* Display results here */}</div>
      ) : (
        <p>No result yet</p>
      )}
      <button onClick={() => setShowModal(true)}>Upload Result</button>
      {showModal && <ResultModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default StudentResult;
