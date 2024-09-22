// NewStudentPage.js
import React, { useState } from "react";
import "../styles/NewStudent.css";

const NewStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    class: "",
    section: "",
    residentialAddress: "",
    stateOfOrigin: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Create New Student</h2>
        <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              required
            />
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
            <label>Parent Email</label>
            <input
              type="email"
              name="parentEmail"
              value={formData.parentEmail}
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
          <div className="form-group">
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStudent;
