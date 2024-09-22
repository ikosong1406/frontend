// NewStaffPage.js
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="staff-container">
      <div className="staff-form-wrapper">
        <h2>Create New Staff</h2>
        <form onSubmit={handleSubmit}>
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
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
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
            <label>Residential Address</label>
            <input
              type="text"
              name="residentialAddress"
              value={formData.residentialAddress}
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
          <div className="staff-form-group">
            <label>CV Upload</label>
            <input
              type="file"
              name="cvUpload"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="staff-form-group">
            <label>Certificate Upload</label>
            <input
              type="file"
              name="certificateUpload"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="staff-form-group">
            <button type="submit" className="staff-btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTeachers;
