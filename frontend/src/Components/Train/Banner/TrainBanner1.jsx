import React from "react";
import "./TrainBanner1.css";
import image1 from "../images/why1.png";
import image2 from "../images/why2.png";
import image3 from "../images/why3.png"; // Replace this with your actual third image

const features = [
  {
    title: "Redrail confirm",
    description: "Confirm ticket on waitlisted trains",
    image: image1,
    color: "#D32F2F"
  },
  {
    title: "Seat Guarantee",
    description: "on waitlisted tickets or 3X refund",
    image: image2,
    color: "#673AB7"
  },
  {
    title: "Connecting trains",
    description: "Connecting trains option available",
    image: image3, // use actual imported image
    color: "#2E7D32"
  }
];

const WhyBookWithRedRail = () => {
  return (
    <div className="why-book-container">
      <h2>Why Book With TravelGo</h2>
      <div className="cards-container">
        {features.map((feature, index) => (
          <div className="card" key={index}>
            <div className="card-text">
              <h3 style={{ color: feature.color }}>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
            <img src={feature.image} alt={feature.title} className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBookWithRedRail;
