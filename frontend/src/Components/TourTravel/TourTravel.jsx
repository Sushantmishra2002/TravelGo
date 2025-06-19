import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import TravelBanner from './VideoBanner/TravelBanner';
import './tour.css';
import { FaSearch } from 'react-icons/fa';
import PopularDestination from './Populardestination/PopularDestination';
import MaldivesBanner from './maldivesBanner/MaldivesBanner';
import TourPackageCardList from './Offertravel/TourPackageCardList';
import TourPackageCard from './TourPackageCard';

const TourTravel = () => {
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [budget, setBudget] = useState('');
  const [persons, setPersons] = useState('');
  const [month, setMonth] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Debounced search suggestion
  const fetchCountrySuggestions = useCallback(
    debounce(async (value) => {
      if (value.trim() === '') return;

      try {
        const res = await axios.get('http://localhost:5000/api/tour-packages');
        const allCountries = res.data.map(tour => tour.country);
        const filtered = [...new Set(allCountries.filter(country =>
          country.toLowerCase().includes(value.toLowerCase())
        ))];
        setSuggestions(filtered);
      } catch (error) {
        console.error('Suggestion fetch error:', error);
      }
    }, 300),
    []
  );

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    fetchCountrySuggestions(value);
  };

  const handleSuggestionClick = (value) => {
    setDestination(value);
    setSuggestions([]);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);

    try {
      const res = await axios.get('http://localhost:5000/api/tour-packages', {
        params: {
          ...(destination && { country: destination }),
          ...(budget && { budget }),
          ...(persons && { numberOfPersons: persons }),
          ...(month && { month }),
        },
      });

      setSearchResults(res.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      <TravelBanner />

      <div className="tt-search-container">
        <h2 className="tt-heading">Search for Tour Packages</h2>
        <form onSubmit={handleSearchSubmit} className="tt-form">
          <div className="tt-input-group">
            <label htmlFor="destination" className="tt-label">Destination / Country</label>
            <input
              id="destination"
              type="text"
              placeholder="Enter destination or country"
              value={destination}
              onChange={handleDestinationChange}
              className="tt-input-field"
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="suggestion-list">
                {suggestions.map((sug, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(sug)}>{sug}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="tt-input-group">
            <label htmlFor="budget" className="tt-label">Budget (in INR)</label>
            <input
              id="budget"
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="tt-input-field"
            />
          </div>

          <div className="tt-input-group">
            <label htmlFor="persons" className="tt-label">Number of Persons</label>
            <input
              id="persons"
              type="number"
              placeholder="Enter number of persons"
              value={persons}
              onChange={(e) => setPersons(e.target.value)}
              className="tt-input-field"
            />
          </div>

          <div className="tt-input-group">
            <label htmlFor="month" className="tt-label">Preferred Month</label>
            <input
              id="month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="tt-input-field"
            />
          </div>

          <button type="submit" className="tt-button">
            Search <FaSearch className='search-icon' />
          </button>
        </form>
      </div>

      {searching && <p className="tt-loading">Searching...</p>}

      {searchResults.length > 0 && (
        <div className="tt-results">
          <h3 className="tt-heading">Search Results</h3>
          <div className="tt-card-list">
            {searchResults.map((tour) => (
              <TourPackageCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      )}

      {!searching && searchResults.length === 0 && (
        <>
          <PopularDestination />
          <TourPackageCardList />
          <MaldivesBanner />
        </>
      )}
    </div>
  );
};

export default TourTravel;
