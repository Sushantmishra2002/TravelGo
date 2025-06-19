// src/UserProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./user.css"; // you can style separately

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile", error);
        navigate("/");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {user.name}!</h1>
      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
      <button onClick={handleLogout} className="btn-logout">Logout</button>
    </div>
  );
};

export default UserProfile;
