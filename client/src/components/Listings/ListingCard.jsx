import React from "react";
import { Link } from "react-router-dom";
import "./ListingCard.css";

export default function ListingCard({ listing }) {
  const BACKEND_URL = "http://localhost:3001";
  const imageUrl =
    listing.images && listing.images.length > 0
      ? `${BACKEND_URL}/${listing.images[0].url}`
      : "https://placehold.co/320x180?text=No+Image";
  return (
    <div className="listing-card">
      <img
        src={imageUrl}
        alt={listing.title}
        className="listing-card-image"
        style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px", marginBottom: "0.7rem" }}
      />
      <h3>{listing.title}</h3>
      <p>
        {listing.city}, {listing.state}
      </p>
      <p>${listing.price_per_night} / night</p>
      <Link to={`/listing/${listing.id}`}>View Listing</Link>
    </div>
  );
}
