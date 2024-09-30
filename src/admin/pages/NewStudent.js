import React, { useState } from "react";
import "../styles/NewStudent.css";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewStudent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    className: "",
    section: "",
    stateOfOrigin: "",
    residentialAddress: "",
    parentName: "",
    parentNumber: "",
    parentEmail: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle both text and file data
    const data = new FormData();

    // Append the form data to FormData
    data.append("firstname", formData.firstname);
    data.append("middlename", formData.middlename);
    data.append("lastname", formData.lastname);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("gender", formData.gender);
    data.append("className", formData.className);
    data.append("section", formData.section);
    data.append("stateOfOrigin", formData.stateOfOrigin);
    data.append("residentialAddress", formData.residentialAddress);
    data.append("parentName", formData.parentName);
    data.append("parentNumber", formData.parentNumber);
    data.append("parentEmail", formData.parentEmail);

    // Append the student photo if it exists
    if (studentPhoto) {
      data.append("studentPhoto", studentPhoto);
    }

    try {
      // Send a POST request to the backend
      const response = await axios.post(`${BackendApi}/newStudent`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // This tells the backend you're sending form data with a file
        },
      });

      // Check if response is successful
      if (response.status === 200) {
        toast.success("Student created successfully!");

        // Reset the form to default values after successful creation
        setFormData({
          firstname: "",
          middlename: "",
          lastname: "",
          dateOfBirth: "",
          gender: "",
          className: "",
          section: "",
          stateOfOrigin: "",
          residentialAddress: "",
          parentName: "",
          parentNumber: "",
          parentEmail: "",
        });

        setStudentPhoto(null);
        setPhotoPreview(null); // Reset the photo preview
      } else {
        toast.error("Failed to create student");
      }
    } catch (error) {
      // Show error message if submission fails
      toast.error("Failed to add student. Please try again.");
      console.error("There was an error uploading the data:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="form-wrapper">
        <h2 style={{ fontSize: 20, textAlign: "left" }}>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
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
                  type="text"
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
                  name="middlename"
                  value={formData.middlename}
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
                  type="text"
                  name="parentNumber"
                  value={formData.parentNumber}
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
                border: "2px dashed gray",
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
                <span style={{ color: "gray" }}>
                  Click to upload student photo
                </span>
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
