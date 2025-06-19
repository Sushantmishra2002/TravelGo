import React from "react";
import TourCard from "./TourCard";
import "./TourPackage.css";

const tourPackagesByCountry = {
    "Nepal": [
        {
            id: 1,
            name: "Mount Everest Base Camp",
            image: "/images/everest.jpg",
            duration: "12 Days",
            price: "$2500",
            facilities: ["Tour Bus", "Guide", "Accommodation", "Meals"],
            description: "A thrilling journey to the world's highest peak with breathtaking views and adventurous trails.",
        },
        {
            id: 2,
            name: "Pokhara & Phewa Lake",
            image: "/images/pokhara.jpg",
            duration: "5 Days",
            price: "$900",
            facilities: ["Tour Bus", "Guide", "Luxury Hotels", "Breakfast"],
            description: "Experience the serene beauty of Pokhara, including Phewa Lake and the Annapurna range.",
        },
        {
            id: 3,
            name: "Chitwan Jungle Safari",
            image: "/images/chitwan.jpg",
            duration: "4 Days",
            price: "$800",
            facilities: ["Tour Bus", "Guide", "Resorts", "Jungle Safari"],
            description: "Discover Nepal’s wildlife with an exciting jungle safari in Chitwan National Park.",
        },
    ],
    "France": [
        {
            id: 4,
            name: "Paris & Eiffel Tower",
            image: "/images/paris.jpg",
            duration: "6 Days",
            price: "$1800",
            facilities: ["Flight", "Guide", "Luxury Hotel", "Fine Dining"],
            description: "Enjoy the romance of Paris, visit the Eiffel Tower, and explore world-class museums and cafes.",
        },
        {
            id: 5,
            name: "Nice & French Riviera",
            image: "/images/nice.jpg",
            duration: "5 Days",
            price: "$1700",
            facilities: ["Flight", "Guide", "Seaside Resorts", "Luxury Dining"],
            description: "Relax on the stunning beaches of the French Riviera with a taste of luxury.",
        },
        {
            id: 6,
            name: "Loire Valley Castles",
            image: "/images/loire.jpg",
            duration: "4 Days",
            price: "$1400",
            facilities: ["Tour Bus", "Guide", "Castle Stays", "Wine Tasting"],
            description: "Explore the magnificent castles of the Loire Valley and indulge in French wine tasting.",
        },
    ],
    "Japan": [
        {
            id: 7,
            name: "Tokyo & Mount Fuji",
            image: "/images/tokyo.jpg",
            duration: "7 Days",
            price: "$2200",
            facilities: ["Flight", "Guide", "Hotels", "Japanese Cuisine"],
            description: "Discover Tokyo's vibrant culture and visit the iconic Mount Fuji for a breathtaking experience.",
        },
        {
            id: 8,
            name: "Kyoto & Traditional Temples",
            image: "/images/kyoto.jpg",
            duration: "5 Days",
            price: "$2000",
            facilities: ["Flight", "Guide", "Ryokan Stays", "Cultural Tours"],
            description: "Immerse yourself in Japan’s cultural heritage with visits to Kyoto’s stunning temples and shrines.",
        },
        {
            id: 9,
            name: "Osaka & Universal Studios",
            image: "/images/osaka.jpg",
            duration: "6 Days",
            price: "$2100",
            facilities: ["Flight", "Guide", "Theme Park Tickets", "Luxury Hotel"],
            description: "Enjoy Osaka’s vibrant street food scene and visit Universal Studios Japan for an unforgettable experience.",
        },
    ],
    "USA": [
        {
            id: 10,
            name: "New York City",
            image: "/images/nyc.jpg",
            duration: "5 Days",
            price: "$2000",
            facilities: ["Flight", "Guide", "City Tours", "Luxury Hotels"],
            description: "Experience the fast-paced life of New York City with Times Square, Broadway, and Central Park.",
        },
        {
            id: 11,
            name: "Grand Canyon & Las Vegas",
            image: "/images/grandcanyon.jpg",
            duration: "6 Days",
            price: "$2200",
            facilities: ["Flight", "Guide", "Resorts", "Nightlife Tours"],
            description: "Witness the breathtaking Grand Canyon and enjoy the nightlife of Las Vegas.",
        },
        {
            id: 12,
            name: "San Francisco & Golden Gate",
            image: "/images/sanfrancisco.jpg",
            duration: "5 Days",
            price: "$1900",
            facilities: ["Flight", "Guide", "Hotels", "Bay Cruises"],
            description: "Discover the charm of San Francisco with its iconic Golden Gate Bridge and Alcatraz Island.",
        },
    ],
    "Italy": [
        {
            id: 13,
            name: "Rome & Vatican City",
            image: "/images/rome.jpg",
            duration: "6 Days",
            price: "$1900",
            facilities: ["Flight", "Guide", "Resorts", "Authentic Italian Food"],
            description: "Explore ancient Rome, the Colosseum, and the Vatican City with stunning historical landmarks.",
        },
        {
            id: 14,
            name: "Venice & Gondola Rides",
            image: "/images/venice.jpg",
            duration: "5 Days",
            price: "$1800",
            facilities: ["Flight", "Guide", "Canal Cruises", "Luxury Hotels"],
            description: "Enjoy the romantic gondola rides and picturesque canals of Venice.",
        },
        {
            id: 15,
            name: "Amalfi Coast & Capri",
            image: "/images/amalfi.jpg",
            duration: "6 Days",
            price: "$2000",
            facilities: ["Flight", "Guide", "Seaside Resorts", "Fine Dining"],
            description: "Relax on the stunning Amalfi Coast and visit the charming island of Capri.",
        },
    ],
    "Thailand": [
        {
            id: 16,
            name: "Bangkok & Phuket",
            image: "/images/bangkok.jpg",
            duration: "6 Days",
            price: "$1500",
            facilities: ["Flight", "Guide", "Beach Resorts", "Thai Cuisine"],
            description: "Enjoy the nightlife of Bangkok and relax on the pristine beaches of Phuket with tropical vibes.",
        },
        {
            id: 17,
            name: "Chiang Mai & Elephant Sanctuary",
            image: "/images/chiangmai.jpg",
            duration: "5 Days",
            price: "$1600",
            facilities: ["Flight", "Guide", "Eco-Lodges", "Cultural Tours"],
            description: "Discover the beauty of Chiang Mai and visit ethical elephant sanctuaries.",
        },
        {
            id: 18,
            name: "Krabi & Phi Phi Islands",
            image: "/images/krabi.jpg",
            duration: "6 Days",
            price: "$1700",
            facilities: ["Flight", "Guide", "Luxury Beach Resorts", "Boat Tours"],
            description: "Explore the stunning limestone cliffs and crystal-clear waters of Krabi and the Phi Phi Islands.",
        },
    ],
};

const TourPackage = () => {
    return (
        <div className="tour-container">
            <h1 className="tour-title">Explore Our Exclusive Travel Packages</h1>
            {Object.keys(tourPackagesByCountry).map((country) => (
                <div key={country} className="country-section">
                    <h2 className="country-title">{country}</h2>
                    <div className="tour-grid">
                        {tourPackagesByCountry[country].map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TourPackage;
