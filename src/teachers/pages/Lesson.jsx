import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Lesson.css";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";

const Lesson = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [notes, setNotes] = useState([]);
  const [userData, setUserData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userToken = await getUserToken();
      setToken(userToken);
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    const data = { token };
    try {
      const response = await axios.post(`${BackendApi}/userdata`, data);
      const fetchedData = response.data.data;

      setUserData(fetchedData);
      setNotes(fetchedData.lessonNote);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRefreshing(true);
        getData();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [token]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNoteClick = (note) => {
    navigate(`/teacher/newLesson/${note.id}`, { state: { note } });
  };

  const filteredNotes = notes.filter((note) =>
    note.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

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
            <tr key={note._id} onClick={() => handleNoteClick(note)}>
              <td>{note.topic}</td>
              <td>{note.className}</td>
              <td>{note.subject}</td>
              <td>{formatDate(note.date)}</td>
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
