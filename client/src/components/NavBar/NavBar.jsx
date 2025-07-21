import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">BnbAir</Link>
      </div>
      <div className="navbar__links">
        <Link to="/listings">Browse Listings</Link>
        {user && (
          <>
            <Link to="/dashboard">My Profile</Link>
            {user.role === "host" && <Link to="/listing/new">New Listing</Link>}
            <button onClick={handleLogout} className="navbar__logout">
              Logout
            </button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
