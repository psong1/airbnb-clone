import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/User/SignUpForm";
import LoginForm from "./components/User/LoginForm";
import ListingForm from "./components/Listings/ListingForm";
import BookingForm from "./components/Bookings/Bookingform";
import PaymentForm from "./components/Payments/PaymentForm";
import ReviewForm from "./components/Reviews/ReviewForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import NavBar from "./components/NavBar/NavBar";
import ListingList from "./components/Listings/ListingList";
import ListingDetail from "./components/Listings/ListingDetail";

const App = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };
  return (
    <Router>
      <NavBar user={user} handleLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm onLogin={setUser} />} />
          <Route path="/listings" element={<ListingList />} />
          <Route path="/listing/:id" element={<ListingDetail />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/listing/:id/book"
            element={
              <PrivateRoute user={user}>
                <BookingForm
                  user={user}
                  listingId={parseInt(window.location.pathname.split("/")[2])}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking/:id/pay"
            element={
              <PrivateRoute user={user}>
                <PaymentForm user={user} />
              </PrivateRoute>
            }
          />

          <Route
            path="/booking/:id/review"
            element={
              <PrivateRoute user={user}>
                <ReviewForm
                  user={user}
                  bookingId={parseInt(window.location.pathname.split("/")[2])}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/listing/new"
            element={
              <PrivateRoute user={user}>
                <ListingForm user={user} />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
