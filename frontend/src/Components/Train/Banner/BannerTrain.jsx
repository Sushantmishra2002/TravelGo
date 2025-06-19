import React from "react";
import { Link } from "react-router-dom";
import Trainvideo from "./trainvideo.mp4"; // Import your video file
import "./BannerTrain.css"; // Import CSS

const BannerTrain = () => {
  return (
    <div className="relative">
      {/* Left Side: Video Background */}
      <div className="video-container">
        <video autoPlay loop muted playsInline>
          <source src={Trainvideo} type="video/mp4" />
        Your browser does not support the video tag.
        </video>
      </div>

      {/* Right Side: Content */}
      <div className="text-container">
        <h1>
          Experience <span>Indian Railway</span> with TravelGo
        </h1>
        <p>Redefine Elegance in the Skies With Our Premium Trains all over India</p>

        {/* Buttons */}
        <div className="button-group">
         
          <Link to="/flights" className="button-secondary">
            BOOK NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerTrain;
