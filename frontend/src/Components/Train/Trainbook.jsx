import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUser, FaPhone, FaCreditCard, FaEnvelope, FaTrain, FaLock, FaArrowLeft, FaCheckCircle
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './css/TrainBookingDetails.css';

const TrainBookingDetails = () => {
  const { state } = useLocation();
  const { train } = state || {};

  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', gender: '', dateOfBirth: '' }]);
  const [contact, setContact] = useState({ email: '', phone: '', countryCode: '+91' });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [netBankingBank, setNetBankingBank] = useState('');
  const [walletDetails, setWalletDetails] = useState({ provider: '', phone: '' });

  const [bookingStatus, setBookingStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for pop-up visibility

  useEffect(() => {
    if (train && train.classes && passengers.length > 0) {
      setTotalCost(train.classes[0].fare * passengers.length);
    }
  }, [train, passengers.length]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { firstName: '', lastName: '', gender: '', dateOfBirth: '' }]);
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updated = passengers.filter((_, i) => i !== index);
      setPassengers(updated);
    }
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setBookingStatus('');

    const bookingData = {
      trainId: train._id,
      passengers,
      contact,
      paymentMethod,
      totalCost,
      paymentDetails: {},
    };

    if (paymentMethod === 'credit-card') {
      bookingData.paymentDetails = cardDetails;
    } else if (paymentMethod === 'upi') {
      bookingData.paymentDetails = { upiId };
    } else if (paymentMethod === 'net-banking') {
      bookingData.paymentDetails = { bank: netBankingBank };
    } else if (paymentMethod === 'wallet') {
      bookingData.paymentDetails = walletDetails;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/train-bookings', bookingData);

      // Simulate 5-second payment processing delay
      setTimeout(() => {
        setLoading(false);
        setBookingStatus(`Booking successful! Confirmation #: ${response.data.confirmationNumber}`);
        setSuccess(true);
        setShowSuccessPopup(true); // Show success pop-up after payment success
      }, 5000);
    } catch (err) {
      setBookingStatus('Error booking train. Please try again.');
      setSuccess(false);
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  if (!train) return <p>No train selected for booking.</p>;

  return (
    <div className="booking-container">
      <h1 className="booking-heading">Complete Your Train Booking</h1>

      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <p>Processing payment...</p>
        </div>
      )}

      {/* Payment Success Pop-up */}
      {showSuccessPopup && (
        <div className="payment-successful-popup show">
          <FaCheckCircle size={32} color="#10b981" />
          <p>{bookingStatus}</p>
          <button
            className="close-btn"
            onClick={() => setShowSuccessPopup(false)} // Close the popup
          >
            Close
          </button>
        </div>
      )}

      <div className="booking-summary">
        <h2><FaTrain /> Train Summary</h2>
        <p><strong>Train Name:</strong> {train.trainName}</p>
        <p><strong>From:</strong> {train.from}</p>
        <p><strong>To:</strong> {train.to}</p>
        <p><strong>Departure:</strong> {new Date(train.date).toLocaleDateString()}</p>
        <p><strong>Class:</strong> {train.classes[0].classType}</p>
        <p><strong>Total Cost:</strong> INR {totalCost}</p>
      </div>

      <button onClick={goBack} className="back-btn"><FaArrowLeft /> Go Back</button>

      <form className="booking-form" onSubmit={handleSubmit}>
        <h2>Passenger Information</h2>
        {passengers.map((p, i) => (
          <div key={i} className="passenger-group">
            <label><FaUser /> Passenger {i + 1}</label>
            <input type="text" placeholder="First Name" value={p.firstName} onChange={(e) => handlePassengerChange(i, 'firstName', e.target.value)} required />
            <input type="text" placeholder="Last Name" value={p.lastName} onChange={(e) => handlePassengerChange(i, 'lastName', e.target.value)} required />
            <select value={p.gender} onChange={(e) => handlePassengerChange(i, 'gender', e.target.value)} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="date" value={p.dateOfBirth} onChange={(e) => handlePassengerChange(i, 'dateOfBirth', e.target.value)} required />
            {passengers.length > 1 && <button type="button" onClick={() => removePassenger(i)} className="remove-btn">Remove</button>}
          </div>
        ))}
        <button type="button" onClick={addPassenger} className="add-btn">Add Passenger</button>

        <h2>Contact Information</h2>
        <div className="contact-group">
          <label><FaEnvelope /> Email</label>
          <input type="email" value={contact.email} onChange={(e) => handleContactChange('email', e.target.value)} required />
          <label><FaPhone /> Phone</label>
          <div className="phone-input">
            <select value={contact.countryCode} onChange={(e) => handleContactChange('countryCode', e.target.value)}>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+86">+86 (China)</option>
            </select>
            <input type="tel" value={contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} required />
          </div>
        </div>

        <h2>Payment Details</h2>
        <div className="payment-group">
          {['credit-card', 'net-banking', 'upi', 'wallet', 'cod'].map(method => (
            <label key={method}>
              <input type="radio" value={method} checked={paymentMethod === method} onChange={handlePaymentChange} /> {method.replace('-', ' ').toUpperCase()}
            </label>
          ))}

          {paymentMethod === 'credit-card' && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => handleCardChange('cardNumber', e.target.value)} required />
              <input type="text" placeholder="Expiry (MM/YY)" value={cardDetails.expiry} onChange={(e) => handleCardChange('expiry', e.target.value)} required />
              <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => handleCardChange('cvv', e.target.value)} required />
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="card-details">
              <input type="text" placeholder="UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            </div>
          )}

          {paymentMethod === 'net-banking' && (
            <div className="card-details">
              <select value={netBankingBank} onChange={(e) => setNetBankingBank(e.target.value)} required>
                <option value="">Select Bank</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="SBI">SBI</option>
                <option value="AXIS">Axis Bank</option>
              </select>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="card-details">
              <select value={walletDetails.provider} onChange={(e) => setWalletDetails({ ...walletDetails, provider: e.target.value })} required>
                <option value="">Select Wallet</option>
                <option>Paytm</option>
                <option>PhonePe</option>
                <option>GooglePay</option>
                <option>Mobikwik</option>
              </select>
              <input type="tel" placeholder="Mobile Number" value={walletDetails.phone} onChange={(e) => setWalletDetails({ ...walletDetails, phone: e.target.value })} required />
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="card-details">
              <p><strong>Note:</strong> Pay at the station counter or upon check-in.</p>
            </div>
          )}
        </div>

        <button type="submit" className="book-submit-btn"><FaLock /> Confirm Booking</button>
        {bookingStatus && !bookingStatus.includes("successful") && <p className="booking-status error">{bookingStatus}</p>}
      </form>
    </div>
  );
};

export default TrainBookingDetails;
