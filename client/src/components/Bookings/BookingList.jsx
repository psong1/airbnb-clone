import React, { useEffect, useState } from "react";
import { getBookingsForUser } from "../../api/bookings";
import BookingDetail from "./BookingDetail";
import "./BookingList.css";

export default function BookingList({ user }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookingsForUser(user.id)
      .then(setBookings)
      .catch((err) => console.error(err));
  }, [user.id]);

  return (
    <div className="booking-list-container">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingDetail key={booking.id} booking={booking} />
        ))
      )}
    </div>
  );
}
