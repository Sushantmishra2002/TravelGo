import React from "react";
import { Link } from "react-router-dom";
import travelVideo from "./trevelgoAirilness.mp4";
import "./BannerFlight.css"; // Updated CSS

const BannerFlight = () => {
  return (
    <div className="flight-banner">
      {/* Left Side: Video Background */}
      <div className="flight-video-container">
        <video autoPlay loop muted playsInline>
          <source src={travelVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Right Side: Content */}
      <div className="flight-text-container">
        <h1>
          Experience <span>Emirates Airline</span> with TravelGo
        </h1>
        <p>Redefine Elegance in the Skies With Our Premium Airline Partner</p>

        {/* Buttons */}
        <div className="flight-button-group">
          <Link to="/flights" className="flight-button-primary">
            VIEW EMIRATES STORE
          </Link>
          <Link to="/flights" className="flight-button-secondary">
            BOOK NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerFlight;
