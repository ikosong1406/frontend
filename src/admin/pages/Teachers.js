import React, { useState } from "react";
// import "./AllTeachersPage.css";

// Dummy backend data for teachers
const teachers = [
  {
    id: 1,
    name: "Mr. John",
    gender: "Male",
    subject: "Mathematics",
    email: "john@school.com",
  },
  {
    id: 2,
    name: "Ms. Smith",
    gender: "Female",
    subject: "English",
    email: "smith@school.com",
  },
  {
    id: 3,
    name: "Mr. Brown",
    gender: "Male",
    subject: "Science",
    email: "brown@school.com",
  },
];

const AllTeachersPage = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <div className="all-teachers-page">
      <div className="teachers-list">
        <h2>All Teachers</h2>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id} onClick={() => setSelectedTeacher(teacher)}>
              {teacher.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="teacher-details">
        {selectedTeacher ? (
          <div>
            <h3>Teacher Details</h3>
            <p>
              <strong>Name:</strong> {selectedTeacher.name}
            </p>
            <p>
              <strong>Gender:</strong> {selectedTeacher.gender}
            </p>
            <p>
              <strong>Subject:</strong> {selectedTeacher.subject}
            </p>
            <p>
              <strong>Email:</strong> {selectedTeacher.email}
            </p>
          </div>
        ) : (
          <p>Please select a teacher from the list</p>
        )}
      </div>
    </div>
  );
};

export default AllTeachersPage;
