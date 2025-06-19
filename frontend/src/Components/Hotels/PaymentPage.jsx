import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // for toast styles
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  if (!bookingData) {
    return <p>No booking data available. Please go back and book again.</p>;
  }

  const {
    hotel,
    bookingName,
    bookingPhone,
    bookingEmail,
    bookingCheckIn,
    bookingCheckOut,
    bookingGuests,
    totalCost,
  } = bookingData;

  // Helper function for showing toast messages
  const showToast = (message, type = "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      showToast("Please select a payment method.");
      return;
    }

    // Validation for credit card, UPI, and NetBanking based on the selected payment method
    if (
      (paymentMethod === "Visa" || paymentMethod === "MasterCard") &&
      (!cardNumber || !expiryDate || !cvv)
    ) {
      showToast("Please fill in all card details.");
      return;
    }

    if (
      (paymentMethod === "PhonePe" || paymentMethod === "GPay" || paymentMethod === "UPI") &&
      !upiId
    ) {
      showToast("Please enter your UPI ID.");
      return;
    }

    if (paymentMethod === "NetBanking" && (!bankName || !accountNumber)) {
      showToast("Please fill in bank details.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/hotelbookings", {
        hotelName: hotel?.name,
        hotelLocation: hotel?.location,
        hotelPrice: hotel?.price,
        hotelRating: hotel?.rating,
        bookingName,
        bookingCheckIn,
        bookingCheckOut,
        bookingGuests,
        totalCost,
        email: bookingEmail,
        phone: bookingPhone,
        paymentMethod,
        paymentDetails: {
          cardNumber,
          expiryDate,
          cvv,
          upiId,
          bankName,
          accountNumber,
        },
      });

      if (response.status === 200 || response.status === 201) {
        // Show success pop-up message
        showToast("🎉 Payment successful! Redirecting to Home...", "success");

        // Redirect after a short delay to give user time to see the success message
        setTimeout(() => {
          navigate("/");
        }, 3000);  // 3-second delay for success toast
      } else {
        showToast("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      showToast("❌ Failed to save booking. Please try again.");
    }
  };

  return (
    <div className="payment-page">
      <h2>💳 Payment for Your Stay</h2>

      <div className="payment-summary">
        <h3>Booking Summary</h3>
        <p><strong>Hotel Name:</strong> {hotel?.name}</p>
        <p><strong>Location:</strong> {hotel?.location}</p>
        <p><strong>Rating:</strong> {hotel?.rating} ⭐</p>
        <p><strong>Guest Name:</strong> {bookingName}</p>
        <p><strong>Phone:</strong> {bookingPhone}</p>
        <p><strong>Email:</strong> {bookingEmail}</p>
        <p><strong>Check-in:</strong> {bookingCheckIn}</p>
        <p><strong>Check-out:</strong> {bookingCheckOut}</p>
        <p><strong>Guests:</strong> {bookingGuests}</p>
        <p><strong>Total Cost:</strong> ${totalCost}</p>
      </div>

      <div className="payment-methods">
        <h4>🧾 Choose Payment Method</h4>
        <div className="method-options">
          {["Visa", "MasterCard", "PhonePe", "GPay", "UPI", "NetBanking"].map((method) => (
            <button
              key={method}
              className={`method-btn ${paymentMethod === method ? "selected" : ""}`}
              onClick={() => setPaymentMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="payment-form">
        {(paymentMethod === "Visa" || paymentMethod === "MasterCard") && (
          <>
            <label>Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <label>Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />

            <label>CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </>
        )}

        {(paymentMethod === "PhonePe" || paymentMethod === "GPay" || paymentMethod === "UPI") && (
          <>
            <label>UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </>
        )}

        {paymentMethod === "NetBanking" && (
          <>
            <label>Bank Name</label>
            <input
              type="text"
              placeholder="Your Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />

            <label>Account Number</label>
            <input
              type="text"
              placeholder="1234567890"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </>
        )}

        <button className="pay-btn" onClick={handlePayment}>💰 Pay Now</button>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
