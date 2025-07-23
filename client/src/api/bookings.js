import { apiFetch } from "./apiClient";

export function getAllBookings() {
  return apiFetch("/api/bookingss");
}

export function getBookingById(id) {
  return apiFetch(`/api/bookings/${id}`);
}

export function createBooking(data) {
  return apiFetch("/api/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateBooking(id, newData) {
  return apiFetch(`/api/bookings/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
}

export function deleteBooking(id) {
  return apiFetch(`/api/bookings/${id}`, { method: "DELETE" });
}

export function getBookingsForUser(userId) {
  return apiFetch(`/api/bookings?user_id=${userId}`);
}
