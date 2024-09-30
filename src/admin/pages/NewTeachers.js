import React, { useState } from "react";
import "../styles/NewTeachers.css";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

const NewTeachers = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    department: "",
    role: "",
    contact: "",
    email: "",
    residentialAddress: "",
    stateOfOrigin: "",
  });

  const [cvPreview, setCvPreview] = useState(null); // CV file preview
  const [certificatePreview, setCertificatePreview] = useState(null); // Certificate file preview
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [teacherCredentials, setTeacherCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "cvUpload") {
      setFormData({ ...formData, cvUpload: file });
      setCvPreview(URL.createObjectURL(file)); // Preview CV
    } else if (name === "certificateUpload") {
      setFormData({ ...formData, certificateUpload: file });
      setCertificatePreview(URL.createObjectURL(file)); // Preview Certificate
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (formData.cvUpload) formDataToSend.append("cv", formData.cvUpload);
    if (formData.certificateUpload)
      formDataToSend.append("certificateUpload", formData.certificateUpload);

    try {
      const response = await axios.post(
        `${BackendApi}/newTeacher`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { email, password } = response.data.data;

      // Show modal with the email and password
      setTeacherCredentials({ email, password });
      setShowModal(true);

      // Show success toast
      toast.success("Staff created successfully");
    } catch (error) {
      // Show error toast
      toast.error("Error creating staff");
      console.error("Error:", error);
    }
  };

  return (
    <div className="staff-container">
      <ToastContainer />
      <div className="staff-form-wrapper">
        <h2>Create New Staff</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <div className="staff-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>State of Origin</label>
                <input
                  type="text"
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div style={{ width: "48%" }}>
              <div className="staff-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="staff-form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="teacher">Teacher</option>
                  <option value="accountant">Accountant</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>
              <div className="staff-form-group">
                <label>Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="staff-form-group">
                <label>Residential Address</label>
                <input
                  type="text"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="staff-form-group">
            <label>CV Upload</label>
            <div
              className="cv-upload"
              onClick={() => document.getElementById("cvInput").click()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                height: 60,
                marginTop: 20,
              }}
            >
              {cvPreview ? (
                <span>{formData.cvUpload.name}</span> // Display file name for CV
              ) : (
                <span>Click to upload CV</span>
              )}
            </div>
            <input
              type="file"
              id="cvInput"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
              name="cvUpload"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Certificate Upload */}
          <div className="staff-form-group">
            <label>Certificate Upload</label>
            <div
              className="certificate-upload"
              onClick={() =>
                document.getElementById("certificateInput").click()
              }
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                height: 60,
                marginTop: 20,
              }}
            >
              {certificatePreview ? (
                <span>{formData.certificateUpload.name}</span> // Display file name for certificate
              ) : (
                <span>Click to upload Certificate</span>
              )}
            </div>
            <input
              type="file"
              id="certificateInput"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
              name="certificateUpload"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="staff-form-group">
            <button type="submit" className="staff-btn-submit">
              Done
            </button>
          </div>
        </form>
      </div>

      {/* Modal to show email and password */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email: {teacherCredentials.email}</p>
          <p>Password: {teacherCredentials.password}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewTeachers;
