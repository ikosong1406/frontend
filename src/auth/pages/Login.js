import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../../images/logo.jpg";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Reset error and simulate loading
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/admin");
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            style={{ width: 70, height: 70, borderRadius: "50%" }}
          />
        </div>
        <h2 style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          Login
        </h2>
        {error && <p className="error-msg">{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
          </div>
        </div>
        <button
          className={`login-btn ${loading ? "loading" : ""}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
