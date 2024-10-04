import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ClassDetails.css";

const StudentResult = () => {
  const location = useLocation();
  const { student } = location.state || {};
  const [newResult, setNewResult] = useState({
    subject: "",
    firstTest: "",
    secondTest: "",
    exam: "",
    total: "",
    grade: "",
  });
  const [results, setResults] = useState({ subjects: [] });
  const [error, setError] = useState(null);
  const session = "2024/2025";
  const term = "First Term";

  useEffect(() => {
    // Fetch the student's result for the session and term
    const fetchStoredResult = async () => {
      try {
        const response = await axios.post(`${BackendApi}/getStudentResult`, {
          studentId: student._id,
          session,
          term,
        });
        setResults(response.data);
      } catch (err) {
        setError("Failed to fetch student's results");
      }
    };

    fetchStoredResult();
  }, [student._id, session, term]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResult((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      studentId: student._id,
      session: session,
      term: term,
      position: "nil",
      subjectName: newResult.subject,
      firstTest: newResult.firstTest,
      secondTest: newResult.secondTest,
      exam: newResult.exam,
      total: newResult.total,
      grade: newResult.grade,
    };

    try {
      // Submit the new result to the backend
      const response = await axios.post(`${BackendApi}/resultUpload`, data);
      if (response.status == "200") {
        toast.success(response.data.message);
        setNewResult({
          subject: "",
          firstTest: "",
          secondTest: "",
          exam: "",
          total: "",
          grade: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setError("Failed to submit the result");
    }
  };

  return (
    <div className="student-result-page">
      <ToastContainer />
      <h2>
        {student.firstname} {student.lastname} - {session} / {term}
      </h2>

      {/* New Result Input */}
      <form className="result-form" onSubmit={handleSubmit}>
        <table className="result-input-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>First Test</th>
              <th>Second Test</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="subject"
                  value={newResult.subject}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="firstTest"
                  value={newResult.firstTest}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="secondTest"
                  value={newResult.secondTest}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="exam"
                  value={newResult.exam}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="total"
                  value={newResult.total}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="grade"
                  value={newResult.grade}
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="submit-button">
          Submit Result
        </button>
      </form>

      {/* Display Stored Results */}
      <div className="stored-results">
        <h3>Stored Results</h3>
        {results.subjects.length > 0 ? (
          <table className="result-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>First Test</th>
                <th>Second Test</th>
                <th>Exam</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.subjects.map((result, index) => (
                <tr key={index}>
                  <td>{result.subjectName}</td>
                  <td>{result.firstTest}</td>
                  <td>{result.secondTest}</td>
                  <td>{result.exam}</td>
                  <td>{result.total}</td>
                  <td>{result.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudentResult;
