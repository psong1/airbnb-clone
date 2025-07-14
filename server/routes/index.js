const express = require("express");
const router = express.Router();

const listingRoutes = require("./api/listing-routes");
const userRoutes = require("./api/user-routes");
const bookingRoutes = require("./api/booking-routes");
const reviewRoutes = require("./api/review-routes");
const imageRoutes = require("./api/image-routes");
const notificationRoutes = require('./api/notification-routes');


router.use("/api", listingRoutes);
router.use("/api", userRoutes);
router.use("/api", bookingRoutes);
router.use("/api", reviewRoutes);
router.use("/api", imageRoutes);
router.use('/api/notifications', notificationRoutes);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to Airbnb Clone API!" });
});

module.exports = router;
