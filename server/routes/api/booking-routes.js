const express = require("express");
const router = express.Router();
const { Booking, User, Listing, Image } = require("../../models");

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, as: "guest", attributes: { exclude: ["password"] } },
        {
          model: Listing,
          as: "listing",
          include: [{ model: Image, as: "images" }]
        }
      ]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: User, as: "guest", attributes: { exclude: ["password"] } },
        { model: Listing, as: "listing" },
      ],
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.update(req.body, {
      where: { id: req.params.id },
    });
    if (!booking[0]) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.destroy({
      where: { id: req.params.id },
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
