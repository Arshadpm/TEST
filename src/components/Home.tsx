import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Navbar,
  Spinner,
  Alert,
  Collapse,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCountries,
  filterByRegion,
  loadMore,
} from "../store/slices/countriesSlice";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import "./Home.css";
import "./HomeSlider.css";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const {
    countries,
    filteredCountries,
    loading,
    error,
    currentPage,
    itemsPerPage,
    selectedRegion,
  } = useAppSelector((state) => state.countries);

  useEffect(() => {
    if (filteredCountries.length === 0 && !loading && !error) {
      dispatch(fetchCountries());
    }
  }, [dispatch, filteredCountries.length, loading, error]);

  const regions = useMemo(() => {
    const uniqueRegions = [
      ...new Set(countries.map((country) => country.region)),
    ];
    return uniqueRegions.filter((region) => region && region.trim() !== "");
  }, [countries]);

  const displayedCountries = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredCountries.slice(startIndex, endIndex);
  }, [filteredCountries, currentPage, itemsPerPage]);

  const hasMore = displayedCountries.length < filteredCountries.length;

  const handleRegionFilter = (region: string) => {
    dispatch(filterByRegion(region));
  };

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Slider functionality
  const totalSlides = 3; // Number of slides
  const transitionDuration = 500; // Animation duration in ms

  const handlePreviousSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  };

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isTransitioning) {
        // Inline implementation to avoid dependency issues
        setIsTransitioning(true);
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        setTimeout(() => setIsTransitioning(false), transitionDuration);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [isTransitioning, totalSlides, transitionDuration]);

  // Sample images for slider
  const sliderImages = [
    "/src/assets/images/slider1.jpg",
    "/src/assets/images/slider2.jpg",
    "/src/assets/images/slider3.jpg",
  ];

  if (loading && displayedCountries.length === 0) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <div className="home-container">
      {/* Navigation Header */}
      <div className="home-header">
        <Container>
          <Row className="align-items-center py-3">
            <Col xs={8}>
              <h4 className="mb-0">Countries</h4>
            </Col>
            <Col xs={4} className="text-end">
              {/* Desktop Navigation */}
              <div className="d-none d-md-block">
                <Nav className="justify-content-end">
                  <Nav.Link
                    className={selectedRegion === "" ? "active" : ""}
                    onClick={() => handleRegionFilter("")}
                  >
                    All
                  </Nav.Link>
                  <Nav.Link
                    className={selectedRegion === "Asia" ? "active" : ""}
                    onClick={() => handleRegionFilter("Asia")}
                  >
                    Asia
                  </Nav.Link>
                  <Nav.Link
                    className={selectedRegion === "Europe" ? "active" : ""}
                    onClick={() => handleRegionFilter("Europe")}
                  >
                    Europe
                  </Nav.Link>
                </Nav>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="link"
                className={`d-md-none p-0 mobile-menu-toggle ${
                  mobileMenuOpen ? "open" : ""
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
            </Col>
          </Row>

          {/* Mobile Navigation Menu */}
          <Collapse in={mobileMenuOpen}>
            <div className="d-md-none">
              <Nav className="mobile-nav flex-column py-2">
                <Nav.Link
                  className={selectedRegion === "" ? "active" : ""}
                  onClick={() => {
                    handleRegionFilter("");
                    setMobileMenuOpen(false);
                  }}
                >
                  All
                </Nav.Link>
                <Nav.Link
                  className={selectedRegion === "Asia" ? "active" : ""}
                  onClick={() => {
                    handleRegionFilter("Asia");
                    setMobileMenuOpen(false);
                  }}
                >
                  Asia
                </Nav.Link>
                <Nav.Link
                  className={selectedRegion === "Europe" ? "active" : ""}
                  onClick={() => {
                    handleRegionFilter("Europe");
                    setMobileMenuOpen(false);
                  }}
                >
                  Europe
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>
        </Container>
      </div>

      <Container>
        <Row>
          {/* Main Content */}
          <Col xs={12}>
            {/* Welcome Section with Slider */}
            <div className="welcome-section mb-4">
              <div className="welcome-container-perfect">
                {/* Left line: Aligned to the bottom (Baseline) */}
                <div className="line line-bottom-perfect"></div>

                {/* The main text */}
                <h1 className="welcome-text-perfect">WELCOME</h1>

                {/* Right line: Aligned to the top (Cap Height) */}
                <div className="line line-top-perfect"></div>
              </div>

              <div className="slider-container-home">
                <div className="main-slider-wrapper">
                  <div
                    className={`main-slider-content ${
                      isTransitioning ? "transitioning" : ""
                    }`}
                  >
                    <div
                      className="slider-track"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        width: `${sliderImages.length * 100}%`,
                        display: "flex",
                      }}
                    >
                      {sliderImages.map((image, index) => (
                        <div
                          key={index}
                          className="slider-slide"
                          style={{ width: `${100 / sliderImages.length}%` }}
                        >
                          <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="slider-image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Bottom Navigation */}
                  <div className="slider-bottom-controls">
                    <button
                      className="slider-arrow slider-arrow-left"
                      onClick={handlePreviousSlide}
                      disabled={isTransitioning}
                    >
                      ←
                    </button>
                    <div className="slider-dots">
                      {[...Array(totalSlides)].map((_, index) => (
                        <button
                          key={index}
                          className={`slider-dot ${
                            index === currentSlide ? "active" : ""
                          }`}
                          onClick={() => handleDotClick(index)}
                          disabled={isTransitioning}
                        />
                      ))}
                    </div>
                    <button
                      className="slider-arrow slider-arrow-right"
                      onClick={handleNextSlide}
                      disabled={isTransitioning}
                    >
                      →
                    </button>
                  </div>
                </div>
                <div className="side-slider-wrapper">
                  <div className="side-slider-content">
                    <div className="slider-placeholder">
                      <img
                        src="/src/assets/images/slider2.jpg"
                        alt="Side slide"
                        className="slider-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Countries Grid */}
            <Row>
              {displayedCountries.map((country, index) => (
                <Col
                  key={`${country.name}-${index}`}
                  lg={6}
                  md={6}
                  sm={12}
                  className="mb-3"
                >
                  <div className="country-card">
                    <div className="country-flag-small">
                      <img
                        src={"/src/assets/images/country-image.png"}
                        alt=""
                      />
                    </div>
                    <div>
                      <h6>{country.name}</h6>
                      <small className="text-muted">{country.region}</small>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Load More Button */}
            {hasMore && (
              <Row className="mt-4">
                <Col className="text-center">
                  <Button
                    variant="dark"
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="home-footer mt-5">
        <Container>
          <Row className="py-4">
            <Col className="text-center">
              <div className="social-links mb-4">
                <Button variant="outline-dark" className="social-btn me-3">
                  <i className="fab fa-facebook-f"></i>
                </Button>
                <Button variant="outline-dark" className="social-btn me-3">
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button variant="outline-dark" className="social-btn me-3">
                  <i className="fab fa-linkedin-in"></i>
                </Button>
                <Button variant="outline-dark" className="social-btn">
                  <i className="fab fa-youtube"></i>
                </Button>
              </div>
              <div className="footer-email mb-2">
                <p>Example@email.com</p>
                <p>Copyright © 2020 Name. All rights reserved.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
