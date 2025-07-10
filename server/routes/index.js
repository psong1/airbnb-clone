const express = require("express");
const router = express.Router();

const listingRoutes = require("./api/listing-routes");
const userRoutes = require("./api/user-routes");
const bookingRoutes = require("./api/booking-routes");

router.use("/api", listingRoutes);
router.use("/api", userRoutes);
router.use("/api", bookingRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Airbnb Clone API!" });
});

module.exports = router;
