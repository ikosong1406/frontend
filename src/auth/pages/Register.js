import React, { useState } from "react";
import "../styles/Register.css";
import logo from "../../images/logo.jpg";
import axios from "axios";
import BackendApi from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // Declare individual state variables for each input
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const userData = {
      firstname,
      lastname,
      email,
      role: "admin",
      password,
    };

    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${BackendApi}/register`, userData);
      if (response.data.status === "ok") {
        toast.success(response.data.data);
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Registration error");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-overlay"></div>
      <div className="register-box">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            style={{ width: 70, height: 70, borderRadius: "50%" }}
            alt="logo"
          />
        </div>
        <h2>Register</h2>
        <div className="register-input-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="register-input-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="register-input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="register-input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="register-input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className={`register-btn ${loading ? "loading" : ""}`}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
