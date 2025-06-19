import React from "react";
import { FaPlane, FaBus, FaUtensils, FaHotel, FaUserTie } from "react-icons/fa";
import "./TourPackage.css";

const TourCard = ({ tour }) => {
    return (
        <div className="tour-card">
            <img src={tour.image} alt={tour.name} className="tour-image" />
            <h2 className="tour-name">{tour.name}</h2>
            <p className="tour-duration">{tour.duration}</p>
            <p className="tour-description">{tour.description}</p>
            <div className="tour-facilities">
                {tour.facilities.includes("Flight") && <FaPlane className="tour-icon" />}
                {tour.facilities.includes("Tour Bus") && <FaBus className="tour-icon" />}
                {tour.facilities.includes("Meals") && <FaUtensils className="tour-icon" />}
                {tour.facilities.includes("Accommodation") && <FaHotel className="tour-icon" />}
                {tour.facilities.includes("Guide") && <FaUserTie className="tour-icon" />}
            </div>
            <p className="tour-price">{tour.price}</p>
            <button className="book-now">Book Now</button>
        </div>
    );
};

export default TourCard;
