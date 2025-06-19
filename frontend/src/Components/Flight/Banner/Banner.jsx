// src/components/AdBanner.js
import React from 'react';
import './css/Banner.css'; // Adjusted the import if necessary
import Video1 from '../images/banner1.mp4'; // Ensure this file is correct
import Video2 from '../../../assets/Flight/bannerB.mp4'; // Ensure this file is correct

const AdBanner = () => {
  return (
    <div className="ad-banner-container">
      <div className="ad-left">
        <video className="ad-video" autoPlay muted loop>
          <source src={Video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="ad-center">
        <h2 className="ad-title">WEATHERCOAT <span className="highlight">ALL GUARD</span> FLEXO</h2>
        <div className="ad-warranty-badge">
          <div className="badge-circle">8 <small>years</small></div>
          <span className="warranty-text">WARRANTY</span>
        </div>
      </div>

      <div className="ad-right">
        <video className="ad-video" autoPlay muted loop>
          <source src={Video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default AdBanner;
