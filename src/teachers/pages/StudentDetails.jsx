import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Function to calculate age from DOB
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const StudentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {}; // Retrieve the student data
  const [activeTab, setActiveTab] = useState("studentData");

  if (!student) {
    return <p>No student data found.</p>;
  }

  // Toggle between tabs (Student Data and Academic Report)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderAcademicReport = (report) => {
    return Object.keys(report || {}).map((session) => (
      <div key={session}>
        <h4>Session: {session}</h4>
        {Object.keys(report[session] || {}).map((term) => (
          <div key={term}>
            <h5>{term.charAt(0).toUpperCase() + term.slice(1)} Term</h5>
            <p>Position: {report[session][term].position || "N/A"}</p>
            <table>
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
                {/* Safely check if subjects exist before iterating */}
                {report[session][term]?.subjects &&
                Object.keys(report[session][term].subjects).length > 0 ? (
                  Object.keys(report[session][term].subjects).map((subject) => {
                    const subjectData = report[session][term].subjects[subject];
                    return (
                      <tr key={subject}>
                        <td>
                          {subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </td>
                        <td>{subjectData.firstTest || "N/A"}</td>
                        <td>{subjectData.secondTest || "N/A"}</td>
                        <td>{subjectData.exam || "N/A"}</td>
                        <td>{subjectData.total || "N/A"}</td>
                        <td>{subjectData.grade || "N/A"}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">No subjects data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ));
  };

  const renderFeesReport = (fees) => {
    return Object.keys(fees || {}).map((session) => (
      <div key={session}>
        <h4>Session: {session}</h4>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Fee Type</th>
              <th>Amount Paid</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {fees[session].map((termObj, index) => (
              <tr key={index}>
                <td>{termObj.term}</td>
                <td>{termObj.feeType}</td>
                <td>{termObj.amount}</td>
                <td>{new Date(termObj.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="student-details-page">
      <div className="student-details-container">
        {/* Left Section - Profile Information */}
        <div className="profile-section">
          <img
            src={student.picture}
            alt={`${student.firstName} ${student.lastName}`}
            className="profile-pic"
          />
          <div style={{ width: "80%", alignContent: "center" }}>
            <h2
              style={{ color: "black", textAlign: "left", alignSelf: "center" }}
            >
              {student.firstname} {student.lastname}
            </h2>
          </div>
        </div>

        {/* Right Section - Data or Report */}
        <div className="detail-section">
          {/* Tab Menu */}
          <div className="tab-menu">
            <button
              className={activeTab === "studentData" ? "active-tab" : ""}
              onClick={() => handleTabChange("studentData")}
            >
              Student Data
            </button>
            <button
              className={activeTab === "academicReport" ? "active-tab" : ""}
              onClick={() => handleTabChange("academicReport")}
            >
              Academic Report
            </button>
          </div>

          {/* Conditional Content */}
          <div className="tab-content">
            {activeTab === "studentData" ? (
              <div className="student-data">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    <div>
                      <h3>Age</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {calculateAge(student.dateOfBirth)}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Gender</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.gender}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Section</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.section}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Class</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.className}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Date of Birth</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {formatDate(student.dateOfBirth)}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>State of Origin</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.stateOfOrigin}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Parent's Name</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.parentName}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Parent's Contact</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.parentNumber}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Address</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {student.residentialAddress}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="fees-report">
                  {renderFeesReport(student.fees)}
                </div>
              </div>
            ) : (
              <div className="academic-report">
                {renderAcademicReport(student.results)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
