import { apiFetch } from "./apiClient";

export function getAllListings(query = {}) {
  const params = new URLSearchParams(query).toString();
  return apiFetch(`/api/listings${params ? `?${params}` : ""}`);
}

export function getListingsById(id) {
  return apiFetch(`/api/listings/${id}`);
}

export function createListing(data) {
  return apiFetch("/api/listings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateListing(id, newData) {
  return apiFetch(`/api/listings/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
}

export function deleteListing(id) {
  return apiFetch(`/api/listings/${id}`, { method: "DELETE" });
}

export function getListingsForUser(userId) {
  return getAllListings({ host_id: userId });
}
