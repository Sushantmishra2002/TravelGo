import React from "react";
import { Link } from "react-router-dom"; // Add this import
import "./AdventureHighlight.css";

const AdventureHighlight = () => {
  return (
    <div className="adventure-container">
      <h1 className="adventure-title">Most Popular Adventure in Nepal</h1>
      <div className="adventure-content">
        {/* Video Section */}
        <div className="adventure-video fade-in-left">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/QXk7zdJp7Yw?autoplay=1&mute=1"
            title="Adventure in Nepal"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Description Section */}
        <div className="adventure-text fade-in-right">
          <p>
            Nepal offers thrilling adventures—from trekking the Himalayas to 
            bungee jumping, paragliding, and helicopter tours. Discover the wild side of Nepal!
          </p>
          <Link to="/activities">
            <button className="know-more-btn"> View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdventureHighlight;
