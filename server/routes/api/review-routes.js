const express = require("express");
const router = express.Router();
const { Review, Booking, User } = require("../../models");

router.get("/listings/:listingId/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Booking,
          as: "booking",
          where: { listing_id: req.params.listingId },
        },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bookings/:bookingId/review", async (req, res) => {
  try {
    const review = await Review.findOne({
      where: { bookingId: req.params.bookingId },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const review = Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/reviews/:id", async (req, res) => {
  try {
    const review = await Review.update(req.body, {
      where: { id: req.params.id },
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.json({ message: "Review updated successfully." });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/review/:id", async (req, res) => {
  try {
    const review = await Review.destroy({
      where: { id: req.params.id },
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }
    res.json({ message: "Review deleted successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
