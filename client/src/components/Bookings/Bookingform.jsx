import React, { useState } from "react";
import { createBooking } from "../../api/bookings";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ user, listingId, pricePerNight }) {
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
  });

  function calculateNights(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  function calculateTotal() {
    if (!formData.start_date || !formData.end_date) return pricePerNight;
    return (
      pricePerNight * calculateNights(formData.start_date, formData.end_date)
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const booking = await createBooking({
        ...formData,
        guest_id: user.id,
        listing_id: listingId,
      });
      const nights = calculateNights(formData.start_date, formData.end_date);
      navigate(`/booking/${booking.id}/pay`, {
        state: { total: calculateTotal(), pricePerNight, nights },
      });
    } catch (err) {
      console.error(`Failed to create booking: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book This Listing</h2>
      <input type="date" name="start_date" onChange={handleChange} required />
      <input type="date" name="end_date" onChange={handleChange} required />
      <div>Total: ${calculateTotal()}</div>
      <button type="submit" style={{ marginBottom: "2rem" }}>Book Now</button>
    </form>
  );
}
