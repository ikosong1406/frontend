import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Students.css";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

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

const studentsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    dob: "2007-05-15",
    gender: "Male",
    age: calculateAge("2007-05-15"), // Age calculated dynamically
    className: "Math 101",
    section: "Primary",
    address: "123 Elm St",
    stateOfOrigin: "California",
    parentName: "Jane Doe",
    parentEmail: "jane.doe@example.com",
    parentContact: "123-456-7890",
    photo: "https://via.placeholder.com/150/0000FF/808080?text=John+Doe", // Placeholder image for John
    results: {
      2023: { Term1: 85, Term2: 90, Term3: 88 },
      2024: { Term1: 87, Term2: 92, Term3: 89 },
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    dob: "2008-11-22",
    gender: "Female",
    age: calculateAge("2008-11-22"),
    className: "English 202",
    section: "Primary",
    address: "456 Oak Ave",
    stateOfOrigin: "Texas",
    parentName: "Robert Smith",
    parentEmail: "robert.smith@example.com",
    parentContact: "234-567-8901",
    photo: "https://via.placeholder.com/150/FF69B4/000000?text=Jane+Smith", // Placeholder image for Jane
    results: {
      2023: { Term1: 78, Term2: 82, Term3: 80 },
      2024: { Term1: 80, Term2: 85, Term3: 83 },
    },
  },
  {
    id: 3,
    firstName: "Sam",
    lastName: "Wilson",
    dob: "2009-03-10",
    gender: "Male",
    age: calculateAge("2009-03-10"),
    className: "Science 101",
    section: "Secondary",
    address: "789 Pine Rd",
    stateOfOrigin: "Florida",
    parentName: "Emily Wilson",
    parentEmail: "emily.wilson@example.com",
    parentContact: "345-678-9012",
    photo: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Sam+Wilson", // Placeholder image for Sam
    results: {
      2023: { Term1: 88, Term2: 85, Term3: 87 },
      2024: { Term1: 90, Term2: 88, Term3: 91 },
    },
  },
  {
    id: 4,
    firstName: "Emma",
    lastName: "Johnson",
    dob: "2007-07-30",
    gender: "Female",
    age: calculateAge("2007-07-30"),
    className: "History 303",
    section: "Secondary",
    address: "101 Maple Blvd",
    stateOfOrigin: "New York",
    parentName: "David Johnson",
    parentEmail: "david.johnson@example.com",
    parentContact: "456-789-0123",
    photo: "https://via.placeholder.com/150/800080/FFFFFF?text=Emma+Johnson", // Placeholder image for Emma
    results: {
      2023: { Term1: 90, Term2: 92, Term3: 91 },
      2024: { Term1: 94, Term2: 93, Term3: 92 },
    },
  },
  {
    id: 5,
    firstName: "Lucas",
    lastName: "Martinez",
    dob: "2008-09-05",
    gender: "Male",
    age: calculateAge("2008-09-05"),
    className: "Geography 404",
    section: "Primary",
    address: "202 Birch St",
    stateOfOrigin: "Ohio",
    parentName: "Laura Martinez",
    parentEmail: "laura.martinez@example.com",
    parentContact: "567-890-1234",
    photo: "https://via.placeholder.com/150/008000/FFFFFF?text=Lucas+Martinez", // Placeholder image for Lucas
    results: {
      2023: { Term1: 82, Term2: 79, Term3: 84 },
      2024: { Term1: 85, Term2: 80, Term3: 83 },
    },
  },
];

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

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = studentsData.filter((student) =>
      `${studentsData.firstName} ${studentsData.lastName}`
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
                <option value="A">A</option>
                <option value="B">B</option>
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
        {" "}
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
                <th>ID</th>
                <th>Class</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <td style={{ display: "flex" }}>
                    <input
                      type="checkbox"
                      checked={selectedStudent?.id === student.id}
                      readOnly
                    />
                    <img src={student.photo} alt={student.firstName} />
                    <h3 style={{ fontWeight: "600", marginLeft: 10 }}>
                      {student.firstName} {student.lastName}
                    </h3>
                  </td>
                  <td>ID: {student.id}</td>
                  <td>{student.className}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                </tr>
              ))}
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
                    {selectedStudent.age}
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
                    {selectedStudent.dob}
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
                  {selectedStudent.address}
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
                  {selectedStudent.parentContact}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                  to={`/student-details/${selectedStudent.id}`}
                  className="see-more-button"
                >
                  <IoIosArrowDown />
                  <span> See More</span>
                </Link>
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
