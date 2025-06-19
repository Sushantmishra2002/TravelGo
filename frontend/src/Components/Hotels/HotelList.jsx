import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import "./HotelList.css";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [recommendedByCountry, setRecommendedByCountry] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [country, setCountry] = useState("nepal");
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState(""); // New state for phone
  const [bookingEmail, setBookingEmail] = useState(""); // New state for email
  const [bookingCheckIn, setBookingCheckIn] = useState("");
  const [bookingCheckOut, setBookingCheckOut] = useState("");
  const [bookingGuests, setBookingGuests] = useState(1);

  const countries = ["nepal", "india", "sri_lanka"];

  useEffect(() => {
    const fetchAllRecommended = async () => {
      const result = {};
      await Promise.all(
        countries.map(async (cty) => {
          try {
            const res = await axios.get("http://localhost:5000/hotels", {
              params: { country: cty },
            });
            const sorted = res.data.hotels
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 4);
            result[cty] = sorted;
          } catch (err) {
            console.error(`Error fetching ${cty} hotels:`, err);
          }
        })
      );
      setRecommendedByCountry(result);
    };

    fetchAllRecommended();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await axios.get("http://localhost:5000/hotels", {
        params: {
          country,
          city,
          check_in: checkIn,
          check_out: checkOut,
          adults,
          children,
        },
      });

      const searchResults = response.data.hotels || [];
      const recommended = recommendedByCountry[country] || [];

      const combined = [
        ...new Map(
          [...searchResults, ...recommended].map((h) => [h.name, h])
        ).values(),
      ];

      setHotels(combined);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch hotel data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openBooking = (hotel) => {
    setSelectedHotel(hotel);
    setShowBooking(true);
  };

  const openDetails = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetails(true);
  };

  const handleBookingSubmit = async () => {
    if (!bookingName || !bookingPhone || !bookingEmail || !bookingCheckIn || !bookingCheckOut || !bookingGuests) {
      alert("Please fill in all booking fields.");
      return;
    }

    const nights =
      (new Date(bookingCheckOut) - new Date(bookingCheckIn)) / (1000 * 60 * 60 * 24);
    const totalCost = nights * (selectedHotel?.price || 0);

    try {
      await axios.post("http://localhost:5000/bookings", {
        hotelName: selectedHotel.name,
        guestName: bookingName,
        phone: bookingPhone, // Send phone
        email: bookingEmail, // Send email
        checkIn: bookingCheckIn,
        checkOut: bookingCheckOut,
        guests: bookingGuests,
      });

      setShowBooking(false);

      // Navigating to payment page with booking details
      navigate("/payment", {
        state: {
          hotel: selectedHotel,
          bookingName,
          bookingPhone,
          bookingEmail,
          bookingCheckIn,
          bookingCheckOut,
          bookingGuests,
          nights,
          totalCost,
        },
      });

      // Reset form after booking
      setBookingName("");
      setBookingPhone(""); // Reset phone
      setBookingEmail(""); // Reset email
      setBookingCheckIn("");
      setBookingCheckOut("");
      setBookingGuests(1);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="hotel-container">
      <h2>Find Your Perfect Stay</h2>

      <div className="search-form">
        <div className="form-group">
          <label>Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select Country</option>
            {countries.map((cty) => (
              <option key={cty} value={cty}>
                {cty.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Check-in</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Check-out</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Adults</label>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Children</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
          />
        </div>

        <div className="form-group full-width">
          <button onClick={fetchHotels}>🔍 Search Hotels</button>
        </div>
      </div>

      <div className="hotel-list">
        {loading ? (
          <p className="loading">Loading hotels...</p>
        ) : hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div key={index} className="hotel-card">
              <img
                src={hotel.image || "https://via.placeholder.com/260x150"}
                alt={hotel.name}
                className="hotel-image"
              />
              <h3>{hotel.name}</h3>
              <p>📍 {hotel.location}</p>
              <p>Price: <strong>${hotel.price}</strong></p>
              <p>Rating: ⭐ {hotel.rating}</p>
              <div className="hotel-actions">
                <button className="book-btn" onClick={() => openBooking(hotel)}>
                  💳 Book Now
                </button>
                <button className="details-btn" onClick={() => openDetails(hotel)}>
                  ℹ️ Details
                </button>
              </div>
            </div>
          ))
        ) : (
          hasSearched && <p>No hotels found for your criteria.</p>
        )}
      </div>

      <h2>Top Recommended Hotels</h2>
      <div className="recommended-hotels">
        {countries.map((cty) => (
          <div key={cty} className="country-section">
            <h3>{cty.replace("_", " ").toUpperCase()}</h3>
            <div className="hotel-list">
              {recommendedByCountry[cty]?.length > 0 ? (
                recommendedByCountry[cty].map((hotel, index) => (
                  <div key={index} className="hotel-card">
                    <img
                      src={hotel.image || "https://via.placeholder.com/260x150"}
                      alt={hotel.name}
                      className="hotel-image"
                    />
                    <h4>{hotel.name}</h4>
                    <p>📍 {hotel.location}</p>
                    <p>Price: <strong>${hotel.price}</strong></p>
                    <p>Rating: ⭐ {hotel.rating}</p>
                    <div className="hotel-actions">
                      <button className="book-btn" onClick={() => openBooking(hotel)}>
                        💳 Book
                      </button>
                      <button className="details-btn" onClick={() => openDetails(hotel)}>
                        ℹ️ Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showBooking && selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          bookingName={bookingName}
          bookingPhone={bookingPhone}
          bookingEmail={bookingEmail}
          bookingCheckIn={bookingCheckIn}
          bookingCheckOut={bookingCheckOut}
          bookingGuests={bookingGuests}
          onBookingNameChange={(e) => setBookingName(e.target.value)}
          onPhoneChange={(e) => setBookingPhone(e.target.value)} // Added handler for phone
          onEmailChange={(e) => setBookingEmail(e.target.value)} // Added handler for email
          onCheckInChange={(e) => setBookingCheckIn(e.target.value)}
          onCheckOutChange={(e) => setBookingCheckOut(e.target.value)}
          onGuestsChange={(e) => setBookingGuests(e.target.value)}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBooking(false)}
        />
      )}

      {showDetails && selectedHotel && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedHotel.name}</h3>
            <img
              src={selectedHotel.image || "https://via.placeholder.com/300x180"}
              alt={selectedHotel.name}
              className="modal-image"
            />
            <p><strong>Location:</strong> {selectedHotel.location}</p>
            <p><strong>Price:</strong> ${selectedHotel.price}</p>
            <p><strong>Rating:</strong> ⭐ {selectedHotel.rating}</p>
            <p><strong>Description:</strong> {selectedHotel.description || "No additional details provided."}</p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;
