import { apiFetch } from "./apiClient";

export function getReviewsForListing(listingId) {
  return apiFetch(`/api/listings/${listingId}/reviews`);
}

export function getReviewByBooking(bookingId) {
  return apiFetch(`/api/bookings/${bookingId}/review`);
}

export function createReview(data) {
  return apiFetch("/api/reviews/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateReview(id, newData) {
  return apiFetch(`/api/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
}

export function deleteReview(id) {
  return apiFetch(`/api/reviews/${id}`, { method: "DELETE" });
}
