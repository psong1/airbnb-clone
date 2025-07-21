import { apiFetch } from "./apiClient";

export function getAllUsers() {
  return apiFetch("/api/users");
}

export function getUserById(id) {
  return apiFetch(`/api/users/${id}`);
}

export function createUser(userData) {
  return apiFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function updateUser(id, newData) {
  return apiFetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
}

export function deleteUser(id) {
  return apiFetch(`/api/users/${id}`, {
    method: "DELETE",
  });
}
