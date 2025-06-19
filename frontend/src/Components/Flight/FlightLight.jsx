import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt, FaUserFriends, FaArrowRight, FaUserGraduate, FaUserShield, FaUserMd, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './FlightBooking.css';

import Banner from "../Flight/Banner/Banner";
import Banner2 from './Banner/Banner2';
import BannerFlight from '../Slider/BannerFlight';

const FlightBookingPage = () => {
  const [tripType, setTripType] = useState('one-way');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    travelClass: 'Economy',
    specialFare: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [featuredFlights, setFeaturedFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedFlights = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/flights');
        setFeaturedFlights(res.data);
      } catch (err) {
        console.error('Error fetching featured flights:', err);
      }
    };
    fetchFeaturedFlights();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'passengers' ? parseInt(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type !== 'round-trip') {
      setFormData((prev) => ({
        ...prev,
        returnDate: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/flights');
      const allFlights = response.data;

      const results = allFlights.filter(flight =>
        flight.from.trim().toLowerCase() === formData.from.trim().toLowerCase() &&
        flight.to.trim().toLowerCase() === formData.to.trim().toLowerCase() &&
        flight.travelClass === formData.travelClass &&
        (!formData.specialFare || flight.specialFare === formData.specialFare)
      );

      setSearchResults(results);
    } catch (err) {
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (flight) => {
    navigate('/booking', {
      state: {
        flight: {
          ...flight,
          passengers: formData.passengers, // Pass the number of passengers from formData
          fromCode: flight.departureAirportCode || '', // Ensure fromCode is passed
          toCode: flight.arrivalAirportCode || '', // Ensure toCode is passed
          departureTime: new Date(flight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Add departureTime
          arrivalTime: new Date(flight.returnDate || flight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Add arrivalTime
          cost: flight.cost * formData.passengers, // Adjust cost for total passengers
        }
      }
    });
  };

  return (
    <div className="flight-page-wrapper">
      <Banner />
      <h1 className="flight-page-heading">Book Flights Easily</h1>

      <section className="flight-page-search-section">
        <form className="flight-page-search-form" onSubmit={handleSubmit}>
          <div className="flight-page-trip-options">
            {['one-way', 'round-trip', 'multi-city'].map((type) => (
              <button
                type="button"
                key={type}
                className={`flight-page-trip-btn ${tripType === type ? 'active' : ''}`}
                onClick={() => handleTripTypeChange(type)}
              >
                {type.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flight-page-booking-input-container">
            <div className="flight-page-booking-input-field">
              <label><FaPlaneDeparture /> From</label>
              <div className="flight-page-booking-input-wrapper">
                <input
                  type="text"
                  name="from"
                  placeholder="Enter departure city"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flight-page-booking-input-field">
              <label><FaPlaneArrival /> To</label>
              <div className="flight-page-booking-input-wrapper">
                <input
                  type="text"
                  name="to"
                  placeholder="Enter destination city"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flight-page-booking-input-field">
              <label><FaCalendarAlt /> Departure</label>
              <div className="flight-page-booking-input-wrapper">
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {tripType === 'round-trip' && (
              <div className="flight-page-booking-input-field">
                <label><FaCalendarAlt /> Return</label>
                <div className="flight-page-booking-input-wrapper">
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="flight-page-booking-input-field">
              <label><FaUserFriends /> Travellers & Class</label>
              <div className="flight-page-booking-input-traveller-class">
                <div className="flight-page-booking-input-wrapper">
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                  >
                    {[...Array(9)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Passenger{ i > 0 && 's' }
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flight-page-booking-input-wrapper">
                  <select
                    name="travelClass"
                    value={formData.travelClass}
                    onChange={handleChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flight-page-special-fares">
            {[
              { name: 'Student', icon: <FaUserGraduate /> },
              { name: 'Senior Citizen', icon: <FaUserTie /> },
              { name: 'Armed Forces', icon: <FaUserShield /> },
              { name: 'Doctors & Nurses', icon: <FaUserMd /> },
            ].map((fare) => (
              <label key={fare.name} className="flight-page-special-fare-option">
                <input
                  type="radio"
                  name="specialFare"
                  value={fare.name}
                  checked={formData.specialFare === fare.name}
                  onChange={handleChange}
                />
                <span className="flight-page-fare-icon">{fare.icon}</span>
                {fare.name}
              </label>
            ))}
            {formData.specialFare && (
              <button
                type="button"
                className="flight-page-clear-fare-btn"
                onClick={() => setFormData(prev => ({ ...prev, specialFare: '' }))}
              >
                Clear Special Fare
              </button>
            )}
          </div>

          <button type="submit" className="flight-page-search-btn">
            Search Flights <FaArrowRight />
          </button>
        </form>

        <div className="flight-page-results-section">
          <h2>Available Flights</h2>
          {loading ? (
            <p className="flight-page-loading">Loading...</p>
          ) : searchResults.length === 0 ? (
            <p className="flight-page-no-results">No flights found.</p>
          ) : (
            <ul className="flight-page-results-list">
              {searchResults.map((flight) => (
                <li key={flight._id} className="flight-page-result-card">
                  <div className="flight-page-airline-info">
                    <div className="flight-page-airline-logo">✈️</div>
                    <div className="flight-page-airline-details">
                      <span className="flight-page-airline-name">{flight.airline}</span>
                      <span className="flight-page-refund-status">{flight.refundStatus}</span>
                      <span className="flight-page-travel-class">{flight.travelClass}</span>
                    </div>
                  </div>
                  <div className="flight-page-schedule">
                    <div className="flight-page-departure">
                      <span className="flight-page-departure-time">{new Date(flight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flight-page-departure-date">{new Date(flight.departureDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="flight-page-departure-airport">{flight.from} {flight.departureAirportCode ? `(${flight.departureAirportCode})` : ''}</span>
                    </div>
                    <div className="flight-page-duration-container">
                      <span className="flight-page-duration">{flight.duration}</span>
                      <div className="flight-page-duration-line"></div>
                      <span className="flight-page-stops">{flight.stops}</span>
                      <span className="flight-page-class-detail">{flight.travelClass}</span>
                    </div>
                    <div className="flight-page-arrival">
                      <span className="flight-page-arrival-time">{new Date(flight.returnDate || flight.departureDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flight-page-arrival-date">{new Date(flight.returnDate || flight.departureDate).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="flight-page-arrival-airport">{flight.to} {flight.arrivalAirportCode ? `(${flight.arrivalAirportCode})` : ''}</span>
                    </div>
                  </div>
                  <div className="flight-page-price-book">
                    <span className="flight-page-price">₹ {(flight.cost * formData.passengers).toFixed(2)}</span>
                    <button
                      className="flight-page-book-now-btn"
                      onClick={() => handleBookNow(flight)}
                    >
                      Book Now
                    </button>
                  </div>
                  <span className="flight-page-details-link">
                    Flight Details <span>▼</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Banner2 />
      <BannerFlight />
    </div>
  );
};

export default FlightBookingPage;