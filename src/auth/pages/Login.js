import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

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
      navigate("/teacher");
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="login-box">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>Logo</h2>
        </div>
        <h2>Login</h2>
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
              {passwordVisible ? "🙈" : "👁️"}
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
        <p className="signin-text">
          Don't have an account?{" "}
          <Link to="/register" className="signin-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
