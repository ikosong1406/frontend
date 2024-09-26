import React, { useState } from "react";
import "../styles/Review.css"; // Import CSS for styling

// Dummy data for teacher notes
const notes = [
  {
    id: 1,
    teacherName: "Mr. John Doe",
    subject: "Mathematics",
    note: "This is the note for Math class.",
    status: "Pending", // Approval status
  },
  {
    id: 2,
    teacherName: "Ms. Jane Smith",
    subject: "English",
    note: "This is the note for English class.",
    status: "Pending", // Approval status
  },
  {
    id: 3,
    teacherName: "Mr. Alex Johnson",
    subject: "Science",
    note: "This is the note for Science class.",
    status: "Pending", // Approval status
  },
];

const Review = () => {
  const [noteList, setNoteList] = useState(notes); // State to manage notes

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
      <h1>Review Teachers' Notes</h1>
      <div className="note-list">
        {noteList.map((note) => (
          <div key={note.id} className="note-card">
            <h3>Teacher: {note.teacherName}</h3>
            <p>Subject: {note.subject}</p>
            <p>Note: {note.note}</p>
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
