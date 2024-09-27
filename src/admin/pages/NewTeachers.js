import React, { useState } from "react";
import "../styles/NewTeachers.css";

const NewTeachers = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    department: "",
    role: "",
    contact: "",
    email: "",
    residentialAddress: "",
    stateOfOrigin: "",
    cvUpload: null,
    certificateUpload: null,
  });

  const [cvPreview, setCvPreview] = useState(null); // CV file preview
  const [certificatePreview, setCertificatePreview] = useState(null); // Certificate file preview

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form data with cvUpload and certificateUpload can now be processed and sent to the backend
  };

  return (
    <div className="staff-container">
      <div className="staff-form-wrapper">
        <h2>Create New Staff</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <div className="staff-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
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
                  name="lastName"
                  value={formData.lastName}
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
                  name="gender"
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
    </div>
  );
};

export default NewTeachers;
