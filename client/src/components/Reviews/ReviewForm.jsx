import React, { useState } from "react";
import { createReview } from "../../api/reviews";
import "./ReviewForm.css";

export default function ({ user, bookingId }) {
  const [form, setForm] = useState({ rating: "", comment: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createReview({ ...form, booking_id: bookingId, user_id: user.id });
      console.log("Review submitted.");
    } catch (err) {
      console.error(`Failed to submit review: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="review-form-container">
      <h2>Leave a Review</h2>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        required
        onChange={handleChange}
        style={{ color: "black" }}
      />
      <textarea
        name="comment"
        placeholder="Leave a comment"
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}
