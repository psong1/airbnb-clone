import React, { useState, useEffect } from "react";
import "./SignupForm.css";

export default function SignupForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const backgroundImages = [
    "/images/arizona.jpg",
    "/images/austin.jpg",
    "/images/colorado.jpeg",
    "/images/miami.webp",
    "/images/ny.jpg",
    "/images/orlando.webp",
    "/images/sanfran.jpg"
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set the background image on the body
    document.body.style.backgroundImage = `url(${backgroundImages[bgIndex]})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.transition = "background-image 1s ease-in-out";
    // Cleanup: remove background when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundSize = "";
      document.body.style.transition = "";
    };
  }, [bgIndex]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <input
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
