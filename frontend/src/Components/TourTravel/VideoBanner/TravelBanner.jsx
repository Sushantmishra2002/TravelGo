// src/components/Banner.jsx
import React from 'react';
import './css/TravelBanner.css';
import videoThumb from '../../../assets/Travel/tourtravel.mp4'; // You can replace with an actual video file

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="discount-badge">
        <p>Enjoy up to</p>
        <h2>10% <span>OFF</span></h2>
        <p className="booking-now">Booking Now!</p>
      </div>

      <div className="travelvideo-section">
        <video autoPlay muted loop className="video-bg">
          <source src={videoThumb} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

     

      <div className="destination-cards">
        
       
        
      </div>
    </div>
  );
};

export default Banner;
