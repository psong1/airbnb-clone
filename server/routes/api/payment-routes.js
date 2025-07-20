const express = require("express");
const router = express.Router();
const { Payment, Booking } = require("../../models");

router.get("/payments", async (req, res) => {
  try {
    const payment = await Payment.findAll({
      include: [
        {
          model: Booking,
          as: "booking",
        },
      ],
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/payment/:id", async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          as: "booking",
        },
      ],
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/payments", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/payments/:id", async (req, res) => {
  try {
    const payment = await Payment.update(req.body, {
      where: { id: req.params.id },
    });
    if (!payment[0]) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.json({ message: "Payment updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/payments/:id", async (req, res) => {
  try {
    const payment = await Payment.destroy({
      where: { id: req.params.id },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
