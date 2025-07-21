import React from "react";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <strong>Rating:</strong> {review.rating}/5
      <br />
      <strong>Comment:</strong> {review.comment}
      <br />
      <small>By {review.user?.first_name}</small>
    </div>
  );
}
