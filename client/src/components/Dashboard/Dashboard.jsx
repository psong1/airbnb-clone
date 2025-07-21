import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../User/UserProfile";
import UserListings from "../User/UserListings";
import UserBookings from "../User/UserBookings";
import BookingList from "../Bookings/BookingList";
import "./Dashboard.css";

export default function Dashboard({ user }) {
  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.first_name}!</h1>
      <UserProfile userId={user.id} />
      {user.role === "guest" && <UserBookings userId={user.id} />}
      {user.role === "host" && (
        <>
          <Link to="/listing/new">
            <button>List a Property</button>
          </Link>
          <UserListings userId={user.id} />
          <BookingList user={user} />
        </>
      )}
    </div>
  );
}
