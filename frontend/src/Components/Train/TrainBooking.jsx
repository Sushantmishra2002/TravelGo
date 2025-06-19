import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/TrainBookingForm.css";
import { FaTrain, FaCalendarAlt, FaSearchLocation, FaRoute, FaTicketAlt, FaChair, FaRupeeSign } from "react-icons/fa";
import Trainimage from "../Train/images/image.png";
import BackgroundImage from "../Train/images/train.png";
import BannerTrain from "./Banner/BannerTrain";
import TrainBanner1 from "./Banner/TrainBanner1";

const CustomTrainBookingForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [freeCancel, setFreeCancel] = useState(false);
  const [trainClass, setTrainClass] = useState("");
  const [trains, setTrains] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!from.trim() || !to.trim() || !date.trim()) {
      alert("Please fill in the From, To, and Date fields.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/trains", {
        params: {
          from,
          to,
          date,
          freeCancellation: freeCancel,
          class: trainClass,
        },
      });
      setTrains(res.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error.message);
      setHasSearched(true);
    }
  };

  return (
    <div className="custom-train">
      <div
        className="custom-booking-container"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          padding: "40px 50px",
          borderRadius: "10px",
          margin: "0 auto",
        }}
      >
        <div className="custom-booking-content">
          <h1 className="custom-booking-title">Train Ticket Booking</h1>
          <div className="custom-partner-info">
            <img src={Trainimage} alt="IRCTC Logo" className="custom-logo" />
            <p>IRCTC Authorised Partner</p>
          </div>

          <div className="custom-form-box">
            <div className="custom-notice">Bookings open for summer holidays</div>

            <div className="custom-form-grid">
              <div className="custom-input-group">
                <FaTrain className="custom-icon" />
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="custom-input-group">
                <FaTrain className="custom-icon" />
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="custom-input-group">
                <FaCalendarAlt className="custom-icon" />
                <input
                  type="date"
                  className="custom-date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="custom-input-group">
                <label>Class:</label>
                <select
                  value={trainClass}
                  onChange={(e) => setTrainClass(e.target.value)}
                  className="custom-class-select"
                >
                  <option value="">Select Class</option>
                  <option value="AC">AC</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="custom-toggle-group">
                <span>Free Cancellation</span>
                <input
                  type="checkbox"
                  checked={freeCancel}
                  onChange={(e) => setFreeCancel(e.target.checked)}
                />
              </div>
            </div>

            <div className="custom-search-button">
              <button
                className="custom-btn-search"
                onClick={handleSearch}
                disabled={!from || !to || !date}
              >
                <FaSearchLocation className="custom-icon" />
                Search Trains
              </button>
            </div>

            {hasSearched && (
              <section className="custom-train-results">
                <div className="train-results">
                  {trains.length === 0 ? (
                    <p>No trains found.</p>
                  ) : (
                    trains.map((train) => (
                      <div key={train._id} className="train-card">
                        <div className="train-card-header">
                          <FaTrain className="train-icon" /> {train.trainName}
                        </div>
                        <p>
                          <FaRoute /> <strong>Route:</strong> {train.from} → {train.to}
                        </p>
                        <p>
                          <FaCalendarAlt /> <strong>Date:</strong> {train.date}
                        </p>
                        <p>
                          <FaTicketAlt /> <strong>Free Cancellation:</strong> {train.freeCancellation ? "Yes" : "No"}
                        </p>
                        <div className="class-box">
                          {train.classes.map((cls, idx) => (
                            <div key={idx} className="class-entry">
                              <p>
                                <FaChair /> <strong>Class:</strong> {cls.classType}
                              </p>
                              <p>
                                <strong>Seats Available:</strong> {cls.seatsAvailable}
                              </p>
                              <p className="price-tag">
                                <FaRupeeSign /> {cls.fare}
                              </p>
                            </div>
                          ))}
                        </div>

                        <button
                          className="btn-book"
                          onClick={() => navigate("/book-train", { state: { train } })}
                        >
                          Book Now
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      <TrainBanner1 />
      <BannerTrain />
    </div>
  );
};

export default CustomTrainBookingForm;
