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

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cv, setCv] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);
  const [certificate, setCertificate] = useState(null);
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); // Save the selected file
      setPhotoPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCv(file); // Save the selected file
      setCvPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificate(file); // Save the selected file
      setCertificatePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle both text and file data
    const data = new FormData();

    // Append the form data to FormData
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("gender", formData.gender);
    data.append("department", formData.department);
    data.append("contact", formData.contact);
    data.append("email", formData.email);
    data.append("role", formData.role);
    data.append("residentialAddress", formData.residentialAddress);
    data.append("stateOfOrigin", formData.stateOfOrigin);

    // Append the student photo if it exists
    if (photo) {
      data.append("photo", photo);
    }
    if (cv) {
      data.append("cv", cv);
    }
    if (certificate) {
      data.append("certificate", certificate);
    }

    try {
      const response = await axios.post(`${BackendApi}/newTeacher`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { email, password } = response.data.data;

      // Show modal with the email and password
      setTeacherCredentials({ email, password });
      setShowModal(true);

      setFormData({
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

      setPhoto(null);
      setPhotoPreview(null);
      setCv(null);
      setCvPreview(null);
      setCertificate(null);
      setCertificatePreview(null);
    } catch (error) {
      // Show error toast
      toast.error("Error creating staff");
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
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
            <label>Photo Upload</label>
            <div
              className="cv-upload"
              onClick={() => document.getElementById("photoInput").click()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                height: 100,
                marginTop: 20,
              }}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "100%",
                  }}
                />
              ) : (
                <span>Click to upload Photo</span>
              )}
            </div>
            <input
              type="file"
              id="photoInput"
              style={{ display: "none" }}
              accept="image/*"
              name="cvUpload"
              onChange={handlePhotoChange}
              required
            />
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
                height: 100,
                marginTop: 20,
              }}
            >
              {cvPreview ? (
                <img
                  src={cvPreview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "100%",
                  }}
                />
              ) : (
                <span>Click to upload CV</span>
              )}
            </div>
            <input
              type="file"
              id="cvInput"
              style={{ display: "none" }}
              accept="image/*"
              name="cvUpload"
              onChange={handleCvChange}
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
                height: 100,
                marginTop: 20,
              }}
            >
              {certificatePreview ? (
                <img
                  src={certificatePreview}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "100%",
                  }}
                />
              ) : (
                <span>Click to upload Certificate</span>
              )}
            </div>
            <input
              type="file"
              id="certificateInput"
              style={{ display: "none" }}
              accept="application/pdf,image/*"
              name="certificateUpload"
              onChange={handleCertificateChange}
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

      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ height: 200 }}>
            <div style={{ display: "flex" }}>
              <h2>Staff Created</h2>
              <button
                onClick={handleCloseModal}
                style={{ color: "black", fontWeight: "800", fontSize: 20 }}
              >
                X
              </button>
            </div>

            <h3 style={{ textAlign: "center", fontSize: 18 }}>
              Email: {teacherCredentials.email}
            </h3>
            <h3 style={{ textAlign: "center", fontSize: 18 }}>
              Password: {teacherCredentials.password}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTeachers;
