import React from "react";
import "./Activities.css";

const activities = [
  {
    title: "Trekking",
    image: "/images/trekking.jpg",
    description:
      "Explore the breathtaking trails of the Himalayas, from Everest Base Camp to Annapurna Circuit.",
  },
  {
    title: "Mountain Climbing",
    image: "/images/mountain-climbing.jpg",
    description:
      "Challenge yourself by climbing the world's highest peaks, including Mt. Everest and Manaslu.",
  },
  {
    title: "Mountaineering",
    image: "/images/mountaineering.jpg",
    description:
      "Experience technical ascents and adventurous climbs in Nepal’s rugged mountain ranges.",
  },
  {
    title: "Rafting",
    image: "/images/rafting.jpg",
    description:
      "Enjoy thrilling white-water rafting adventures in Nepal’s wild rivers like Trishuli and Bhote Koshi.",
  },
  {
    title: "Bungee Jumping",
    image: "/images/bungee.jpg",
    description:
      "Jump from Nepal’s famous suspension bridges and experience an adrenaline rush like never before.",
  },
  {
    title: "Paragliding",
    image: "/images/paragliding.jpg",
    description:
      "Soar above Pokhara’s lakes and valleys with stunning views of the Annapurna mountains.",
  },
  {
    title: "Helicopter Tour",
    image: "/images/helicopter-tour.jpg",
    description:
      "Take a scenic helicopter flight over the Himalayas for a once-in-a-lifetime experience.",
  },
  {
    title: "National Park Visits",
    image: "/images/national-park.jpg",
    description:
      "Explore Nepal’s rich wildlife, including rhinos and tigers, in Chitwan and Bardia National Parks.",
  },
];

const AdventureActivities = () => {
  return (
    <div className="activities-container">
      <h1 className="activities-title">Adventure Activities in Nepal</h1>
      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <img src={activity.image} alt={activity.title} className="activity-image" />
            <h2 className="activity-title">{activity.title}</h2>
            <p className="activity-description">{activity.description}</p>
            <button className="read-more-btn">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdventureActivities;
