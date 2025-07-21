const express = require("express");
const router = express.Router();
const { Listing, User, Image } = require("../../models");

router.get("/listings", async (req, res) => {
  try {
    const { city, state, zip } = req.query;
    let whereClause = {};

    if (city) {
      whereClause.city = city;
    }
    if (state) {
      whereClause.state = state;
    }
    if (zip) {
      whereClause.address = {
        [require("sequelize").Op.like]: `%${zip}%`,
      };
    }

    const listings = await Listing.findAll({
      where: whereClause,
      include: [
        { model: User, as: "host", attributes: { exclude: ["password"] } },
        { model: Image, as: "images" },
      ],
    });

    res.json(listings);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id, {
      include: [
        { model: User, as: "host", attributes: { exclude: ["password"] } },
        { model: Image, as: "images" },
      ],
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/listings", async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.update(req.body, {
      where: { id: req.params.id },
    });
    if (!listing[0]) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json({ message: "Listing updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/listings/:id", async (req, res) => {
  try {
    const listing = await Listing.destroy({
      where: { id: req.params.id },
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
