import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic here
    navigate("/home");
  };

  return (
    <Container fluid className="login-container p-0">
      <Col md={5} className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h1 className="sign-in-title">Sign In</h1>
            <p className="new-user-text">
              New user?{" "}
              <a href="/signup" className="create-account-link">
                Create an account
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username or email"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="form-input"
              />
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="rememberMe" className="form-check-label">
                Keep me signed in
              </label>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>

            <div className="or-sign-in-with">
              <div className="line"></div>
              <span>Or Sign In With</span>
              <div className="line"></div>
            </div>

            <div className="social-login">
              <button
                type="button"
                className="social-button"
                aria-label="Google"
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="social-button"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="social-button"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </button>
              <button
                type="button"
                className="social-button"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>
          </form>
        </div>
      </Col>

      <Col md={3} className="login-right-section d-md-flex d-none">
        <div className="login-right-content w-100">
          <div className="login-illustration w-100">
            <img
              src={require("../../assets/images/login-image.png")}
              alt="Person walking"
              className="person-illustration"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default Login;
