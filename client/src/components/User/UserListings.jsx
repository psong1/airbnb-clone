import React, { useEffect, useState } from "react";
import { getListingsForUser } from "../../api/listings";
import "./UserListings.css";

export default function UserListings({ userId }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListingsForUser(userId).then(setListings);
  }, [userId]);

  return (
    <div className="user-listings-container">
      <h3>Your Listings</h3>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        listings.map((listing) => (
          <div key={listing.id}>
            <strong>{listing.title}</strong> - {listing.city}, {listing.state}
          </div>
        ))
      )}
    </div>
  );
}
