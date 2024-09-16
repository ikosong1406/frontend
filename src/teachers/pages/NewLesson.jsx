import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "../styles/NewLesson.css";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";

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
    content: "",
    categoryColor: "#ffffff",
  });
  const [categories, setCategories] = useState({
    Math: "#ff6347",
    Science: "#4682b4",
    English: "#3cb371",
  });
  const [selectedCategory, setSelectedCategory] = useState("Math");

  useEffect(() => {
    if (id === "new") {
      setNote({
        topic: location.state?.note?.topic || "",
        date: location.state?.note?.date || "",
        className: location.state?.note?.className || "",
        content: "",
        categoryColor: "#ffffff",
      });
    } else {
      setNote(
        location.state?.note || {
          topic: "",
          date: "",
          className: "",
          content: "",
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
    doc.save(`${note.topic || "document"}.pdf`);
  };

  const handleExportWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(note.topic || "Document Title").bold().size(24),
                new TextRun("\n\n"),
                new TextRun(quillRef.current.getEditor().root.innerText),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.topic || "document"}.docx`;
    link.click();
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
        <button onClick={handleExportWord}>Export as Word</button>
        <button onClick={handleSave}>Save</button>
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
        value={note.content}
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
