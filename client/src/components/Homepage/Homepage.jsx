// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const backgroundImages = [
    "/images/arizona.jpg",
    "/images/austin.jpg",
    "/images/colorado.jpeg",
    "/images/miami.webp",
    "/images/ny.jpg",
    "/images/orlando.webp",
    "/images/sanfran.jpg"
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set the background image on the body
    document.body.style.backgroundImage = `url(${backgroundImages[bgIndex]})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.transition = "background-image 1s ease-in-out";
    // Cleanup: remove background when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundSize = "";
      document.body.style.transition = "";
    };
  }, [bgIndex]);

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
