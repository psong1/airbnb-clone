// src/pages/HomePage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/listings?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <main className="homepage-container">
      <h1 className="homepage-title">Find your next stay</h1>
      <p className="homepage-desc">
        Search homes, cabins, beach houses, and more
      </p>

      <form onSubmit={handleSearch} className="homepage-search-form">
        <input
          type="text"
          placeholder="Search destinations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="homepage-search-input"
        />
        <button type="submit" className="homepage-search-btn">
          Search
        </button>
      </form>
      {!user && (
        <div className="homepage-auth-links">
          <a href="/signup">Sign Up</a> | <a href="/login">Log In</a>
        </div>
      )}
    </main>
  );
}
