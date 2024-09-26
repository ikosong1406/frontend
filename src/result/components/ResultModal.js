import React, { useState } from "react";

const ResultModal = ({ closeModal }) => {
  const [subject, setSubject] = useState("");
  const [firstTest, setFirstTest] = useState(0);
  const [secondTest, setSecondTest] = useState(0);
  const [exam, setExam] = useState(0);

  const total = firstTest + secondTest + exam;
  const grade = total >= 75 ? "A" : total >= 65 ? "B" : "C"; // Sample grading logic

  const handleSubmit = () => {
    // Logic to upload result
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload Result</h2>
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="First Test"
          value={firstTest}
          onChange={(e) => setFirstTest(+e.target.value)}
        />
        <input
          type="number"
          placeholder="Second Test"
          value={secondTest}
          onChange={(e) => setSecondTest(+e.target.value)}
        />
        <input
          type="number"
          placeholder="Exam"
          value={exam}
          onChange={(e) => setExam(+e.target.value)}
        />
        <p>Total: {total}</p>
        <p>Grade: {grade}</p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ResultModal;
