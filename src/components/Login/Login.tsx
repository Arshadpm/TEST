import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import "./Login.css";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    auth: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dummyUser = {
    email: "test@example.com",
    password: "Test@123",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      auth: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", password: "", auth: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      const password = formData.password;
      const minLength = password.length >= 8;
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSymbol = /[^A-Za-z0-9]/.test(password);

      if (!minLength) {
        newErrors.password = "Password must be at least 8 characters long";
        isValid = false;
      } else if (!hasUppercase) {
        newErrors.password =
          "Password must contain at least one uppercase letter";
        isValid = false;
      } else if (!hasNumber) {
        newErrors.password = "Password must contain at least one number";
        isValid = false;
      } else if (!hasSymbol) {
        newErrors.password =
          "Password must contain at least one special character";
        isValid = false;
      }
    }

    if (
      isValid &&
      (formData.email !== dummyUser.email ||
        formData.password !== dummyUser.password)
    ) {
      newErrors.auth = "Invalid email or password";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      dispatch(login({ email: formData.email }));
      navigate("/home");
    }
  };

  return (
    <Container fluid className="login-container p-0">
      <Col md={5} className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h1 className="sign-in-title">Sign In</h1>
            <p className="new-user-text">
              New user?
              <a href="/signup" className="create-account-link">
                Create an account
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username or email"
                className={`form-input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
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
              {errors.password && (
                <div className="error-text">{errors.password}</div>
              )}
            </div>

            {errors.auth && <div className="error-text">{errors.auth}</div>}

            

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="custom-checkbox"
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

            <div className="container">
              <div className="row py-1">
                <div className="col text-center">
                  <div className="social-links mb-4">
                    <button className="btn btn-outline-dark social-btn me-3">
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="btn btn-outline-dark social-btn me-3">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button className="btn btn-outline-dark social-btn me-3">
                      <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button className="btn btn-outline-dark social-btn">
                      <i className="fab fa-youtube"></i>
                    </button>
                  </div>
                </div>
              </div>
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
