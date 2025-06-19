// src/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setAddress("");
    setPassword("");
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const userData = { name, email, phone, age, address, password };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData);
      console.log(response.data.message);

      localStorage.setItem("token", response.data.token);

      resetForm();
      navigate("/user-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", userData);
      console.log(response.data.message);

      localStorage.setItem("token", response.data.token);

      resetForm();
      navigate("/user-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {error && <p className="error-message">{error}</p>}

        {isSignup ? (
          <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn">Sign Up</button>
            </form>
            <p>Already have an account?{" "}
              <span onClick={() => { setIsSignup(false); setError(""); }} className="toggle-text">
                Login
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h1>Welcome Back</h1>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn">Login</button>
            </form>
            <p>Don't have an account?{" "}
              <span onClick={() => { setIsSignup(true); setError(""); }} className="toggle-text">
                Sign Up
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
