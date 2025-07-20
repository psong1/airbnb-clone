import { apiFetch } from "./apiClient";

export function getPaymentById(id) {
  return apiFetch(`/api/payments/${id}`);
}

export function createPayment(data) {
  return apiFetch(`/api/payments`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePayment(id, newData) {
  return apiFetch(`/api/payments/${id}`, {
    method: "PUT",
    body: JSON.stringify(newData),
  });
}

export function deletePayment(id) {
  return apiFetch(`/api/payments/${id}`, { method: "DELETE" });
}
