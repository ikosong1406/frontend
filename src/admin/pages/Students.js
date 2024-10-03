import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Students.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import studentData from "../../Api/Student";

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
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState(student);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    gender: "",
    section: "",
    className: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentData(); // Fetch data from backend
        setStudent(data); // Store data in state
        setFilteredStudents(data); // Set filtered students to initial data
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch students");
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = student.filter((student) =>
      `${student.firstname} ${student.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, student]); // Update filtered students when search term or student data changes

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
            onClick={() => (window.location.href = "/admin/newStudent")}
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
          // onChange={handleSearch}
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
                    key={student._id}
                    onClick={() => setSelectedStudent(student)} // Set the selected student on click
                  >
                    <td style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        checked={selectedStudent?._id === student._id} // Compare _id correctly
                        readOnly
                      />
                      <img src={student.picture} alt={student.firstname} />{" "}
                      {/* Use correct prop */}
                      <h3 style={{ fontWeight: "600", marginLeft: 10 }}>
                        {student.firstname} {student.lastname}{" "}
                        {/* Correct prop names */}
                      </h3>
                    </td>
                    <td>{student.section}</td>
                    <td>{student.className}</td> {/* Use className prop */}
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
              <h3>ID: {selectedStudent._id}</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={selectedStudent.picture}
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
