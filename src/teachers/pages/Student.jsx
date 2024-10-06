import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import studentData from "../../Api/Student";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";

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
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState(null);
  const [student, setStudent] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
      const fetchedData = response.data.data;

      setUserData(fetchedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentData(); // Fetch data from backend
        setStudent(data); // Store data in state
        setFilteredStudents(data); // Set filtered students to initial data
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Assume form teacher's class is "Primary 6"
  const formTeacherClass = "Primary 5";

  // Filter students based on form teacher's class
  useEffect(() => {
    const filtered = student.filter(
      (students) => students.className === userData.form
    );
    setFilteredStudents(filtered);
  }, []); // Runs once when component mounts

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = student.filter((students) =>
      `${students.firstName} ${students.lastName}`
        .toLowerCase()
        .includes(searchValue)
    );
    setFilteredStudents(filtered);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
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
                        checked={selectedStudent?._id === student._id} // Only check the selected student
                        readOnly
                      />
                      <img src={student.picture} alt={student.firstName} />
                      <h3 style={{ fontWeight: "600", marginLeft: 10 }}>
                        {student.firstname} {student.lastname}
                      </h3>
                    </td>
                    <td>{student.section}</td>
                    <td>{student.className}</td>
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
              <h3>ID: {selectedStudent._id}</h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={selectedStudent.picture}
                  alt={`${selectedStudent.firstname} ${selectedStudent.lastname}`}
                  className="student-photo-large"
                />
              </div>
              <h2>
                {selectedStudent.firstname} {selectedStudent.lastname}
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
                    {formatDate(selectedStudent.dateOfBirth)}
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="see-more-button"
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
