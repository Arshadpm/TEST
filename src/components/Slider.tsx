import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./Slider.css";

interface SliderProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Slider: React.FC<SliderProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return <div className="slider-placeholder">No images to display</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <Button
          variant="light"
          className="slider-nav-btn slider-nav-prev"
          onClick={goToPrevious}
          disabled={images.length <= 1}
        >
          <i className="fas fa-chevron-left"></i>
        </Button>

        <div className="slider-content">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="slider-slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="light"
          className="slider-nav-btn slider-nav-next"
          onClick={goToNext}
          disabled={images.length <= 1}
        >
          <i className="fas fa-chevron-right"></i>
        </Button>
      </div>

      {images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;
