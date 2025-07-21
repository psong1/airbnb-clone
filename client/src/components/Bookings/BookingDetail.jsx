import React from "react";
import "./BookingDetail.css";

export default function BookingDetail({ booking }) {
  return (
    <div className="booking-detail-card">
      <p>
        <strong>Listing:</strong> {booking.listing_title}
      </p>
      <p>
        <strong>Dates:</strong> {booking.start_date} to {booking.end_date}
      </p>
      <p>
        <strong>Status:</strong> {booking.status}
      </p>
    </div>
  );
}