const express = require("express");
const router = express.Router();
const { Review, User, Booking, Listing } = require("../../models");

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { 
          model: Booking, 
          as: "booking",
          include: [
            { model: Listing, as: "listing" },
            { model: User, as: "guest", attributes: { exclude: ["password"] } }
          ]
        },
      ],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { 
          model: Booking, 
          as: "booking",
          include: [
            { model: Listing, as: "listing" },
            { model: User, as: "guest", attributes: { exclude: ["password"] } }
          ]
        },
      ],
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { user_id: req.params.id },
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { 
          model: Booking, 
          as: "booking",
          include: [
            { model: Listing, as: "listing" },
            { model: User, as: "guest", attributes: { exclude: ["password"] } }
          ]
        },
      ],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/listings/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, as: "user", attributes: { exclude: ["password"] } },
        { 
          model: Booking, 
          as: "booking",
          where: { listing_id: req.params.id },
          include: [
            { model: Listing, as: "listing" },
            { model: User, as: "guest", attributes: { exclude: ["password"] } }
          ]
        },
      ],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/reviews", async (req, res) => {
  try {
    const review = await Review.create(req.body);
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
    if (!review[0]) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete("/reviews/:id", async (req, res) => {
  try {
    const review = await Review.destroy({
      where: { id: req.params.id },
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 