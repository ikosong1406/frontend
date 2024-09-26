import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ClassDetail = () => {
  const { className } = useParams();
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]; // Replace with data from backend

  return (
    <div className="class-detail-page">
      <h2>Students in {className}</h2>
      <ul className="student-list">
        {students.map((student) => (
          <li
            key={student.id}
            onClick={() => navigate(`/result/studentResult`)}
          >
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetail;
