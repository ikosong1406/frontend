import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Lesson.css";
import { FaPlus } from "react-icons/fa6";

const Lesson = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryColors, setCategoryColors] = useState({
    Math: "#ff6347",
    Science: "#4682b4",
    English: "#3cb371",
  });
  const [notes, setNotes] = useState([
    {
      id: 1,
      subject: "Math",
      title: "Introduction to Algebra",
      date: "2024-09-13",
      className: "Math 101",
      content: "This note covers the basic algebra principles...",
      categoryColor: "#ff6347",
    },
    {
      id: 2,
      subject: "Science",
      title: "Introduction to Chemistry",
      content: "This note introduces chemistry with a focus on...",
      categoryColor: "#4682b4",
    },
    {
      id: 3,
      subject: "English",
      title: "Grammar Rules",
      content: "In this lesson, we discuss the basic grammar rules...",
      categoryColor: "#3cb371",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNoteClick = (note) => {
    navigate(`/teacher/newLesson/${note.id}`, { state: { note } });
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="lesson-list">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="lesson-item"
            onClick={() => handleNoteClick(note)}
          >
            <div
              className="lesson-category-circle"
              style={{ backgroundColor: note.categoryColor }}
            ></div>
            <div className="lesson-details">
              <h3
                className="lesson-subject"
                style={{ color: note.categoryColor }}
              >
                {note.subject}
              </h3>
              <p className="lesson-title">{note.title}</p>
              <p className="lesson-preview">
                {note.content.split(" ").slice(0, 25).join(" ")}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lesson;
