import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Students.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
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
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    gender: "",
    section: "",
    className: "",
  });

  const navigate = useNavigate();

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

  // Handle filter toggle
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="students-container">
      <div className="page-header">
        <h2>Students Database</h2>
        <div className="header-controls">
          <button className="filter-button" onClick={toggleFilter}>
            <HiAdjustmentsHorizontal style={{ fontSize: 16 }} />
            <span> Filter</span>
          </button>
          <button
            className="add-student-button"
            onClick={() => (window.location.href = "/new-student")}
          >
            <FaPlus style={{ fontSize: 14 }} />
            <span> Add New Student</span>
          </button>
        </div>
      </div>

      {/* Filter modal */}
      {showFilter && (
        <div className="filter-modal">
          <div className="filter-options">
            <label>
              Gender:
              <select
                value={filterOptions.gender}
                onChange={(e) =>
                  setFilterOptions({ ...filterOptions, gender: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <label>
              Section:
              <select
                value={filterOptions.section}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    section: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </select>
            </label>
            <label>
              Class:
              <select
                value={filterOptions.className}
                onChange={(e) =>
                  setFilterOptions({
                    ...filterOptions,
                    className: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="Math 101">Math 101</option>
                <option value="Science 101">Science 101</option>
              </select>
            </label>
          </div>
        </div>
      )}

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
                  <td colSpan="5">No students found</td>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: -5,
                }}
              >
                <h3>State of Origin</h3>
                <p
                  className="class"
                  style={{ textAlign: "left", alignSelf: "center" }}
                >
                  {selectedStudent.stateOfOrigin}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: -5,
                }}
              >
                <h3>Parents Name</h3>
                <p
                  className="class"
                  style={{ textAlign: "left", alignSelf: "center" }}
                >
                  {selectedStudent.parentName}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: -5,
                }}
              >
                <h3>Parents Contact</h3>
                <p
                  className="class"
                  style={{ textAlign: "left", alignSelf: "center" }}
                >
                  {selectedStudent.parentNumber}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="see-more-button"
                  onClick={() =>
                    navigate(`/admin/studentsDetails`, {
                      state: { student: selectedStudent },
                    })
                  }
                >
                  <IoIosArrowDown />
                  <span> See More</span>
                </button>
              </div>
            </div>
          ) : (
            <p>Please select a student from the list to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
