import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { getUserToken } from "../../Api/storage";
import { toast, ToastContainer } from "react-toastify";
import { jsPDF } from "jspdf";
import "../styles/NewLesson.css";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";

const NewLesson = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const quillRef = useRef(null);
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
      setLoading(false);
    } catch (error) {
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

  // State for the lesson note
  const [note, setNote] = useState({
    subject: "", // Subject input added
    topic: "",
    date: "",
    className: "",
    text: "",
    status: "pending", // Assuming 'Draft' as the default status
    attachment: "",
  });

  const [attachedFile, setAttachedFile] = useState(null); // Attached file state

  useEffect(() => {
    if (id === "new") {
      setNote({
        subject: location.state?.note?.subject || "",
        topic: location.state?.note?.topic || "",
        date: location.state?.note?.date || "",
        className: location.state?.note?.className || "",
        text: location.state?.note?.text || "",
        status: "pending",
        attachment: location.state?.note?.attachment || "",
      });
    } else {
      setNote(
        location.state?.note || {
          subject: "",
          topic: "",
          date: "",
          className: "",
          text: "",
          status: "pending",
          attachment: "",
        }
      );
    }
  }, [id, location.state?.note]);

  const handleSave = async () => {
    try {
      const lessonNote = {
        userId: userData._id, // assuming you pass userData to this component
        subject: note.subject,
        topic: note.topic,
        date: note.date,
        className: note.className,
        text: note.text,
        status: note.status,
        attachment: attachedFile ? attachedFile.name : "",
      };

      // Save the note to the backend
      const response = await axios.post(`${BackendApi}/newLesson`, lessonNote);
      toast.success("Lesson note saved successfully!");
    } catch (error) {
      toast.error("Error saving lesson note.");
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const content = quillRef.current.getEditor().root.innerText;
    doc.text(content, 10, 10);
    doc.save(`${note.topic || "document"}.pdf`);
  };

  // Handle file attachment
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  return (
    <div className="edit-lesson-page">
      <ToastContainer />
      <div className="toolbar">
        <button
          onClick={() => quillRef.current.getEditor().format("bold", true)}
        >
          <FaBold />
        </button>
        <button
          onClick={() => quillRef.current.getEditor().format("italic", true)}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => quillRef.current.getEditor().format("underline", true)}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => quillRef.current.getEditor().format("align", "left")}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => quillRef.current.getEditor().format("align", "center")}
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => quillRef.current.getEditor().format("align", "right")}
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() =>
            quillRef.current.getEditor().format("align", "justify")
          }
        >
          <FaAlignJustify />
        </button>
        <button onClick={handleExportPDF}>Export as PDF</button>
        <button onClick={handleSave}>Save</button>
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <div className="header">
        <input
          type="text"
          placeholder="Subject"
          value={note.subject}
          onChange={(e) => setNote({ ...note, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Topic"
          value={note.topic}
          onChange={(e) => setNote({ ...note, topic: e.target.value })}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="date"
            value={note.date}
            onChange={(e) => setNote({ ...note, date: e.target.value })}
            style={{ width: "40%" }}
          />
          <input
            type="text"
            placeholder="Class"
            value={note.className}
            onChange={(e) => setNote({ ...note, className: e.target.value })}
            style={{ width: "40%" }}
          />
        </div>
      </div>

      <ReactQuill
        ref={quillRef}
        value={note.text}
        onChange={(content) => setNote({ ...note, text: content })}
        className="ql-container"
      />
    </div>
  );
};

export default NewLesson;
