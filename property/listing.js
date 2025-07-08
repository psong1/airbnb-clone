// File: routes/listings.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { verifyToken, isHost } = require('../middleware/auth');
const { Listing } = require('../models');

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.findAll();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Post create a new listing
router.post(
  '/',
  verifyToken,
  isHost,
  [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('images').isArray(),
    body('costPerNight').isFloat(),
    body('amenities').isArray()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newListing = await Listing.create({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        costPerNight: req.body.costPerNight,
        amenities: req.body.amenities,
        UserId: req.user.id // Assuming foreign key setup
      });
      res.status(201).json(newListing);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create listing' });
    }
  }
);

// Put update a listing
router.put('/:id', verifyToken, isHost, async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    await listing.update(req.body);
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
});

// Delete a listing
router.delete('/:id', verifyToken, isHost, async (req, res) => {
  try {
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    await listing.destroy();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

module.exports = router;
