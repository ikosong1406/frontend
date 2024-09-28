import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
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

  // State for the lesson note and category
  const [note, setNote] = useState({
    topic: "",
    date: "",
    className: "",
    text: "",
    categoryColor: "#ffffff",
  });
  const [categories, setCategories] = useState({
    Math: "#ff6347",
    Science: "#4682b4",
    English: "#3cb371",
  });
  const [selectedCategory, setSelectedCategory] = useState("Math");

  // State for the attached file
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    if (id === "new") {
      setNote({
        topic: location.state?.note?.topic || "",
        date: location.state?.note?.date || "",
        className: location.state?.note?.className || "",
        text: location.state?.note?.text || "",
        categoryColor: "#ffffff",
      });
    } else {
      setNote(
        location.state?.note || {
          topic: "",
          date: "",
          className: "",
          text: "",
          categoryColor: "#ffffff",
        }
      );
    }
  }, [id, location.state?.note]);

  const handleSave = () => {
    alert("Note saved!");
    navigate("/");
  };

  const handlePrint = () => {
    if (quillRef.current) {
      const printWindow = window.open("", "", "height=600,width=800");
      printWindow.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow.document.write(quillRef.current.getEditor().root.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const content = quillRef.current.getEditor().root.innerText;
    doc.text(content, 10, 10);
    // doc.save(${note.topic || "document"}.pdf);
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
      <div className="toolbar">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setNote((prev) => ({
              ...prev,
              categoryColor: categories[e.target.value],
            }));
          }}
        >
          {Object.keys(categories).map((category) => (
            <option
              key={category}
              value={category}
              style={{ backgroundColor: categories[category] }}
            >
              {category}
            </option>
          ))}
        </select>
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

        <button onClick={handlePrint}>Print</button>
        <button onClick={handleExportPDF}>Export as PDF</button>
        <button onClick={handleSave}>Save</button>

        {/* File Attachment */}
        <input
          type="file"
          // value={note.attachment}
          onChange={handleFileUpload}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <div className="header">
        <input
          type="text"
          placeholder="Topic"
          value={note.topic}
          onChange={(e) => setNote({ ...note, topic: e.target.value })}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="date"
            placeholder="Date"
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
        onChange={(content) => setNote({ ...note, content })}
        modules={{
          toolbar: false, // Disable Quill's default toolbar
        }}
        className="ql-container"
      />
    </div>
  );
};

export default NewLesson;
