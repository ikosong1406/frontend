import React, { useState } from "react";
import "../styles/BookIssuing.css";

// Dummy backend data for issued books
const dummyIssuedBooks = [
  {
    id: 1,
    bookName: "To Kill a Mockingbird",
    borrowerName: "John Doe",
    issueDate: "2023-09-01",
    returnDate: "2023-09-15",
    status: "Returned", // Can be "Returned" or "Overdue"
  },
  {
    id: 2,
    bookName: "1984",
    borrowerName: "Jane Smith",
    issueDate: "2023-08-20",
    returnDate: "2023-09-05",
    status: "Overdue",
  },
  {
    id: 3,
    bookName: "The Great Gatsby",
    borrowerName: "Mark Brown",
    issueDate: "2023-09-03",
    returnDate: "2023-09-17",
    status: "Returned",
  },
];

const BookIssuing = () => {
  const [issuedBooks, setIssuedBooks] = useState(dummyIssuedBooks);
  const [selectedIssuing, setSelectedIssuing] = useState(null); // for viewing/editing
  const [showIssuingModal, setShowIssuingModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false); // for adding new issuing

  const [newIssuing, setNewIssuing] = useState({
    bookName: "",
    borrowerName: "",
    issueDate: "",
    returnDate: "",
    status: "Returned",
  });

  // Function to handle editing issuing details
  const handleSaveChanges = () => {
    setIssuedBooks(
      issuedBooks.map((issuing) =>
        issuing.id === selectedIssuing.id ? selectedIssuing : issuing
      )
    );
    setShowIssuingModal(false);
  };

  // Function to add a new book issuing
  const handleAddIssuing = () => {
    const newId = issuedBooks.length + 1;
    const newIssuingData = { ...newIssuing, id: newId };
    setIssuedBooks([...issuedBooks, newIssuingData]);
    setShowAddModal(false);
  };

  return (
    <div className="book-issuing-page">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Book Issuing Page</h1>
        <button onClick={() => setShowAddModal(true)}>
          Create New Issuing
        </button>
      </div>
      <div className="issuing-list">
        {issuedBooks.map((issuing) => (
          <div
            key={issuing.id}
            className="issuing-item"
            onClick={() => {
              setSelectedIssuing(issuing);
              setShowIssuingModal(true);
            }}
          >
            <p>
              <strong>ID:</strong> {issuing.id}
            </p>
            <p>
              <strong>Book:</strong> {issuing.bookName}
            </p>
            <p>
              <strong>Borrow Date:</strong> {issuing.issueDate}
            </p>
            <p>
              <strong>Return Date:</strong> {issuing.returnDate}
            </p>
            <p
              className={
                issuing.status === "Returned"
                  ? "status returned"
                  : "status overdue"
              }
            >
              <strong>Status:</strong> {issuing.status}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Viewing/Editing Issuing Details */}
      {showIssuingModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Issuing Details</h2>
            <label>Book Name:</label>
            <input
              type="text"
              value={selectedIssuing.bookName}
              onChange={(e) =>
                setSelectedIssuing({
                  ...selectedIssuing,
                  bookName: e.target.value,
                })
              }
            />
            <label>Borrower Name:</label>
            <input
              type="text"
              value={selectedIssuing.borrowerName}
              onChange={(e) =>
                setSelectedIssuing({
                  ...selectedIssuing,
                  borrowerName: e.target.value,
                })
              }
            />
            <label>Issue Date:</label>
            <input
              type="date"
              value={selectedIssuing.issueDate}
              onChange={(e) =>
                setSelectedIssuing({
                  ...selectedIssuing,
                  issueDate: e.target.value,
                })
              }
            />
            <label>Return Date:</label>
            <input
              type="date"
              value={selectedIssuing.returnDate}
              onChange={(e) =>
                setSelectedIssuing({
                  ...selectedIssuing,
                  returnDate: e.target.value,
                })
              }
            />
            <label>Status:</label>
            <select
              value={selectedIssuing.status}
              onChange={(e) =>
                setSelectedIssuing({
                  ...selectedIssuing,
                  status: e.target.value,
                })
              }
            >
              <option value="Returned">Returned</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setShowIssuingModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding a New Issuing */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Issuing</h2>
            <label>Book Name:</label>
            <input
              type="text"
              value={newIssuing.bookName}
              onChange={(e) =>
                setNewIssuing({ ...newIssuing, bookName: e.target.value })
              }
            />
            <label>Borrower Name:</label>
            <input
              type="text"
              value={newIssuing.borrowerName}
              onChange={(e) =>
                setNewIssuing({ ...newIssuing, borrowerName: e.target.value })
              }
            />
            <label>Issue Date:</label>
            <input
              type="date"
              value={newIssuing.issueDate}
              onChange={(e) =>
                setNewIssuing({ ...newIssuing, issueDate: e.target.value })
              }
            />
            <label>Return Date:</label>
            <input
              type="date"
              value={newIssuing.returnDate}
              onChange={(e) =>
                setNewIssuing({ ...newIssuing, returnDate: e.target.value })
              }
            />
            <label>Status:</label>
            <select
              value={newIssuing.status}
              onChange={(e) =>
                setNewIssuing({ ...newIssuing, status: e.target.value })
              }
            >
              <option value="Returned">Returned</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="modal-actions">
              <button onClick={handleAddIssuing}>Add Issuing</button>
              <button onClick={() => setShowAddModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookIssuing;
