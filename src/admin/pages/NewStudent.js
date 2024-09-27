import React, { useState } from "react";
import "../styles/NewStudent.css";

const NewStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    section: "",
    stateOfOrigin: "",
    residentialAddress: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  });

  const [studentPhoto, setStudentPhoto] = useState(null); // State to store the selected photo
  const [photoPreview, setPhotoPreview] = useState(null); // For photo preview

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
      setStudentPhoto(file); // Save the selected file
      setPhotoPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, studentPhoto);
    // Form data can now include the student photo for backend upload
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 style={{ fontSize: 20, textAlign: "left" }}>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label>Class</label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="primary 1">Primary 1</option>
                  <option value="primary 2">Primary 2</option>
                  <option value="primary 3">Primary 3</option>
                  <option value="primary 4">Primary 4</option>
                  <option value="primary 5">Primary 5</option>
                  <option value="Junior Secondary 1">Junior Secondary 1</option>
                  <option value="Junior Secondary 2">Junior Secondary 2</option>
                  <option value="Junior Secondary 3">Junior Secondary 3</option>
                  <option value="Senior Secondary 1">Senior Secondary 1</option>
                  <option value="Senior Secondary 2">Senior Secondary 2</option>
                  <option value="Senior Secondary 3">Senior Secondary 3</option>
                </select>
              </div>
              <div className="form-group">
                <label>State of Origin</label>
                <input
                  type="text"
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Parent Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div style={{ width: "48%" }}>
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Section</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>
              <div className="form-group">
                <label>Residential Address</label>
                <input
                  type="text"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Parent Phone</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div
              className="photo-upload"
              onClick={() => document.getElementById("photoInput").click()}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                height: 60,
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
                <span>Click to upload student photo</span>
              )}
            </div>
            <input
              type="file"
              id="photoInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-submit">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStudent;
