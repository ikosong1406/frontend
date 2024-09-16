import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  // Declare individual state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    // Validation for required fields and matching passwords
    if (
      !firstName ||
      !lastName ||
      !email ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset error and simulate loading
    setError("");
    setLoading(true);

    // Simulate a delay for registration (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      alert("Registered successfully! 🎉");
    }, 3000);
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      <div className="register-box">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Logo</h2>
        </div>
        <h2>Register</h2>
        {error && <p className="register-error-msg">{error}</p>}

        <div className="register-input-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="register-input-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select your role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="librarian">Librarian</option>
          </select>
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

        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/" className="signin-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
