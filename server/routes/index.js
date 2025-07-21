const express = require("express");
const router = express.Router();

const listingRoutes = require("./api/listing-routes");
const userRoutes = require("./api/user-routes");
const bookingRoutes = require("./api/booking-routes");
const paymentRoutes = require("./api/payment-routes");
const authRoutes = require("./api/auth-routes");
const reviewRoutes = require("./api/review-routes");

router.use("/api", listingRoutes);
router.use("/api", userRoutes);
router.use("/api", bookingRoutes);
router.use("/api", paymentRoutes);
router.use("/api", authRoutes);
router.use("/api", reviewRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Airbnb Clone API!" });
});

module.exports = router;
