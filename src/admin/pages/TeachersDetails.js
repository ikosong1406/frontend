import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// import "../styles/TeacherDetails.css";
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

const TeacherDetails = () => {
  const location = useLocation();
  const { teacher } = location.state || {}; // Retrieve the teacher data
  const [activeTab, setActiveTab] = useState("staffData");

  if (!teacher) {
    return <p>No teacher data found.</p>;
  }

  // Toggle between tabs (Staff Data and Lesson Notes)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render Lesson Notes
  const renderLessonNotes = (lessonNotes) => {
    return lessonNotes.map((note, index) => (
      <div key={index} className="lesson-note">
        <h4>
          {note.subject} - {note.topic}
        </h4>
        <p>
          <strong>Date:</strong> {note.date}
        </p>
        <p>
          <strong>Class:</strong> {note.class}
        </p>
        <p>{note.text}</p>
        <a href={note.attachment} target="_blank" rel="noopener noreferrer">
          View Attachment
        </a>
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
            src={teacher.profilePhoto}
            alt={`${teacher.firstName} ${teacher.lastName}`}
            className="profile-pic"
          />
          <div style={{ width: "80%" }}>
            <h2 style={{ color: "black", textAlign: "left", marginTop: 30 }}>
              {teacher.firstname} {teacher.lastname}
            </h2>
            <button className="save-buttons">
              <FaEdit /> <span> Edit Profile</span>
            </button>
            <button className="delete-buttons">
              <FaTrashAlt /> <span> Delete Profile</span>
            </button>
          </div>
        </div>

        {/* Right Section - Data or Lesson Notes */}
        <div className="detail-section">
          {/* Tab Menu */}
          <div className="tab-menu">
            <button
              className={activeTab === "staffData" ? "active-tab" : ""}
              onClick={() => handleTabChange("staffData")}
            >
              Staff Data
            </button>
            <button
              className={activeTab === "lessonNotes" ? "active-tab" : ""}
              onClick={() => handleTabChange("lessonNotes")}
            >
              Lesson Notes
            </button>
          </div>

          {/* Conditional Content */}
          <div className="tab-content">
            {activeTab === "staffData" ? (
              <div className="staff-data">
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
                        {calculateAge(teacher.dateOfBirth)}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Gender</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.gender}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Department</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.department}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Date of Birth</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {formatDate(teacher.dateOfBirth)}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Contact</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.contact}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Email</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>State of Origin</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.stateOfOrigin}
                      </p>
                    </div>
                    <div style={{ marginTop: 30 }}>
                      <h3>Residential Address</h3>
                      <p className="class" style={{ textAlign: "left" }}>
                        {teacher.residentialAddress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cv-certificate">
                  <h3 style={{ marginTop: 30 }}>Uploaded Documents</h3>
                  <p>
                    <strong>CV:</strong>{" "}
                    <a
                      href={teacher.cvUpload}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View CV
                    </a>
                  </p>
                  <p>
                    <strong>Certificate:</strong>{" "}
                    <a
                      href={teacher.certificateUpload}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="lesson-notes">
                {renderLessonNotes(teacher.lessonNote)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
