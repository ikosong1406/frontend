import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import studentData from "../../Api/Student";
import { FaUpload } from "react-icons/fa";
import "../styles/ClassDetails.css";

const ClassDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className } = location.state || {};
  const [students, setStudents] = useState([]); // Updated variable name to plural for clarity
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await studentData(); // Fetch data from backend
        setStudents(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch students");
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Filter students based on the selected class
  const filteredStudents = students.filter(
    (student) => student.className === className
  );

  return (
    <div className="class-detail-page">
      <h2>Students in {className}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>
                    <img
                      src={student.picture}
                      alt={`${student.firstname} ${student.lastname}`}
                      className="student-photo"
                    />
                  </td>
                  <td>
                    {student.firstname} {student.lastname}
                  </td>
                  <td>
                    <button
                      className="upload-result-button"
                      onClick={() =>
                        navigate(`/resultUpload/studentResult`, {
                          state: { student },
                        })
                      }
                    >
                      <FaUpload /> Upload Result
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No students found in this class.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassDetail;
