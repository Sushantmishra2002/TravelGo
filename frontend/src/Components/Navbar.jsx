import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import { FaPlaneDeparture, FaUser, FaHotel, FaPlane, FaTrain, FaBus, FaTaxi, FaUserTie, FaSuitcaseRolling, FaShieldAlt } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/"> {/* Added home link here */}
                    <FaPlaneDeparture className="plane-icon" />
                    <span>Travel Go</span>
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/hotels"><FaHotel className="nav-icon" /> Hotels</Link></li>
                <li><Link to="/flights"><FaPlane className="nav-icon" /> Flights</Link></li>
                <li><Link to="/train"><FaTrain className="nav-icon" /> Train</Link></li>
                <li><Link to="/bus"><FaBus className="nav-icon" /> Bus</Link></li>
                <li><Link to="/airport-taxi"><FaTaxi className="nav-icon" /> Airport Taxi</Link></li>
                <li><Link to="/tour-guide"><FaUserTie className="nav-icon" /> Tour Guide</Link></li>
                <li><Link to="/tourtravel"><FaSuitcaseRolling className="nav-icon" /> Tour Packages</Link></li>
                <li><Link to="/tourist-police"><FaShieldAlt className="nav-icon" /> Tourist Police</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            {/* <div className="login-section">
                <FaUser className="login-icon" />
                <span className="login-text"><Link to="/login">Login</Link></span>
            </div> */}
        </nav>
    );
};

export default Navbar;
