import React, { useEffect, useState } from "react";
import { getReviewsForListing } from "../../api/reviews";
import ReviewCard from "./ReviewCard";
import "./ReviewList.css";

export default function ReviewList({ listingId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviewsForListing(listingId)
      .then(setReviews)
      .catch((err) => console.error(err));
  }, [listingId]);

  return (
    <div className="review-list-container">
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No Reviews yet</p>
      ) : (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      )}
    </div>
  );
}
