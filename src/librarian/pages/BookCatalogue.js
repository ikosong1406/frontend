import React, { useState } from "react";
import "../styles/BookCatalogue.css";

// Dummy backend data for books
const dummyBooks = [
  {
    id: 1,
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    copiesAvailable: 5,
    imageUrl: "https://via.placeholder.com/150",
    description:
      "A novel about the serious issues of rape and racial inequality.",
  },
  {
    id: 2,
    name: "1984",
    author: "George Orwell",
    copiesAvailable: 2,
    imageUrl: "https://via.placeholder.com/150",
    description:
      "A dystopian social science fiction novel and cautionary tale.",
  },
  {
    id: 3,
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    copiesAvailable: 3,
    imageUrl: "https://via.placeholder.com/150",
    description: "A novel about the American dream and societal excess.",
  },
];

const BookCatalogue = () => {
  const [books, setBooks] = useState(dummyBooks);
  const [selectedBook, setSelectedBook] = useState(null); // for viewing/editing
  const [showBookModal, setShowBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    copiesAvailable: "",
    imageUrl: "",
    description: "",
  });
  const [showAddModal, setShowAddModal] = useState(false); // for adding

  // Function to handle editing book details
  const handleSaveChanges = () => {
    setBooks(
      books.map((book) => (book.id === selectedBook.id ? selectedBook : book))
    );
    setShowBookModal(false);
  };

  // Function to add a new book
  const handleAddBook = () => {
    const newId = books.length + 1;
    const newBookData = { ...newBook, id: newId };
    setBooks([...books, newBookData]);
    setShowAddModal(false);
  };

  return (
    <div className="book-catalogue">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Book Catalogue</h1>
        <button onClick={() => setShowAddModal(true)}>Add New Book</button>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-item"
            onClick={() => {
              setSelectedBook(book);
              setShowBookModal(true);
            }}
          >
            <img src={book.imageUrl} alt={book.name} />
            <h3>{book.name}</h3>
            <p>Author: {book.author}</p>
            <p>Copies Available: {book.copiesAvailable}</p>
          </div>
        ))}
      </div>

      {/* Modal for Viewing/Editing Book Details */}
      {showBookModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Book Details</h2>
            <label>Name:</label>
            <input
              type="text"
              value={selectedBook.name}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, name: e.target.value })
              }
            />
            <label>Author:</label>
            <input
              type="text"
              value={selectedBook.author}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, author: e.target.value })
              }
            />
            <label>Copies Available:</label>
            <input
              type="number"
              value={selectedBook.copiesAvailable}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  copiesAvailable: e.target.value,
                })
              }
            />
            <label>Image URL:</label>
            <input
              type="text"
              value={selectedBook.imageUrl}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, imageUrl: e.target.value })
              }
            />
            <label>Description:</label>
            <textarea
              value={selectedBook.description}
              onChange={(e) =>
                setSelectedBook({
                  ...selectedBook,
                  description: e.target.value,
                })
              }
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={() => setShowBookModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding a New Book */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Book</h2>
            <label>Name:</label>
            <input
              type="text"
              value={newBook.name}
              onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
            />
            <label>Author:</label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <label>Copies Available:</label>
            <input
              type="number"
              value={newBook.copiesAvailable}
              onChange={(e) =>
                setNewBook({ ...newBook, copiesAvailable: e.target.value })
              }
            />
            <label>Image URL:</label>
            <input
              type="text"
              value={newBook.imageUrl}
              onChange={(e) =>
                setNewBook({ ...newBook, imageUrl: e.target.value })
              }
            />
            <label>Description:</label>
            <textarea
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleAddBook}>Add Book</button>
              <button onClick={() => setShowAddModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCatalogue;
