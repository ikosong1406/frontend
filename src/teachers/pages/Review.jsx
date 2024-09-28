import React, { useState } from "react";
import "../styles/Review.css"; // Import CSS for styling
import teachers from "../../Api/Teachers.json";

// Set the HOD department
const hod = "Music";

const Review = () => {
  // Filter teachers whose department matches the HOD
  const hodTeachers = teachers.filter((teacher) => teacher.department === hod);

  // Extract and flatten lesson notes from the filtered teachers
  const lessonNotes = hodTeachers.flatMap((teacher) =>
    teacher.lessonNote.map((note, index) => ({
      ...note,
      teacherName: `${teacher.firstName} ${teacher.lastName}`,
      id: `${teacher.firstName}_${index}`, // Unique ID for each note
    }))
  );

  const [noteList, setNoteList] = useState(lessonNotes); // State to manage lesson notes

  const handleApprove = (id) => {
    const updatedNotes = noteList.map((note) =>
      note.id === id ? { ...note, status: "Approved" } : note
    );
    setNoteList(updatedNotes);
  };

  const handleReject = (id) => {
    const updatedNotes = noteList.map((note) =>
      note.id === id ? { ...note, status: "Rejected" } : note
    );
    setNoteList(updatedNotes);
  };

  return (
    <div className="review-page">
      <h1>Review {hod} Department Teachers' Notes</h1>
      <div className="note-list">
        {noteList.map((note) => (
          <div key={note.id} className="note-card">
            <h3>Teacher: {note.teacherName}</h3>
            <p>Subject: {note.subject}</p>
            <p>Topic: {note.topic}</p>
            <p>Date: {note.date}</p>
            <p>Note: {note.text}</p>
            <p>
              Status: <strong>{note.status}</strong>
            </p>
            {note.status === "Pending" && (
              <div className="action-buttons">
                <button
                  className="approve-button"
                  onClick={() => handleApprove(note.id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(note.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
