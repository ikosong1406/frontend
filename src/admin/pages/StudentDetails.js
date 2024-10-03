import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/StudentDetails.css";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

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
    return Object.keys(report).map((session) => (
      <div key={session}>
        <h4>Session: {session}</h4>
        {Object.keys(report[session]).map((term) => (
          <div key={term}>
            <h5>{term.charAt(0).toUpperCase() + term.slice(1)} Term</h5>
            <p>Position: {report[session][term].position}</p>
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
                {Object.keys(report[session][term]).map((subject) => {
                  if (subject !== "position") {
                    const subjectData = report[session][term][subject];
                    return (
                      <tr key={subject}>
                        <td>
                          {subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </td>
                        <td>{subjectData.firstTest}</td>
                        <td>{subjectData.secondTest}</td>
                        <td>{subjectData.exam}</td>
                        <td>{subjectData.total}</td>
                        <td>{subjectData.grade}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    ));
  };

  const renderFeesReport = (fees) => {
    return Object.keys(fees).map((session) => (
      <div key={session}>
        <h4>Session: {session}</h4>
        <table>
          <thead>
            <tr>
              <th>Term</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(fees[session]).map((term) => (
              <tr key={term}>
                <td>{term.charAt(0).toUpperCase() + term.slice(1)}</td>
                <td>{fees[session][term] === "paid" ? "Paid" : "Not Paid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
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
          <div style={{ width: "80%" }}>
            <h2 style={{ color: "black", textAlign: "left" }}>
              {student.firstname} {student.lastname}
            </h2>
            <button className="save-buttons">
              <FaEdit /> <span> Save Profile</span>
            </button>
            <button className="delete-buttons">
              <FaTrashAlt /> <span> Delete Profile</span>
            </button>
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
                        {student.dateOfBirth}
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
                  <h3 style={{ marginTop: 30 }}>Fees Report</h3>
                  {renderFeesReport(student.fees)}
                </div>
              </div>
            ) : (
              <div className="academic-report">
                {renderAcademicReport(student.result)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
