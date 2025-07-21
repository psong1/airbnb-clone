import React, { useEffect, useState } from "react";
import { getBookingsForUser } from "../../api/bookings";
import "./UserBookings.css";
import { Link } from "react-router-dom";

export default function UserBookings({ userId }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookingsForUser(userId).then(setBookings);
  }, [userId]);

  return (
    <div className="user-bookings-container">
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="user-booking-item">
            <strong>{booking.listing?.title || "Listing"}</strong> -{" "}
            {booking.start_date} to {booking.end_date}
            <div>
              {booking.listing?.address && (
                <span>{booking.listing.address}</span>
              )}
            </div>
            <div>
              <Link to={`/listing/${booking.listing?.id}`}>View Listing</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
