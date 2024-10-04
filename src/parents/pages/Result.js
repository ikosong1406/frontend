import React, { useState } from "react";
import "../styles/Result.css";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";

const Result = () => {
  const [pin, setPin] = useState("");
  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");
  const [resultData, setResultData] = useState({ subjects: [] });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BackendApi}/result`, {
        pin,
        session,
        term,
      });
      setResultData(response.data);
    } catch (err) {
      setError("Failed to fetch student's results");
    }
  };

  return (
    <div className="student-result-page">
      <form className="result-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="studentId">Student Pin</label>
          <input
            type="text"
            id="studentId"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>

        {/* Section dropdown */}
        <div className="input-group">
          <label htmlFor="section">Section</label>
          <select
            id="section"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            required
          >
            <option value="">Select Section</option>
            <option value="2024/2025">2024/2025</option>
          </select>
        </div>

        {/* Term dropdown */}
        <div className="input-group">
          <label htmlFor="term">Term</label>
          <select
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          >
            <option value="">Select Term</option>
            <option value="First Term">First Term</option>
            <option value="Second Term">Second Term</option>
            <option value="Third Term">Third Term</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h3>
          Student Name : {resultData.firstname} {resultData.lastname}
        </h3>
        <h3>Class : {resultData.className}</h3>
        <h3>Position : {resultData.position}</h3>
      </div>

      {resultData.subjects.length > 0 ? (
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
            {resultData.subjects.map((result, index) => (
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
  );
};

export default Result;
