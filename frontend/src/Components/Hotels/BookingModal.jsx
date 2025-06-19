import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingModal.css";

const BookingModal = ({
  hotel = {},
  bookingName = "",
  bookingPhone = "",
  bookingEmail = "",
  bookingCheckIn,
  bookingCheckOut,
  bookingGuests,
  onBookingNameChange,
  onPhoneChange,
  onEmailChange,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  onClose,
}) => {
  const navigate = useNavigate();
  const pricePerNight = hotel?.price || 0;

  const calcNights = () => {
    if (!bookingCheckIn || !bookingCheckOut) return 0;
    const checkInDate = new Date(bookingCheckIn);
    const checkOutDate = new Date(bookingCheckOut);
    const diffTime = checkOutDate - checkInDate;
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  const nights = calcNights();
  const totalCost = nights * pricePerNight;

  const handleSubmit = () => {
    if (
      !bookingName.trim() ||
      !bookingPhone.trim() ||
      !bookingEmail.trim() ||
      !bookingCheckIn ||
      !bookingCheckOut ||
      !bookingGuests ||
      calcNights() <= 0
    ) {
      alert("⚠️ Please fill in all fields correctly before confirming your booking.");
      return;
    }

    // ✅ Navigate to payment page with full booking data
    navigate("/payment", {
      state: {
        hotel,
        bookingName,
        bookingPhone,
        bookingEmail,
        bookingCheckIn,
        bookingCheckOut,
        bookingGuests,
        totalCost,
      },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <h2 className="modal-title">🛎️ Book Your Stay at {hotel?.name}</h2>

        <div className="modal-info">
          <p><strong>📍 Location:</strong> {hotel?.location}</p>
          <p><strong>💲 Price/Night:</strong> ${pricePerNight}</p>
          <p><strong>⭐ Rating:</strong> {hotel?.rating}</p>
        </div>

        <div className="form-group">
          <label>👤 Your Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={bookingName}
            onChange={onBookingNameChange}
          />
        </div>

        <div className="form-group">
          <label>📞 Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={bookingPhone}
            onChange={onPhoneChange}
          />
        </div>

        <div className="form-group">
          <label>📧 Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={bookingEmail}
            onChange={onEmailChange}
          />
        </div>

        <div className="form-group">
          <label>📅 Check-in Date</label>
          <input type="date" value={bookingCheckIn} onChange={onCheckInChange} />
        </div>

        <div className="form-group">
          <label>📅 Check-out Date</label>
          <input type="date" value={bookingCheckOut} onChange={onCheckOutChange} />
        </div>

        <div className="form-group">
          <label>👥 Number of Guests</label>
          <input
            type="number"
            min="1"
            value={bookingGuests}
            onChange={onGuestsChange}
          />
        </div>

        <div className="booking-summary">
          <h4>🧾 Booking Summary</h4>
          <p><strong>Nights:</strong> {nights}</p>
          <p><strong>Total Price:</strong> ${totalCost}</p>
          <small>💡 You'll be redirected to the payment page after confirmation.</small>
        </div>

        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleSubmit}>
            ✅ Confirm Booking
          </button>
          <button className="cancel-btn" onClick={onClose}>❌ Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
