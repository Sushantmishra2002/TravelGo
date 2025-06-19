import React from "react";
import "./MaldivesBanner.css";
import maldivesVideo from'./video/maldives.mp4'; // Adjust the path as necessary


const videoMaldives = () => {
  return (
    <div className="mal-banner-container">
      <video className="mal-banner-video" autoPlay muted loop>
        <source src={maldivesVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mal-banner-overlay">
        <h1>Escape to the Maldives</h1>
        <p>Experience paradise like never before</p>
        <button className="book-now-btn">Book Now</button>
      </div>
    </div>
  );
};

export default videoMaldives;
