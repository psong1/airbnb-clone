// src/components/Listings/ListingList.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllListings } from "../../api/listings";
import ListingCard from "./ListingCard";
import "./ListingList.css";

export default function ListingList() {
  const [listings, setListings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search")?.toLowerCase() || "";

  useEffect(() => {
    getAllListings()
      .then((all) => {
        setListings(all);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(listings);
    } else {
      setFiltered(
        listings.filter((l) =>
          [l.title, l.city, l.state, l.description]
            .join(" ")
            .toLowerCase()
            .includes(search)
        )
      );
    }
  }, [listings, search]);

  return (
    <div className="listing-list-container">
      <h2>Browse Listings</h2>
      {search && (
        <p>
          Search results for: <strong>{search}</strong>
        </p>
      )}
      {filtered.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="listing-list-cards">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
