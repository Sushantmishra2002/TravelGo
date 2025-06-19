import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Login from './Components/login';
import TourPackage from './Components/TourPackage/TourPackage';
import HotelList from './Components/Hotels/HotelList';
import AdventureActivities from './Components/Slider/Activities';
import PaymentPage from "./Components/Hotels/PaymentPage";
import UserProfile from "./Components/userProfile/UserProfile"; // Import the UserProfile component
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import FlightBookingPage from "./Components/Flight/FlightLight";
import FlightBookingDetails from './Components/Flight/Booking/FlightBookingDetails';
import TrainBooking from "./Components/Train/TrainBooking"; 
import Trainbook from "./Components/Train/Trainbook";
import TourTravel from "./Components/TourTravel/TourTravel"; // Import the TourTravel component


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tours" element={<TourPackage />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/activities" element={<AdventureActivities />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user-profile" element={<UserProfile />} /> 
          <Route path="/flights" element={<FlightBookingPage />} />
          <Route path="/booking" element={<FlightBookingDetails />} />
          <Route path="/train" element={<TrainBooking />} />
          <Route path="/book-train" element={<Trainbook />} />
          <Route path="/tourtravel" element={<TourTravel />} /> {/* Add the TourTravel route */}

          {/* Add more routes as needed */}
          <Route    
          path="/user-profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
