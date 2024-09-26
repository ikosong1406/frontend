import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeUserToken } from "../../Api/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackendApi from "../../Api/BackendApi";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false); // Stop loading if email is invalid
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${BackendApi}/login`, userData);
      const { token, role, message } = response.data;
      storeUserToken(token);
      toast.success(message);
      setLoading(false); // Stop loading after success

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Login error");
      }
      setLoading(false); // Stop loading after error
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
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
