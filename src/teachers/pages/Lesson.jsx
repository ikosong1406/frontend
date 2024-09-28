import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Lesson.css";
import { FaPlus } from "react-icons/fa6";

const Lesson = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState([
    {
      id: 1,
      subject: "Math",
      topic: "Introduction to Algebra",
      date: "2024-09-13",
      className: "Math 101",
      attachment: "algebra-intro.pdf",
      text: "This note covers the basic algebra principles and theorems...",
      status: "Approved",
    },
    {
      id: 2,
      subject: "Science",
      topic: "Introduction to Chemistry",
      date: "2024-09-14",
      className: "Science 201",
      attachment: "chemistry-intro.pdf",
      text: "This note introduces basic concepts of chemistry, including elements, compounds...",
      status: "Pending",
    },
    {
      id: 3,
      subject: "English",
      topic: "Grammar Rules",
      date: "2024-09-15",
      className: "English 301",
      attachment: "grammar-rules.pdf",
      text: "In this lesson, we discuss the rules of grammar, covering sentence structure, punctuation...",
      status: "Approved",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNoteClick = (note) => {
    navigate(`/teacher/newLesson/${note.id}`, { state: { note } });
  };

  const filteredNotes = notes.filter((note) =>
    note.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <input
          type="text"
          placeholder="Search for a lesson..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="lesson-search"
        />
        <button
          className="new-lesson-btn"
          onClick={() => navigate("/teacher/newLesson/new")}
        >
          <FaPlus style={{ fontSize: 12 }} />
          <span> Create New Lesson</span>
        </button>
      </div>

      <table className="lesson-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map((note) => (
            <tr key={note.id} onClick={() => handleNoteClick(note)}>
              <td>{note.topic}</td>
              <td>{note.className}</td>
              <td>{note.subject}</td>
              <td>{note.date}</td>
              <td
                className={`status-cell ${
                  note.status === "Approved" ? "approved" : "pending"
                }`}
              >
                {note.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lesson;
