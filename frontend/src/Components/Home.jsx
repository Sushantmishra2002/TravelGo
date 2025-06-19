import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPlane,
  FaUsers,
} from "react-icons/fa";
import "./css/Home.css";
import videoFile from "./Videos/video.mp4";
import BannerFlight from "./Slider/BannerFlight";
import  AdeventureHighlight from "./TourActivities/AdventureHighlight";



const Home = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/a1efa18601892e4bf566f4fe/latest/USD"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.result !== "success") {
          throw new Error("Failed to fetch exchange rates");
        }

        const currencies = [
          "NPR",
          "EUR",
          "GBP",
          "INR",
          "AUD",
          "CAD",
          "SGD",
          "JPY",
          "CNY",
          "CHF",
          "AED",
        ];

        const formattedRates = currencies.map((currency) => ({
          code: currency,
          rate: data.conversion_rates[currency]
            ? data.conversion_rates[currency].toFixed(2)
            : "N/A",
        }));

        setExchangeRates(formattedRates);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <>
      <div className="home-container">
        {/* Background Video Section */}
        <div className="video-section">
          <video autoPlay loop muted className="video-bg">
            <source src={videoFile} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="overlay">
            <h1 className="hero-title">Discover The World Around You</h1>

            <div className="middle-content">
              <Link to="/tours" className="hero-link">
                <button className="hero-btn">See All Tours →</button>
              </Link>

              {/* Search Bar */}
              <div className="search-bar">
                <div className="search-option">
                  <FaMapMarkerAlt />
                  <input type="text" placeholder="Where Are You Going?" />
                </div>

                <div className="search-option">
                  <FaCalendarAlt />
                  <input type="date" />
                </div>

                <div className="search-option">
                  <FaPlane />
                  <input type="text" placeholder="Enter Travel Type" />
                </div>

                <div className="search-option">
                  <FaUsers />
                  <input type="number" placeholder="Number of Guests" />
                </div>

                <button className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Section for Best Destinations & Currency Exchange */}
        <section className="info-section">
          {/* Best Destinations Section */}
          <div className="best-destinations">
            <h2>Best Destinations</h2>
            <div className="destinations-grid">
              <div className="destination-card">
                <img src="/images/paris.jpg" alt="Paris" />
                <p>Paris, France</p>
              </div>
              <div className="destination-card">
                <img src="/images/bali.jpg" alt="Bali" />
                <p>Bali, Indonesia</p>
              </div>
              <div className="destination-card">
                <img src="/images/nepal.jpg" alt="Nepal" />
                <p>Nepal</p>
              </div>
              <div className="destination-card">
                <img src="/images/tokyo.jpg" alt="Tokyo" />
                <p>Tokyo, Japan</p>
              </div>
            </div>
          </div>

          {/* Currency Exchange Rate Sidebar */}
          <div className="exchange-rate-sidebar">
            <h2>Currency Exchange Rates (NPR)</h2>
            <div className="exchange-rate-list">
              {loading ? (
                <p>Loading exchange rates...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <ul>
                  {exchangeRates.map((currency, index) => (
                    <li key={index}>
                      1 {currency.code} = {currency.rate} NPR
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Add BannerFlight Below Home Content */}
      <BannerFlight />
      <AdeventureHighlight />

   
    </>
  );
};

export default Home;
