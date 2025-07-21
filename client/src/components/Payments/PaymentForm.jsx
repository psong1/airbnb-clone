import React, { useState } from "react";
import { createPayment } from "../../api/payments";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./PaymentForm.css";

export default function PaymentForm({ user }) {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const defaultAmount = location.state?.total || "";
  const [amount, setAmount] = useState(defaultAmount);
  const [method, setMethod] = useState("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const pricePerNight = location.state?.pricePerNight;
  const nights = location.state?.nights;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (method === "credit_card" && (!cardNumber || !expiry || !cvv)) {
      return setError("Please enter all credit card fields.");
    }

    try {
      await createPayment({
        booking_id: parseInt(bookingId),
        amount: parseFloat(amount),
        method,
      });

      alert("Payment submitted!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to submit payment.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="payment-form-container">
      <h2>Make a payment</h2>
      {error && <p>{error}</p>}

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        readOnly
      />
      {location.state?.total && (
        <p>
          Total = price per night × number of nights
          <br />= ${pricePerNight} × {nights} = ${location.state.total}
        </p>
      )}

      <label>Payment Method</label>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="credit_card">Credit Card</option>
      </select>

      {method === "credit_card" && (
        <div style={{ marginTop: "1em" }}>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />

          <label>Expiry Date</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            required
          />

          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
      )}

      <button type="submit">Submit Payment</button>
    </form>
  );
}
