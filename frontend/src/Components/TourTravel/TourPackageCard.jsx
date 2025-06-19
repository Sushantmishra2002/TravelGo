import React from 'react';
import './tour.css';

const TourPackageCard = ({ tour }) => {
  return (
    <div className="tour-card">
      <h3>{tour.country}</h3>
      <p>{tour.description}</p>
      <p><strong>Budget:</strong> ₹{tour.budget}</p>
      <p><strong>Persons:</strong> {tour.numberOfPersons}</p>
      <p><strong>Meal:</strong> {tour.mealType}</p>
      <p><strong>Date:</strong> {new Date(tour.startDate).toLocaleDateString()}</p>

      {/* Facilities Section */}
      {tour.facilities && tour.facilities.length > 0 && (
        <div>
          <strong>Facilities:</strong>
          <ul>
            {tour.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TourPackageCard;
