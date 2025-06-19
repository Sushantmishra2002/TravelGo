import React from 'react';
import './css/Banner2.css'; // Keep this, only classes inside will change
import banner1 from '../../../assets/Flight/images/banner1.jpg';
import banner2 from '../../../assets/Flight/images/banner2.jpg';
import banner3 from '../../../assets/Flight/images/banner3.jpg';

const Banner2 = () => {
  const banners = [
    {
      title: "Flights",
      description: "New Routes by Virgin Atlantic!",
      image: banner1,
      limitedOffer: true,
    },
    {
      title: "Flights",
      description: "LIVE NOW: Special Offer by Virgin Atlantic!",
      image: banner2,
      validUntil: "31st Dec '25",
      limitedOffer: true,
    },
    {
      title: "Domestic Flights",
      description: "Get up to Rs. 2,000* OFF on Domestic Flight bookings",
      image: banner3,
      limitedOffer: true,
    },
  ];

  return (
    <div className="bb-banner-grid">
      {banners.map((banner, index) => (
        <div className="bb-banner-card" key={index}>
          <img src={banner.image} alt={banner.title} className="bb-banner2-image" />
          <div className="bb-banner-content">
            <h3 className="bb-banner-title">{banner.title}</h3>
            <p className="bb-banner-description">{banner.description}</p>
            {banner.validUntil && <p className="bb-banner-validity">Valid till {banner.validUntil}</p>}
            {banner.limitedOffer && <p className="bb-limited-offer">Limited period offer</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner2;
