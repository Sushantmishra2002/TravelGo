import React from "react";
import "./TourPackageCard.css";

import card1 from '../Offertravel/image/card1.jpg';
import card2 from './image/card2.jpg';
import card3 from './image/card3.png';
import card4 from './image/card4.jpg';

// Icon mapping
const getIcon = (highlight) => {
  const lower = highlight.toLowerCase();
  if (lower.includes("resort") || lower.includes("stay")) return "🏨";
  if (lower.includes("beach")) return "🏖️";
  if (lower.includes("water")) return "🚤";
  if (lower.includes("nightlife")) return "🌃";
  if (lower.includes("snow")) return "❄️";
  if (lower.includes("houseboat")) return "🚢";
  if (lower.includes("ride")) return "🛶";
  if (lower.includes("palace")) return "🏯";
  if (lower.includes("desert")) return "🏜️";
  if (lower.includes("cultural")) return "🎭";
  if (lower.includes("snorkeling")) return "🤿";
  if (lower.includes("coral")) return "🐠";
  if (lower.includes("scuba")) return "🧜‍♂️";
  return "✔️";
};

const tourPackages = [
  {
    name: "European Trip",
    rating: 8.9,
    reviews: 60,
    duration: "3 Nights / 4 Days",
    price: 7989,
    image: card1,
    highlights: ["Beachside Resort", "Water Sports", "Nightlife"],
  },
  {
    name: "South Korea Tour",
    rating: 9.2,
    reviews: 85,
    location: "Seoul, Busan & Jeju Island",
    duration: "5 Nights / 6 Days",
    price: 14500,
    image: card2,
    highlights: ["Cultural Shows", "K-pop Experience", "City Nightlife"],
  },
  {
    name: "Nepal Tour Package",
    rating: 8.7,
    reviews: 45,
    location: "Kathmandu & Pokhara",
    duration: "4 Nights / 5 Days",
    price: 11200,
    image: card4,
    highlights: ["Mountain Views", "Cultural Temples", "Scenic Lakes"],
  },
  {
    name: "Indian Andaman Tour",
    rating: 9.4,
    reviews: 72,
    location: "Port Blair & Havelock",
    duration: "5 Nights / 6 Days",
    price: 17200,
    image: card3,
    highlights: ["Snorkeling", "Coral Reefs", "Scuba Diving"],
  },
];

const TourCard = ({ tour }) => (
  <div className="tour-card">
    <img src={tour.image} alt={tour.name} className="tour-image" />
    <div className="tour-content">
      <div className="tour-rating">
        <span className="rating-badge">{tour.rating}/10</span>
        <span className="reviews">{tour.reviews} reviews</span>
      </div>
      <h3 className="tour-title">{tour.name}</h3>
      <p className="tour-location">
        {tour.location || "Location Coming Soon"} | {tour.duration}
      </p>
      <ul className="tour-highlights">
        {tour.highlights.map((item, index) => (
          <li key={index}>
            {getIcon(item)} {item}
          </li>
        ))}
      </ul>
      <p className="tour-price">From ₹ {tour.price.toLocaleString()}</p>
    </div>
  </div>
);

const ExclusiveOfferPackageSection = () => (
  <div className="exclusive-offer-packages">
    <h2 className="exclusive-offer-title">🌟 Special Exclusive Offer Packages 🌟</h2>
    <div className="tour-list">
      {tourPackages.map((tour, idx) => (
        <TourCard key={idx} tour={tour} />
      ))}
    </div>
  </div>
);

export default ExclusiveOfferPackageSection;
