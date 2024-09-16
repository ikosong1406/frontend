import React, { useState } from "react";
import "../styles/Result.css"; // Import CSS for styling

const Result = () => {
  const [studentId, setStudentId] = useState("");
  const [section, setSection] = useState("");
  const [term, setTerm] = useState("");
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState("");

  // Dummy result data
  const dummyData = {
    studentName: "John Doe",
    className: "Grade 10",
    position: "3rd",
    subjects: [
      {
        name: "Math",
        firstTest: 18,
        secondTest: 19,
        exam: 50,
        total: 87,
        grade: "A",
      },
      {
        name: "English",
        firstTest: 15,
        secondTest: 17,
        exam: 45,
        total: 77,
        grade: "B",
      },
      {
        name: "Science",
        firstTest: 20,
        secondTest: 20,
        exam: 55,
        total: 95,
        grade: "A",
      },
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate the process of retrieving student result
    if (studentId && section && term) {
      setResultData(dummyData); // Set the dummy data to display
      setError("");
    } else {
      setError("Please fill all the fields to view the result.");
    }
  };

  return (
    <div className="student-result-page">
      <form className="result-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        {/* Section dropdown */}
        <div className="input-group">
          <label htmlFor="section">Section</label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            <option value="">Select Section</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2020/2021">2020/2021</option>
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

      {resultData && (
        <div className="result-details">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Name: {resultData.studentName}</h3>
            <p>Class: {resultData.className}</p>
            <p>Position: {resultData.position}</p>
          </div>
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
              {resultData.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.firstTest}</td>
                  <td>{subject.secondTest}</td>
                  <td>{subject.exam}</td>
                  <td>{subject.total}</td>
                  <td>{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Result;
