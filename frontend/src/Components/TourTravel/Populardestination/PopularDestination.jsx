import React, { useState } from "react";
import "./populardestination.css";
import userImage from"../../../assets/populardesination/Asia/Nepal.png"; 
import indaiImage from"../../../assets/populardesination/Asia/indai.jpg"; 
import baliImage from"../../../assets/populardesination/Asia/Bali.jpg";
import DubaiImage from"../../../assets/populardesination/Asia/Dubai.jpg";
import SingarporeImage from"../../../assets/populardesination/Asia/Singapore.jpg";
import SrilankaImage from"../../../assets/populardesination/Asia/sri lanka.jpg";
import Hongkong from"../../../assets/populardesination/Asia/hongkong.png";
import tokyo from"../../../assets/populardesination/Asia/japan.png";
import thailand from"../../../assets/populardesination/Asia/thailand.png";






const regions = ["Asia", "Europe", "North America", "South America", "Oceania", "Africa"];

const destinations = {
  Asia: [
    { name: "Nepal", img: userImage }, // use your uploaded image here
     { name: "Indai", img: indaiImage }, // use your uploaded image here
    { name: "Bali", img: baliImage }, // use your uploaded image here
    { name: "Dubai",img: DubaiImage },
     { name: "Singapore", img: SingarporeImage },
     { name: "Sri Lanka", img: SrilankaImage },
    { name: "Hong Kong", img: Hongkong },
     { name: "Tokyo", img: tokyo },
     { name: "Thai land", img: thailand },
    { name: "Custom", img: userImage }, // use your uploaded image here
  ],
  Europe: [],
  North_America: [],
  South_America: [],
  Oceania: [],
  Africa: [],
};

const PopularDestinations = () => {
  const [selectedRegion, setSelectedRegion] = useState("Asia");

  return (
    <div className="container">
      <h1 className="title">Popular Destinations</h1>
      <div className="tabs">
        {regions.map((region) => (
          <button
            key={region}
            className={selectedRegion === region ? "tab active" : "tab"}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="grid">
        {destinations[selectedRegion]?.map((dest, idx) => (
          <div className="card" key={idx}>
            <img src={dest.img} alt={dest.name} />
            <div className="caption">{dest.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
