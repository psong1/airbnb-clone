const express = require("express");
const router = express.Router();

const listingRoutes = require("./api/listing-routes");
const userRoutes = require("./api/user-routes");
const bookingRoutes = require("./api/booking-routes");
const reviewRoutes = require("./api/review-routes");
const imageRoutes = require("./api/image-routes");

console.log("Loading routes...");
router.use("/api", listingRoutes);
console.log("Listing routes loaded");
router.use("/api", userRoutes);
console.log("User routes loaded");
router.use("/api", bookingRoutes);
console.log("Booking routes loaded");
router.use("/api", reviewRoutes);
console.log("Review routes loaded");
router.use("/api", imageRoutes);
console.log("Image routes loaded");

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Airbnb Clone API!" });
});

module.exports = router;
