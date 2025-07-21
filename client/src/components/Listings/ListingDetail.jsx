import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingsById } from "../../api/listings";
import BookingForm from "../Bookings/Bookingform";
import ReviewList from "../Reviews/ReviewList";
import "./ListingDetail.css";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const BACKEND_URL = "http://localhost:3001";

  useEffect(() => {
    getListingsById(id).then(setListing);
  }, [id]);

  if (!listing) return <p>Loading listing...</p>;

  return (
    <div className="listing-detail-container">
      {listing.images && listing.images.length > 0 && (
        <div className="listing-detail-images">
          {listing.images.map((img) => (
            <img
              key={img.id}
              src={`${BACKEND_URL}/${img.url}`}
              alt={listing.title}
              className="listing-detail-image"
            />
          ))}
        </div>
      )}
      <h2>{listing.title}</h2>
      <p>
        {listing.city}, {listing.state}
      </p>
      <p>${listing.price_per_night} / night</p>
      <p>{listing.description}</p>

      {user?.role === "guest" && (
        <BookingForm
          user={user}
          listingId={listing.id}
          pricePerNight={listing.price_per_night}
        />
      )}

      <ReviewList listingId={listing.id} />
    </div>
  );
}
