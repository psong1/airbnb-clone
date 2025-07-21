import React from "react";
import { Link } from "react-router-dom";
import "./ListingCard.css";

export default function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <h3>{listing.title}</h3>
      <p>
        {listing.city}, {listing.state}
      </p>
      <p>${listing.price_per_night} / night</p>
      <Link to={`/listing/${listing.id}`}>View Listing</Link>
    </div>
  );
}
