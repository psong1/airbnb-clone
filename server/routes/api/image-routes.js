const express = require("express");
const router = express.Router();
const { Image, Listing, User } = require("../../models");

router.get("/images", async (req, res) => {
  try {
    const images = await Image.findAll({
      include: [
        { model: Listing, as: "listing" }
      ],
    });
    res.json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/images/:id", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id, {
      include: [
        { model: Listing, as: "listing" }
      ],
    });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(image);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/listings/:id/images", async (req, res) => {
  try {
    const images = await Image.findAll({
      where: { listing_id: req.params.id },
      include: [
        { model: Listing, as: "listing" }
      ],
    });
    res.json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/images", async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/images/:id", async (req, res) => {
  try {
    const image = await Image.update(req.body, {
      where: { id: req.params.id },
    });
    if (!image[0]) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/images/:id", async (req, res) => {
  try {
    const image = await Image.destroy({
      where: { id: req.params.id },
    });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router; 