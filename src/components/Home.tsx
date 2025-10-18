import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Button, Nav, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  filterByRegion,
  loadMore,
} from "../store/slices/countriesSlice";
import "./Home.css";
import { AppDispatch } from "../store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const {
    filteredCountries,
    loading,
    error,
    currentPage,
    itemsPerPage,
    selectedRegion,
  } = useSelector((state: any) => state.countries);

  useEffect(() => {
    if (filteredCountries.length === 0 && !loading && !error) {
      dispatch(fetchCountries());
    }
  }, [dispatch, filteredCountries.length, loading, error]);

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

  const totalSlides = 4;

  const handlePreviousSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || currentSlide === index) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const sliderImages = [
    require("../assets/images/slider-image-1.png"),
    require("../assets/images/slider-image-2.png"),
    require("../assets/images/slider-image-3.png"),
    require("../assets/images/country-image.png"),
  ];

  return (
    <div className="home-container">
      <div className="home-header">
        <Container>
          <Row className="align-items-center py-3">
            <Col xs={8}>
              <h4 className="mb-0">Countries</h4>
            </Col>
            <Col xs={4} className="text-end">
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
          <Col xs={12}>
            <div className="welcome-section mb-4">
              <div className="welcome-container-perfect">
                <div className="line line-bottom-perfect"></div>

                <h1 className="welcome-text-perfect">WELCOME</h1>

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
                      }}
                    >
                      {sliderImages.map((image, index) => {
                        console.log(image);
                        return (
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
                        );
                      })}
                    </div>

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
                </div>
                <div className="side-slider-wrapper">
                  <div className="side-slider-content">
                    <img
                      src={require("../assets/images/slider-image-2.png")}
                      alt=""
                      className="slider-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Row>
              {displayedCountries.map((country: any, index: number) => (
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
                        src={require("../assets/images/country-image.png")}
                        alt=""
                        className="flag-image-small"
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

            {hasMore && (
              <Row className="mt-4">
                <Col className="text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      <footer className="home-footer mt-2">
        <Container>
          <Row className="py-1">
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
