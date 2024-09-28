import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

// Import the students data from the JSON file
import studentsData from "../../Api/Student.json"; // Path to your JSON file

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

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  // Assume form teacher's class is "Primary 6"
  const formTeacherClass = "Primary 5";

  // Filter students based on form teacher's class
  useEffect(() => {
    const filtered = studentsData.filter(
      (student) => student.class === formTeacherClass
    );
    setFilteredStudents(filtered);
  }, []); // Runs once when component mounts

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = studentsData.filter((student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchValue)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="students-container">
      <div className="page-header">
        <h2>Students Database</h2>
        <div className="header-controls">
          <button
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            <HiAdjustmentsHorizontal style={{ fontSize: 16 }} />
            <span> Filter</span>
          </button>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="details-section">
        <div className="student-list-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Section</th>
                <th>Class</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredStudents) &&
              filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        checked={selectedStudent?.id === student.id} // Only check the selected student
                        readOnly
                      />
                      <img src={student.photo} alt={student.firstName} />
                      <h3 style={{ fontWeight: "600", marginLeft: 10 }}>
                        {student.firstName} {student.lastName}
                      </h3>
                    </td>
                    <td>{student.section}</td>
                    <td>{student.class}</td>
                    <td>{calculateAge(student.dateOfBirth)}</td>
                    <td>{student.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">You are not a Form Teacher</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="student-details">
          {selectedStudent ? (
            <div>
              <h3>ID: {selectedStudent.id}</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={selectedStudent.photo}
                  alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                  className="student-photo-large"
                />
              </div>
              <h2>
                {selectedStudent.firstName} {selectedStudent.lastName}
              </h2>
              <h3 className="class">{selectedStudent.className}</h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                  padding: "0 10px 0 10px",
                }}
              >
                <div>
                  <h3>Age</h3>
                  <p className="class" style={{ textAlign: "left" }}>
                    {calculateAge(selectedStudent.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <h3>Gender</h3>
                  <p className="class" style={{ textAlign: "left" }}>
                    {selectedStudent.gender}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                  padding: "0 10px 0 10px",
                }}
              >
                <div>
                  <h3>Date of Birth</h3>
                  <p className="class" style={{ textAlign: "left" }}>
                    {selectedStudent.dateOfBirth}
                  </p>
                </div>
                <div>
                  <h3>Section</h3>
                  <p className="class" style={{ textAlign: "left" }}>
                    {selectedStudent.section}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <h3>Address</h3>
                <p
                  className="class"
                  style={{ textAlign: "left", alignSelf: "center" }}
                >
                  {selectedStudent.residentialAddress}
                </p>
              </div>
              <button
                className="more-details"
                onClick={() =>
                  navigate(`/teacher/studentDetails`, {
                    state: { student: selectedStudent },
                  })
                }
              >
                See More
                <IoIosArrowDown style={{ fontSize: 15, marginLeft: 10 }} />
              </button>
            </div>
          ) : (
            <div className="no-student">
              <h3>No student selected</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
