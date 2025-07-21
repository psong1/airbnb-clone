import React, { useState } from "react";
import { createListing } from "../../api/listings";
import { useNavigate } from "react-router-dom";
import "./ListingForm.css";

export default function ListingForm({ user }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    price_per_night: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newListing = await createListing({ ...form, host_id: user.id });
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(`Failed to create listing: ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="listing-form-container">
      <h2>Create a Listing</h2>
      {success && <p>Listing created! Redirecting...</p>}
      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        required
      />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
        required
      />
      <input
        name="price_per_night"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
