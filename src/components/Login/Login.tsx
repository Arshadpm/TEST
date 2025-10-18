import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login-image.png";
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
      <Row className="g-0 h-100">
        <Col md={6} className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h1 className="sign-in-title">Sign In</h1>
              <p className="new-user-text">
                New user? <a href="/signup" className="create-account-link">Create an account</a>
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
                  <span>G</span>
                </button>
                <button
                  type="button"
                  className="social-button"
                  aria-label="Facebook"
                >
                  <span>f</span>
                </button>
                <button
                  type="button"
                  className="social-button"
                  aria-label="LinkedIn"
                >
                  <span>in</span>
                </button>
                <button
                  type="button"
                  className="social-button"
                  aria-label="Twitter"
                >
                  <span>T</span>
                </button>
              </div>
            </form>
          </div>
        </Col>

        <Col md={6} className="login-image-section d-none d-md-block">
          <div className="image-container">
            <img
              src={loginImage}
              alt="Login illustration"
              className="login-image"
              loading="eager"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
